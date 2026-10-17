#!/usr/bin/env node
/**
 * Build slim Tracker shards from full feed dumps so the client can lazy-load by tab.
 * Reads: eventbrite.json, dice.json, strikes.json
 * Writes: today.json, agenda.json, strikes-milan.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../public/data/milan-pulse');
const TZ = 'Europe/Rome';

const SLIM_KEYS = [
  'id',
  'title',
  'titleIt',
  'start',
  'end',
  'category',
  'zone',
  'venue',
  'free',
  'priceFrom',
  'priceTo',
  'url',
  'source',
  'nearestStops',
];

function romeToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ });
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function eventDay(iso) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
}

function readJson(name) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function slimEvent(e) {
  const out = {};
  for (const k of SLIM_KEYS) {
    if (e[k] !== undefined && e[k] !== null) out[k] = e[k];
  }
  return out;
}

function loadMergedEvents() {
  const list = [];
  const sources = [];
  const eb = readJson('eventbrite.json');
  const dice = readJson('dice.json');
  if (eb?.live && Array.isArray(eb.events)) {
    list.push(...eb.events);
    sources.push({
      id: 'eventbrite',
      label: 'Eventbrite',
      url: eb.sourceUrl || null,
      updatedAt: eb.updatedAt || null,
    });
  }
  if (dice?.live && Array.isArray(dice.events)) {
    list.push(...dice.events);
    sources.push({
      id: 'dice',
      label: 'DICE',
      url: dice.sourceUrl || null,
      updatedAt: dice.updatedAt || null,
    });
  }
  const byId = new Map();
  for (const e of list) byId.set(e.id, e);
  return {
    events: [...byId.values()].sort((a, b) => new Date(a.start) - new Date(b.start)),
    sources,
    live: sources.length > 0,
    updatedAt: [eb?.updatedAt, dice?.updatedAt].filter(Boolean).sort().at(-1) || null,
  };
}

function writeJson(name, data) {
  const p = path.join(DATA_DIR, name);
  fs.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`);
  const bytes = fs.statSync(p).size;
  console.log(`  ${name}: ${bytes} bytes`);
  return bytes;
}

export function writeShards() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const today = romeToday();
  const weekEnd = addDays(today, 7);
  const { events, sources, live, updatedAt } = loadMergedEvents();

  const todayEvents = events.filter((e) => eventDay(e.start) === today).map(slimEvent);
  const agendaEvents = events
    .filter((e) => {
      const day = eventDay(e.start);
      return day >= today && day <= weekEnd;
    })
    .map(slimEvent);

  writeJson('today.json', {
    updatedAt,
    live,
    range: { from: today, to: today },
    sources,
    count: todayEvents.length,
    events: todayEvents,
  });

  writeJson('agenda.json', {
    updatedAt,
    live,
    range: { from: today, to: weekEnd },
    sources,
    count: agendaEvents.length,
    events: agendaEvents,
  });

  const strikesFull = readJson('strikes.json');
  const milan = (strikesFull?.strikes || []).filter((s) => s.milanRelevant);
  writeJson('strikes-milan.json', {
    updatedAt: strikesFull?.updatedAt || null,
    feedUpdated: strikesFull?.feedUpdated || null,
    source: strikesFull?.source || 'MIT Osservatorio Scioperi · RSS',
    sourceUrl: strikesFull?.sourceUrl || null,
    portalUrl: strikesFull?.portalUrl || null,
    live: Boolean(strikesFull?.live),
    translation: strikesFull?.translation || null,
    count: milan.length,
    strikes: milan,
  });

  console.log(
    `Shards: today ${todayEvents.length}, agenda ${agendaEvents.length}, strikes-milan ${milan.length}`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeShards();
}
