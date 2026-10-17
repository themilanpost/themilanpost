/**
 * Build-time sneak-peek lines for the homepage Tracker teaser.
 * Reads the same static JSON the Tracker app uses (refreshed by Actions).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type TrackerTeaserLine = {
  id: string;
  text: string;
  href?: string;
};

type PulseEvent = { start: string; free?: boolean };
type PulseStrike = {
  start: string;
  end: string;
  milanRelevant?: boolean;
  sector?: string;
  en?: { sector?: string };
};

const TZ = 'Europe/Rome';
const DATA_DIR = join(process.cwd(), 'public/data/milan-pulse');

function readJson<T>(name: string): T | null {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, name), 'utf8')) as T;
  } catch {
    return null;
  }
}

function romeToday(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ });
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function eventDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
}

function weekdayLabel(isoDate: string, lang: 'en' | 'it'): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

function loadEvents(): PulseEvent[] {
  // Prefer slim shards (today + agenda cover the teaser window).
  const agenda = readJson<{ live?: boolean; events?: PulseEvent[] }>('agenda.json');
  if (agenda?.live && agenda.events?.length) return agenda.events;
  const today = readJson<{ live?: boolean; events?: PulseEvent[] }>('today.json');
  if (today?.live && today.events?.length) return today.events;

  const list: PulseEvent[] = [];
  const eb = readJson<{ live?: boolean; events?: PulseEvent[] }>('eventbrite.json');
  const dice = readJson<{ live?: boolean; events?: PulseEvent[] }>('dice.json');
  if (eb?.live && eb.events) list.push(...eb.events);
  if (dice?.live && dice.events) list.push(...dice.events);
  return list;
}

function loadStrikes(): PulseStrike[] {
  const milan = readJson<{ strikes?: PulseStrike[] }>('strikes-milan.json');
  if (milan?.strikes) return milan.strikes;
  const data = readJson<{ strikes?: PulseStrike[] }>('strikes.json');
  return (data?.strikes || []).filter((s) => s.milanRelevant);
}

function loadAlertCount(): number {
  const data = readJson<{ live?: boolean; alerts?: unknown[] }>('mobility.json');
  if (!data?.live) return 0;
  return data.alerts?.length ?? 0;
}

/** Headlines for the rotating teaser (max ~4). Empty when feeds missing. */
export function getTrackerTeaserLines(lang: 'en' | 'it' = 'en'): TrackerTeaserLine[] {
  const today = romeToday();
  const weekEnd = addDays(today, 7);
  const events = loadEvents();
  const strikes = loadStrikes();
  const lines: TrackerTeaserLine[] = [];

  const todayCount = events.filter((e) => eventDay(e.start) === today).length;
  if (todayCount > 0) {
    lines.push({
      id: 'events-today',
      text:
        lang === 'it'
          ? todayCount === 1
            ? '1 evento oggi a Milano'
            : `${todayCount} eventi oggi a Milano`
          : todayCount === 1
            ? '1 event today in Milan'
            : `${todayCount} events today in Milan`,
    });
  }

  const weekCount = events.filter((e) => {
    const day = eventDay(e.start);
    return day >= today && day <= weekEnd;
  }).length;
  if (weekCount > 0 && weekCount !== todayCount) {
    lines.push({
      id: 'events-week',
      text:
        lang === 'it'
          ? `${weekCount} eventi in agenda questa settimana`
          : `${weekCount} events on this week's agenda`,
    });
  }

  const activeToday = strikes.filter((s) => s.start <= today && s.end >= today);
  if (activeToday.length > 0) {
    const sector =
      lang === 'en' && activeToday[0].en?.sector
        ? activeToday[0].en.sector
        : activeToday[0].sector || (lang === 'it' ? 'trasporti' : 'transport');
    lines.push({
      id: 'strike-today',
      text:
        lang === 'it'
          ? `Sciopero oggi · ${sector}`
          : `Strike today · ${sector}`,
    });
  } else {
    const upcoming = strikes
      .filter((s) => s.end >= today)
      .sort((a, b) => a.start.localeCompare(b.start));
    const next = upcoming[0];
    if (next) {
      const when = weekdayLabel(next.start, lang);
      const sector =
        lang === 'en' && next.en?.sector ? next.en.sector : next.sector || '';
      lines.push({
        id: 'strike-next',
        text:
          lang === 'it'
            ? `Prossimo sciopero rilevante: ${when}${sector ? ` · ${sector}` : ''}`
            : `Next Milan strike: ${when}${sector ? ` · ${sector}` : ''}`,
      });
    }
  }

  const alerts = loadAlertCount();
  if (alerts > 0) {
    lines.push({
      id: 'atm-alerts',
      text:
        lang === 'it'
          ? alerts === 1
            ? '1 avviso ATM attivo'
            : `${alerts} avvisi ATM attivi`
          : alerts === 1
            ? '1 ATM alert live'
            : `${alerts} ATM alerts live`,
    });
  }

  if (!lines.length) {
    lines.push({
      id: 'fallback',
      text:
        lang === 'it'
          ? 'Tracker Milano · eventi, ATM e scioperi'
          : 'Milan Tracker · events, ATM alerts & strikes',
    });
  }

  return lines.slice(0, 4);
}

