#!/usr/bin/env node
/**
 * Fetches ATM Milano “Info Traffico” RSS → public/data/mobility.json
 *
 * Keeps only alerts with an official English page (ATM flags these as priority).
 * Fetches EN page title + summary for the Transport tab.
 *
 * Schedule: see .github/workflows/refresh-live.yml
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const RSS_URL = 'https://www.atm.it/_layouts/atm/apps/PublishingRSS.aspx?web=388a6572-890f-4e0f-a3c7-a3dd463f7252&c=News%20Infomobilita';
const INFO_URL = 'https://www.atm.it/it/ViaggiaConNoi/InfoTraffico';
const ATM_ORIGIN = 'https://www.atm.it';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../../public/data/milan-pulse/mobility.json');
const MAX_ALERTS = 30;
const BODY_MAX = 600;

const METRO = [
  { id: 'M1', name: 'Linea M1 (Rossa)' },
  { id: 'M2', name: 'Linea M2 (Verde)' },
  { id: 'M3', name: 'Linea M3 (Gialla)' },
  { id: 'M4', name: 'Linea M4 (Blu)' },
  { id: 'M5', name: 'Linea M5 (Lilla)' },
];

const force = process.argv.includes('--force');
const UA = 'events-milan/1.0 (+https://github.com; Milan events mockup)';

function extractTag(block, tag) {
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`, 'i');
  const m = block.match(re);
  return m ? (m[1] ?? m[2] ?? '').trim() : '';
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseEnglishUrl(descriptionHtml) {
  const m = descriptionHtml.match(/href="(\/en\/ViaggiaConNoi\/InfoTraffico\/Pages\/[^"]+)"/i)
    || descriptionHtml.match(/\[English\]\((\/en\/[^)]+)\)/i);
  if (!m) return null;
  return `${ATM_ORIGIN}${m[1].replace(/&amp;/g, '&')}`;
}

function linesFromText(text) {
  const lines = new Set();
  for (const m of text.matchAll(/\bM\s*([1-5])\b/gi)) lines.add(`M${m[1]}`);

  const linee = text.match(/Linee\s+([\d,\s]+(?:e\s+\d+)?)/i);
  if (linee) {
    for (const part of linee[1].split(/,|\se\s/i)) {
      const n = part.trim().match(/\d+/);
      if (n) lines.add(`T${n[0]}`);
    }
  }

  for (const m of text.matchAll(/\bTram\s*(\d+)/gi)) lines.add(`T${m[1]}`);
  for (const m of text.matchAll(/\bBus\s*(\d+)/gi)) lines.add(`B${m[1]}`);
  return [...lines];
}

function surfaceLabel(id) {
  if (id.startsWith('T')) return `Tram ${id.slice(1)}`;
  if (id.startsWith('B')) return `Bus ${id.slice(1)}`;
  return id;
}

function parsePageTitle(html) {
  const raw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  return stripHtml(raw).replace(/\s*ATM.*$/i, '').trim();
}

function parsePageBody(html) {
  const skip = /^(home|english|print|facebook|link|menu|p\.iva)/i;
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter((t) => t.length > 35 && !skip.test(t));
  return paras.slice(0, 4).join(' ').slice(0, BODY_MAX);
}

async function fetchAtmPage(url) {
  const res = await fetch(url, {
    headers: { Accept: 'text/html', 'User-Agent': UA },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => m[1]);
}

function parseRssItem(block, i) {
  const titleIt = extractTag(block, 'title');
  const urlIt = extractTag(block, 'link');
  const description = extractTag(block, 'description');
  const pubDate = extractTag(block, 'pubDate');
  const guid = extractTag(block, 'guid') || urlIt || `atm-${i}`;
  const urlEn = parseEnglishUrl(description);
  if (!urlEn) return null;

  let bodyIt = stripHtml(description).replace(/^English\s+/i, '').slice(0, BODY_MAX);
  if (!bodyIt || bodyIt.length < 20) bodyIt = titleIt;

  return {
    id: crypto.createHash('sha1').update(guid).digest('hex').slice(0, 12),
    severity: 'warning',
    titleIt,
    bodyIt,
    urlIt,
    urlEn,
    pubDate,
    lines: linesFromText(titleIt),
  };
}

function buildLines(alerts) {
  const metroMap = Object.fromEntries(
    METRO.map((m) => [m.id, { status: 'ok', note: 'Servizio regolare' }]),
  );
  const surface = new Map();

  for (const alert of alerts) {
    for (const lineId of alert.lines) {
      const entry = { status: 'warning', note: alert.titleIt, noteEn: alert.titleEn || alert.titleIt };
      if (lineId.startsWith('M') && metroMap[lineId]) metroMap[lineId] = entry;
      else if (lineId.startsWith('T') || lineId.startsWith('B')) surface.set(lineId, entry);
    }
  }

  const lines = METRO
    .filter((m) => metroMap[m.id]?.status === 'warning')
    .map((m) => ({ id: m.id, name: m.name, ...metroMap[m.id] }));

  for (const [id, st] of [...surface.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push({ id, name: surfaceLabel(id), ...st });
  }

  return lines;
}

async function enrichWithEnglish(alerts, previousById) {
  const out = [];

  for (const alert of alerts) {
    const prev = previousById.get(alert.id);
    if (prev?.titleEn && prev?.bodyEn && prev.urlEn === alert.urlEn && !force) {
      out.push({ ...alert, titleEn: prev.titleEn, bodyEn: prev.bodyEn });
      continue;
    }

    try {
      const html = await fetchAtmPage(alert.urlEn);
      const titleEn = parsePageTitle(html) || alert.titleIt;
      const bodyEn = parsePageBody(html) || alert.bodyIt;
      out.push({ ...alert, titleEn, bodyEn });
    } catch (err) {
      console.warn(`  EN page failed (${alert.urlEn}): ${err.message}`);
      if (prev?.titleEn) {
        out.push({ ...alert, titleEn: prev.titleEn, bodyEn: prev.bodyEn });
      } else {
        out.push({ ...alert, titleEn: alert.titleIt, bodyEn: alert.bodyIt });
      }
    }
  }

  return out;
}

function fingerprint(alerts) {
  const payload = alerts
    .map((a) => `${a.id}:${a.titleIt}:${a.titleEn}:${a.bodyEn?.slice(0, 80)}`)
    .join('|');
  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Fetching ${RSS_URL} …`);

  try {
    const res = await fetch(RSS_URL, {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*', 'User-Agent': UA },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const xml = await res.text();
    if (!xml.includes('<rss')) throw new Error('Response is not RSS XML');

    const rawItems = parseRssItems(xml).slice(0, MAX_ALERTS);
    const candidates = rawItems.map(parseRssItem).filter(Boolean);
    console.log(`  ${candidates.length} alerts with English page (of ${rawItems.length} in feed)`);

    const existing = readExisting();
    const previousById = new Map((existing?.alerts || []).map((a) => [a.id, a]));
    const alerts = await enrichWithEnglish(candidates, previousById);
    const lines = buildLines(alerts);
    const fp = fingerprint(alerts);

    if (!force && existing?.fingerprint === fp) {
      console.log(`ATM feed unchanged (fingerprint ${fp}) — skipping write.`);
      return;
    }

    const data = {
      updatedAt: new Date().toISOString(),
      source: 'ATM Info Traffico RSS (English alerts)',
      sourceUrl: INFO_URL,
      live: true,
      filter: 'Alerts with official English translation on atm.it',
      disclaimer: 'Priority service changes from ATM — not live vehicle tracking. Use the ATM app for real-time departures.',
      fingerprint: fp,
      lines,
      alerts: alerts.map(({ lines: _l, ...rest }) => rest),
    };

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Wrote ${lines.length} disrupted lines, ${alerts.length} EN alerts → ${OUT_PATH}`);
  } catch (err) {
    const existing = readExisting();
    if (existing?.live && (existing.lines?.length || existing.alerts?.length)) {
      console.error(`Fetch failed: ${err.message}`);
      console.error('Keeping existing mobility.json unchanged.');
      process.exit(1);
    }
    throw err;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
