#!/usr/bin/env node
/**
 * Fetches MIT transport strikes RSS → public/data/strikes.json
 *
 * MIT update cadence (official): "periodicamente" — no fixed interval.
 * Law (L. 146/1990): unions must give ≥10 days notice; carriers must
 * inform users ≥5 days before. New/revoked strikes land on business days.
 *
 * Our schedule (see .github/workflows/refresh-live.yml):
 *   Mon, Wed, Fri 06:00 UTC (~07:00 Rome)
 *
 * Skips fetch + DeepL when feed fingerprint is unchanged (--force to override).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './load-env.mjs';
import { translateStrikes } from './translate-strikes.mjs';
import { strikeFeedFingerprint } from './strike-fingerprint.mjs';

loadEnv();

const MIT_RSS_URL = 'https://scioperi.mit.gov.it/mit2/public/scioperi/rss';
const MIT_PORTAL_URL = 'https://scioperi.mit.gov.it/mit2/public/scioperi';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../../public/data/milan-pulse/strikes.json');

const force = process.argv.includes('--force');

function extractTag(block, tag) {
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${tag}>`, 'i');
  const m = block.match(re);
  return m ? (m[1] ?? m[2] ?? '').trim() : '';
}

function parseDescription(raw) {
  const fields = {};
  for (const line of raw.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ').split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
    if (key) fields[key] = line.slice(idx + 1).trim();
  }
  return fields;
}

function itDateToIso(d) {
  const m = d?.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, day, month, year] = m;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function parseGuaranteed(fields) {
  const blob = [fields.note, fields.modalita].filter(Boolean).join(' ');
  const windows = [];
  const re = /(\d{1,2})[.:](\d{2})\s*[–-]\s*(\d{1,2})[.:](\d{2})/g;
  let m;
  while ((m = re.exec(blob)) !== null) {
    const pad = (h, min) => `${String(h).padStart(2, '0')}:${min}`;
    windows.push(`${pad(m[1], m[2])}–${pad(m[3], m[4])}`);
  }
  return [...new Set(windows)];
}

function isMilanRelevant(strike) {
  const cat = (strike.category || '').toUpperCase();
  if ((strike.region || '').trim() === 'Lombardia') return true;
  if (/ATM|MALPENSA|LINATE|MILANO/.test(cat)) return true;
  return strike.relevance === 'Nazionale';
}

function parseRss(xml) {
  const channel = xml.match(/<channel>[\s\S]*?<\/channel>/i)?.[0] || '';
  const channelDesc = extractTag(channel, 'description');
  const updatedMatch = channelDesc.match(/aggiornato alla data:\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
  const feedPubDate = extractTag(channel, 'pubDate') || null;

  const strikes = [];
  let milanCount = 0;
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRe.exec(xml)) !== null) {
    const block = match[1];
    const fields = parseDescription(extractTag(block, 'description'));
    const guid = extractTag(block, 'guid');
    const id = guid.match(/(\d+)\s*$/)?.[1] || guid.replace(/\W/g, '') || strikes.length + 1;

    const titleStart = extractTag(block, 'title').match(/Data inizio:\s*(\d{1,2}\/\d{1,2}\/\d{4})/i)?.[1];
    const start = itDateToIso(fields['data inizio']) || itDateToIso(titleStart);
    if (!start) continue;

    const strike = {
      id: `mit-${id}`,
      start,
      end: itDateToIso(fields['data fine']) || start,
      sector: fields.settore || '',
      category: fields['categoria interessata'] || '',
      relevance: fields.rilevanza || '',
      region: (fields.regione || '').trim(),
      mode: fields.modalita || '',
      guaranteed: parseGuaranteed(fields),
      unions: (fields.sindacati || '').split('/').map((s) => s.trim()).filter(Boolean),
      link: MIT_PORTAL_URL,
    };
    strike.milanRelevant = isMilanRelevant(strike);
    if (strike.milanRelevant) milanCount += 1;
    strikes.push(strike);
  }

  strikes.sort((a, b) => a.start.localeCompare(b.start) || a.sector.localeCompare(b.sector));

  return {
    updatedAt: new Date().toISOString(),
    feedUpdated: updatedMatch ? itDateToIso(updatedMatch[1]) : null,
    feedPubDate,
    feedFingerprint: strikeFeedFingerprint(strikes),
    source: 'MIT Osservatorio Scioperi · RSS',
    sourceUrl: MIT_RSS_URL,
    portalUrl: MIT_PORTAL_URL,
    fetchSchedule: 'Mon, Wed, Fri ~07:00 Rome',
    live: true,
    strikes,
    _milanCount: milanCount,
  };
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Fetching ${MIT_RSS_URL} …`);

  try {
    const res = await fetch(MIT_RSS_URL, {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const xml = await res.text();
    if (!xml.includes('<rss')) throw new Error('Response is not RSS XML');

    const { _milanCount, ...data } = parseRss(xml);
    const existing = readExisting();

    if (!force && existing?.feedFingerprint && existing.feedFingerprint === data.feedFingerprint) {
      console.log(`MIT feed unchanged (fingerprint ${data.feedFingerprint}) — skipping write & DeepL.`);
      return;
    }

    const previousById = new Map((existing?.strikes || []).map((s) => [s.id, s]));
    const translation = await translateStrikes(data.strikes, previousById);

    if (translation.engine === 'deepl') {
      data.translation = {
        engine: 'deepl',
        at: new Date().toISOString(),
        strikes: translation.count,
        chars: translation.chars || 0,
        reused: translation.skipped || 0,
        newStrings: translation.translated || 0,
      };
      if (translation.translated) {
        console.log(`DeepL: ${translation.translated} new strings (${translation.chars} chars), ${translation.skipped} reused`);
      } else {
        console.log(`DeepL: all ${translation.skipped} strings reused from cache`);
      }
    } else {
      console.warn(`DeepL skipped (${translation.reason}). Add DEEPL_AUTH_KEY to .env for English translations.`);
    }

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Wrote ${data.strikes.length} strikes (${_milanCount} Milan-relevant) → ${OUT_PATH}`);
  } catch (err) {
    try {
      const existing = readExisting();
      if (existing?.strikes?.length) {
        console.error(`Fetch failed: ${err.message}`);
        console.error('Keeping existing strikes.json unchanged.');
        process.exit(1);
      }
    } catch {
      /* no existing file */
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