export type TrackerPageSummary = {
  eventsToday: number;
  eventsWeek: number;
  alertCount: number;
  strikeLine: string | null;
  bullets: string[];
  sources: { label: string; href: string }[];
  disclaimer: string;
};

/** Crawlable SSR summary for /tracker/ (replaced by the JS app on hydrate). */
export function getTrackerPageSummary(lang: 'en' | 'it' = 'en'): TrackerPageSummary {
  const today = romeToday();
  const weekEnd = addDays(today, 7);
  const events = loadEvents();
  const strikes = loadStrikes();
  const alertCount = loadAlertCount();

  const eventsToday = events.filter((e) => eventDay(e.start) === today).length;
  const eventsWeek = events.filter((e) => {
    const day = eventDay(e.start);
    return day >= today && day <= weekEnd;
  }).length;

  let strikeLine: string | null = null;
  const activeToday = strikes.filter((s) => s.start <= today && s.end >= today);
  if (activeToday.length > 0) {
    const sector =
      lang === 'en' && activeToday[0].en?.sector
        ? activeToday[0].en.sector
        : activeToday[0].sector || (lang === 'it' ? 'trasporti' : 'transport');
    strikeLine =
      lang === 'it' ? `Sciopero oggi · ${sector}` : `Strike today · ${sector}`;
  } else {
    const next = strikes
      .filter((s) => s.end >= today)
      .sort((a, b) => a.start.localeCompare(b.start))[0];
    if (next) {
      const when = weekdayLabel(next.start, lang);
      const sector =
        lang === 'en' && next.en?.sector ? next.en.sector : next.sector || '';
      strikeLine =
        lang === 'it'
          ? `Prossimo sciopero rilevante: ${when}${sector ? ` · ${sector}` : ''}`
          : `Next Milan strike: ${when}${sector ? ` · ${sector}` : ''}`;
    }
  }

  const bullets: string[] = [];
  if (lang === 'it') {
    if (eventsToday > 0) {
      bullets.push(
        eventsToday === 1 ? '1 evento in agenda oggi' : `${eventsToday} eventi in agenda oggi`,
      );
    } else {
      bullets.push('Nessun evento in agenda oggi nei feed salvati');
    }
    if (eventsWeek > 0 && eventsWeek !== eventsToday) {
      bullets.push(`${eventsWeek} eventi nei prossimi 7 giorni`);
    }
    if (strikeLine) bullets.push(strikeLine);
    else bullets.push('Nessuno sciopero rilevante per Milano nel feed MIT');
    if (alertCount > 0) {
      bullets.push(
        alertCount === 1 ? '1 avviso ATM attivo' : `${alertCount} avvisi ATM attivi`,
      );
    } else {
      bullets.push('Nessun avviso ATM prioritario nel feed salvato');
    }
  } else {
    if (eventsToday > 0) {
      bullets.push(
        eventsToday === 1 ? '1 event listed for today' : `${eventsToday} events listed for today`,
      );
    } else {
      bullets.push('No events listed for today in the saved feeds');
    }
    if (eventsWeek > 0 && eventsWeek !== eventsToday) {
      bullets.push(`${eventsWeek} events in the next 7 days`);
    }
    if (strikeLine) bullets.push(strikeLine);
    else bullets.push('No Milan-relevant strikes in the MIT feed');
    if (alertCount > 0) {
      bullets.push(
        alertCount === 1 ? '1 ATM alert live' : `${alertCount} ATM alerts live`,
      );
    } else {
      bullets.push('No priority ATM alerts in the saved feed');
    }
  }

  const sources =
    lang === 'it'
      ? [
          { label: 'MIT scioperi', href: 'https://scioperi.mit.gov.it/mit2/public/scioperi' },
          { label: 'ATM Info Traffico', href: 'https://www.atm.it/it/ATMNews/InfoTraffico/Pagine/default.aspx' },
          { label: 'Eventbrite Milano', href: 'https://www.eventbrite.it/d/italy--milan/events/' },
          { label: 'DICE Milano', href: 'https://dice.fm/browse/milan' },
        ]
      : [
          { label: 'MIT strike portal', href: 'https://scioperi.mit.gov.it/mit2/public/scioperi' },
          { label: 'ATM Info Traffico', href: 'https://www.atm.it/en/ATMNews/InfoTraffico/Pages/default.aspx' },
          { label: 'Eventbrite Milan', href: 'https://www.eventbrite.it/d/italy--milan/events/' },
          { label: 'DICE Milan', href: 'https://dice.fm/browse/milan' },
        ];

  const disclaimer =
    lang === 'it'
      ? 'Non affiliati a ATM, Comune di Milano, Eventbrite o DICE. Gli eventi sono uno snapshot non ufficiale (non un calendario cittadino completo). Scioperi e ATM da feed pubblici. Verifica sempre sul link della fonte.'
      : 'Not affiliated with ATM, Comune di Milano, Eventbrite, or DICE. Event listings are an unofficial snapshot, not a full city calendar. Strikes and ATM alerts come from public feeds. Always verify on the source link.';

  return { eventsToday, eventsWeek, alertCount, strikeLine, bullets, sources, disclaimer };
}
