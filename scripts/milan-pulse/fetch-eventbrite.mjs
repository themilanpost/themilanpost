#!/usr/bin/env node
/**
 * Fetches upcoming Milan events from Eventbrite listing pages (JSON-LD).
 * Categories: music, food & drink, performing & visual arts → culture.
 *
 * Schedule: see .github/workflows/refresh-live.yml
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const LISTING_ROOT = 'https://www.eventbrite.com/d/italy--milano';
const SOURCE_LABEL = 'Eventbrite · Milan (music, food, culture)';
const SOURCE_URL = 'https://www.eventbrite.com/d/italy--milano/events/';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../../public/data/milan-pulse/eventbrite.json');

/** Eventbrite slug → app category (matches Today/Agenda filters). */
const FEEDS = [
  { slug: 'music', category: 'music', label: 'Music' },
  { slug: 'food--drink', category: 'food', label: 'Food & drink' },
  { slug: 'performing-and-visual-arts', category: 'culture', label: 'Arts & performances' },
];

const MAX_PAGES = 3;
const DAYS_AHEAD = 60;
const force = process.argv.includes('--force');

const UA = 'events-milan/1.0 (+https://github.com; Milan events mockup)';

function romeToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Rome' });
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function defaultStart(isoLike) {
  if (isoLike.includes('T')) return isoLike;
  const month = Number(isoLike.slice(5, 7));
  const offset = month >= 4 && month <= 10 ? '+02:00' : '+01:00';
  return `${isoLike}T20:00:00${offset}`;
}

function eventIdFromUrl(url) {
  const m = url?.match(/-(\d{10,})(?:\?|$)/);
  return m ? `eb-${m[1]}` : `eb-${crypto.createHash('sha1').update(url).digest('hex').slice(0, 10)}`;
}

function parseItemListJsonLd(html) {
  const re = /<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1]);
      if (data.itemListElement?.[0]?.item?.['@type'] === 'Event') return data;
    } catch {
      /* next block */
    }
  }
  return null;
}

function isMilanLocality(city) {
  const c = (city || '').trim().toLowerCase();
  return c === 'milano' || c === 'milan';
}

function textHasPhone(...parts) {
  const text = parts.filter(Boolean).join(' ');
  if (/(?:INFO|TEL|TEL\.|WHATSAPP|WA|CHIAM|PRENOT|PRENOTA|CELL|SMS|NUMERO|CONTATT)[\s.:@-]*(?:\+39\s?)?[\d\s.-]{6,}/i.test(text)) {
    return true;
  }
  const runs = text.match(/\d(?:[\d\s.-]*\d)+/g) || [];
  return runs.some((run) => run.replace(/\D/g, '').length >= 9);
}

function eventNumericId(idOrUrl) {
  const m = String(idOrUrl).match(/(\d{10,})/);
  return m ? m[1] : null;
}

/** Free/paid from listing cards; EUR amounts from embedded ticket JSON when present. */
function parseListingPriceMeta(html) {
  const meta = new Map();

  for (const tag of html.matchAll(/<[^>]+data-event-id="\d+"[^>]*>/g)) {
    const id = tag[0].match(/data-event-id="(\d+)"/)?.[1];
    const status = tag[0].match(/data-event-paid-status="(free|paid)"/)?.[1];
    if (!id || !status) continue;
    const cur = meta.get(id) || { free: false, priceFrom: null, priceTo: null };
    if (status === 'free') cur.free = true;
    meta.set(id, cur);
  }

  let m;
  const ticketRe = /"(?:eventbrite_event_id|id)":"(\d{10,})"[\s\S]{0,12000}?"minimum_ticket_price":\{"currency":"EUR"[^}]*"value":([\d.]+)[\s\S]{0,600}?"maximum_ticket_price":\{"currency":"EUR"[^}]*"value":([\d.]+)/g;
  while ((m = ticketRe.exec(html)) !== null) {
    const id = m[1];
    const min = Number(m[2]);
    const max = Number(m[3]);
    const cur = meta.get(id) || { free: false, priceFrom: null, priceTo: null };
    if (min === 0 && max === 0) cur.free = true;
    else if (min > 0) {
      cur.priceFrom = min;
      cur.priceTo = max > min ? max : null;
    }
    meta.set(id, cur);
  }

  return meta;
}

function applyPriceMeta(event, meta) {
  const numId = eventNumericId(event.id);
  if (!numId) return event;
  const p = meta.get(numId);
  if (!p) return event;

  if (p.free) return { ...event, free: true, priceFrom: null, priceTo: null };
  if (p.priceFrom == null) return event;
  return { ...event, free: false, priceFrom: p.priceFrom, priceTo: p.priceTo ?? null };
}

