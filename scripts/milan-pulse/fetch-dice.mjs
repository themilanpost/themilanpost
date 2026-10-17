#!/usr/bin/env node
/**
 * Fetches upcoming Milan music events from DICE browse pages (__NEXT_DATA__).
 * Complements Eventbrite — clubs, gigs, DJ nights.
 *
 * Schedule: see .github/workflows/refresh-live.yml
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const CITY_SLUG = 'milano';
const CITY_ID = '5d68e89f7f285e094f60b00e';
const BROWSE_ROOT = `https://dice.fm/browse/${CITY_SLUG}-${CITY_ID}`;
const SOURCE_LABEL = 'DICE · Milano (music)';
const SOURCE_URL = BROWSE_ROOT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../../public/data/milan-pulse/dice.json');

const FEEDS = [
  { path: '', label: 'All' },
  { path: '/music/dj', label: 'DJ' },
  { path: '/music/gig', label: 'Gigs' },
];

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

function euros(cents) {
  if (cents == null || Number.isNaN(cents)) return null;
  return Math.round(Number(cents)) / 100;
}

function parseNextEvents(html) {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return [];
  try {
    return JSON.parse(m[1]).props?.pageProps?.events ?? [];
  } catch {
    return [];
  }
}

function priceFields(price = {}) {
  const { amount, amount_from: amountFrom } = price;
  if (amountFrom != null) {
    const priceFrom = euros(amountFrom);
    const priceTo = amount != null && amount > amountFrom ? euros(amount) : null;
    return { free: false, priceFrom, priceTo };
  }
  if (amount === 0) return { free: true, priceFrom: null, priceTo: null };
  if (amount > 0) return { free: false, priceFrom: euros(amount), priceTo: null };
  return { free: false, priceFrom: null, priceTo: null };
}

function normalizeEvent(raw) {
  const venue = raw.venues?.[0];
  const city = venue?.city?.name || 'Milano';
  const start = raw.dates?.event_start_date;
  if (!start) return null;

  const end = raw.dates?.event_end_date || start;
  const pricing = priceFields(raw.price);

  return {
    id: `dice-${raw.id}`,
    title: raw.name,
    titleIt: raw.name,
    start,
    end,
    category: 'music',
    city,
    zone: city,
    venue: venue?.name || city,
    ...pricing,
    url: `https://dice.fm/event/${raw.perm_name}`,
    image: raw.images?.landscape || raw.images?.square || null,
    description: raw.summary?.slice(0, 280) || null,
    source: 'dice',
  };
}

function fingerprint(events) {
  const payload = events
    .map((e) => `${e.id}:${e.start.slice(0, 10)}:${e.free}:${e.priceFrom ?? ''}:${e.priceTo ?? ''}`)
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

async function fetchFeed(feed) {
  const url = `${BROWSE_ROOT}${feed.path}`;
  const res = await fetch(url, {
    headers: { Accept: 'text/html', 'User-Agent': UA },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`DICE HTTP ${res.status} (${feed.label})`);

  const html = await res.text();
  const raw = parseNextEvents(html);
  const events = raw.map(normalizeEvent).filter(Boolean);
  console.log(`  ${feed.label}: ${events.length} events`);
  return events;
}

async function main() {
  const startDate = romeToday();
  const endDate = addDays(startDate, DAYS_AHEAD);
  console.log(`Fetching DICE Milano (${startDate} → ${endDate}) …`);

  const byId = new Map();
  for (const feed of FEEDS) {
    for (const ev of await fetchFeed(feed)) byId.set(ev.id, ev);
  }

  const events = [...byId.values()]
    .filter((e) => e.start.slice(0, 10) >= startDate && e.start.slice(0, 10) <= endDate)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const fp = fingerprint(events);
  const existing = readExisting();
  if (!force && existing?.fingerprint === fp) {
    console.log(`DICE listings unchanged (fingerprint ${fp}) — skipping write.`);
    return;
  }

  const data = {
    updatedAt: new Date().toISOString(),
    source: SOURCE_LABEL,
    sourceUrl: SOURCE_URL,
    live: true,
    feeds: FEEDS.map(({ path, label }) => ({ path, label })),
    range: { from: startDate, to: endDate },
    fingerprint: fp,
    events,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${events.length} events → ${OUT_PATH}`);
  console.log(`  free: ${events.filter((e) => e.free).length}, priced: ${events.filter((e) => e.priceFrom != null).length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