function normalizeEvent(raw, category, priceMeta) {
  const addr = raw.location?.address;
  const city = addr?.addressLocality?.trim() || '';
  if (!isMilanLocality(city)) return null;

  const start = defaultStart(raw.startDate);
  const end = raw.endDate ? defaultStart(raw.endDate) : start;
  const venue = raw.location?.name || city;

  const base = {
    id: eventIdFromUrl(raw.url),
    title: raw.name,
    titleIt: raw.name,
    start,
    end,
    category,
    city,
    zone: city,
    venue,
    free: false,
    priceFrom: null,
    priceTo: null,
    url: raw.url,
    image: raw.image || null,
    description: raw.description?.slice(0, 280) || null,
    source: 'eventbrite',
  };
  return applyPriceMeta(base, priceMeta);
}

function fingerprint(events) {
  const payload = events
    .map((e) => `${e.id}:${e.start.slice(0, 10)}:${e.category}:${e.free}:${e.priceFrom ?? ''}:${e.priceTo ?? ''}`)
    .sort()
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

async function fetchPage(listingSlug, category, page, startDate, endDate) {
  const url = new URL(`${LISTING_ROOT}/${listingSlug}/`);
  url.searchParams.set('start_date', startDate);
  url.searchParams.set('end_date', endDate);
  if (page > 1) url.searchParams.set('page', String(page));

  const res = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': UA,
    },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const err = new Error(`Eventbrite HTTP ${res.status} (${listingSlug} page ${page})`);
    err.status = res.status;
    throw err;
  }

  const html = await res.text();
  const priceMeta = parseListingPriceMeta(html);
  const list = parseItemListJsonLd(html);
  if (!list?.itemListElement?.length) {
    return { events: [], listed: 0, phoneSkipped: 0 };
  }

  const items = list.itemListElement
    .map((row) => row.item)
    .filter((item) => item?.['@type'] === 'Event' && item.url);

  let phoneSkipped = 0;
  const events = items
    .map((item) => {
      if (textHasPhone(item.name, item.description)) {
        phoneSkipped += 1;
        return null;
      }
      return normalizeEvent(item, category, priceMeta);
    })
    .filter(Boolean);

  return { events, listed: items.length, phoneSkipped };
}

async function fetchFeed(feed, startDate, endDate) {
  const byId = new Map();
  let phoneSkipped = 0;

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchPage(feed.slug, feed.category, page, startDate, endDate);
    phoneSkipped += batch.phoneSkipped;
    if (!batch.listed) break;
    for (const ev of batch.events) byId.set(ev.id, ev);
    console.log(`  ${feed.label} page ${page}: ${batch.events.length} Milano / ${batch.listed} listed`);
    if (batch.listed < 15) break;
  }

  return { events: [...byId.values()], phoneSkipped };
}

async function main() {
  const startDate = romeToday();
  const endDate = addDays(startDate, DAYS_AHEAD);
  console.log(`Fetching Eventbrite Milan (${startDate} → ${endDate}) …`);

  const byId = new Map();
  let skippedPhone = 0;
  const counts = {};

  for (const feed of FEEDS) {
    const { events, phoneSkipped } = await fetchFeed(feed, startDate, endDate);
    skippedPhone += phoneSkipped;
    counts[feed.category] = events.length;
    for (const ev of events) byId.set(ev.id, ev);
  }

  const events = [...byId.values()]
    .filter((e) => e.start.slice(0, 10) >= startDate)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const fp = fingerprint(events);
  const existing = readExisting();
  if (!force && existing?.fingerprint === fp) {
    console.log(`Eventbrite listings unchanged (fingerprint ${fp}) — skipping write.`);
    return;
  }

  const data = {
    updatedAt: new Date().toISOString(),
    source: SOURCE_LABEL,
    sourceUrl: SOURCE_URL,
    live: true,
    feeds: FEEDS.map(({ slug, category, label }) => ({ slug, category, label })),
    range: { from: startDate, to: endDate },
    fingerprint: fp,
    counts,
    events,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${events.length} events (Milano only) → ${OUT_PATH}`);
  console.log(`  by category: ${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ')}`);
  if (skippedPhone) console.log(`  skipped ${skippedPhone} with phone numbers in title/description`);
}

/** Datacenter / bot blocks (common on GitHub Actions). Keep cached JSON. */
function isSoftBlock(err) {
  const status = err?.status;
  if (status === 403 || status === 405 || status === 429) return true;
  return /Eventbrite HTTP (403|405|429)\b/.test(String(err?.message || ''));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    if (isSoftBlock(err)) {
      const existing = readExisting();
      console.warn(
        `Eventbrite blocked (${err.message}). Keeping existing eventbrite.json` +
          (existing?.events?.length != null ? ` (${existing.events.length} events).` : '.'),
      );
      process.exit(0);
    }
    console.error(err);
    process.exit(1);
  });
}
