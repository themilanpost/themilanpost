import { labelStrike, strikeType, fmtStrikeDate, fmtStrikeDay, TYPE } from './strike-labels.js';

const TZ = 'Europe/Rome';
const DATA_BASE = '/data/milan-pulse';
const HOME_URL_EN = '/';
const HOME_URL_IT = '/it/';
const MIT_PORTAL_URL = 'https://scioperi.mit.gov.it/mit2/public/scioperi';
const CATEGORIES = ['all', 'culture', 'music', 'sport', 'food'];
const DOCK_ORDER = ['oggi', 'agenda', 'mobilita', 'scioperi'];
const DOCK_ICONS = {
  oggi: '◐',
  agenda: '☰',
  mobilita: 'Ⓜ',
  scioperi: '⚠️',
};

const i18n = {
  en: {
    kicker: 'The Milan Post',
    title: 'Milan Tracker',
    subtitle: 'What\'s on today — and can you actually get there?',
    tabs: { oggi: 'Today', agenda: 'Agenda', mobilita: 'Transport', scioperi: '⚠️ Strikes' },
    nextUp: 'Next up',
    happeningNow: 'Happening now',
    endsIn: (cd) => (cd ? `Ends in ${cd}` : ''),
    today: 'Today',
    noEvents: 'No events match your filters.',
    guaranteed: 'Guaranteed service',
    free: 'Free',
    from: 'From',
    source: 'Sources',
    noMobilityAlerts: 'No active service alerts in the ATM feed.',
    mobilityUnavailable: 'ATM feed unavailable — check atm.it',
    mobilityLive: 'Transport: ATM priority alerts (live)',
    mobilityFilterNote: 'Showing service changes with an official English page on atm.it.',
    mobilityDisclaimer: 'Service changes from ATM — not live vehicle tracking. Use the ATM app for real-time departures.',
    atmInfoTraffico: 'ATM Info Traffico',
    atmAppAndroid: 'ATM app (Android)',
    atmAppIos: 'ATM app (iOS)',
    eventbriteLive: 'Events: Eventbrite + DICE Milan (live)',
    diceLive: 'Music: DICE Milano (live)',
    strikesLive: 'Strikes: MIT RSS (live)',
    noStrikes: 'No Milan-relevant strikes scheduled in the MIT feed.',
    checkAtm: 'For ATM guaranteed hours during local transport strikes, check atm.it — the MIT feed does not always include them.',
    viewMit: 'Full national strike calendar',
    strikeToday: 'Strike affecting travel today',
    strikesHeading: 'Relevant for Milan',
    strikeTodayBadge: 'Today',
    strikeSoonBadge: 'Soon',
    strikeFilterAll: 'All',
    strikeFilterToday: 'Today',
    strikeSummary: (n) => `${n} strike${n === 1 ? '' : 's'} affecting Milan`,
    strikeSummaryNone: 'No upcoming strikes affecting Milan',
    strikeWho: 'Who',
    strikeWhen: 'When',
    strikeScope: 'Scope',
    showOriginal: 'Original (Italian)',
    translatedBy: 'Translated by DeepL',
    alertsHeading: 'Alerts',
    mobDisruption: 'Disruption',
    mobStrike: 'ATM strike',
    filters: { free: 'Free only' },
    categories: { all: 'All', culture: 'Culture', music: 'Music', sport: 'Sport', food: 'Food & drink' },
    atmLink: 'Real-time on ATM app',
    checkAtmShort: 'Check atm.it',
    seeOnEventbrite: 'See on',
    eventbrite: 'Eventbrite',
    seeOnDice: 'See on',
    dice: 'DICE',
    backHome: '← The Milan Post',
    loading: 'Loading…',
    noUpcoming: 'No upcoming events in the saved feed.',
    refreshHint: 'Refresh locally with: npm run fetch:milan-pulse',
    footerAffiliate:
      'Not affiliated with ATM, Comune di Milano, Eventbrite, or DICE',
    footerListings:
      'Event listings are an unofficial snapshot (not a full city calendar) — confirm on the source link',
    footerVerify: 'Verify travel on',
    footerDataSources: 'Data sources',
  },
  it: {
    kicker: 'The Milan Post',
    title: 'Milan Tracker',
    subtitle: 'Cosa succede oggi — e ci arrivi davvero?',
    tabs: { oggi: 'Oggi', agenda: 'Agenda', mobilita: 'Mobilità', scioperi: '⚠️ Scioperi' },
    nextUp: 'Prossimo',
    happeningNow: 'In corso',
    endsIn: (cd) => (cd ? `Finisce tra ${cd}` : ''),
    today: 'Oggi',
    noEvents: 'Nessun evento con questi filtri.',
    guaranteed: 'Fasce garantite',
    free: 'Gratis',
    from: 'Da',
    source: 'Fonti',
    mobilityUnavailable: 'Feed ATM non disponibile — vedi atm.it',
    noMobilityAlerts: 'Nessun avviso attivo nel feed ATM.',
    mobilityLive: 'Trasporti: avvisi ATM prioritari (live)',
    mobilityFilterNote: 'Solo cambiamenti di servizio con pagina inglese ufficiale su atm.it.',
    mobilityDisclaimer: 'Cambiamenti di servizio ATM — non tracking in tempo reale. Per partenze live usa l\'app ATM.',
    atmInfoTraffico: 'Info Traffico ATM',
    atmAppAndroid: 'App ATM (Android)',
    atmAppIos: 'App ATM (iOS)',
    eventbriteLive: 'Eventi: Eventbrite + DICE Milano (live)',
    diceLive: 'Musica: DICE Milano (live)',
    strikesLive: 'Scioperi: MIT RSS (live)',
    noStrikes: 'Nessuno sciopero rilevante per Milano nel feed MIT.',
    checkAtm: 'Per le fasce garantite ATM durante gli scioperi TPL, controlla atm.it — il feed MIT non le include sempre.',
    viewMit: 'Calendario nazionale completo',
    strikeToday: 'Sciopero che riguarda i trasporti oggi',
    strikesHeading: 'Rilevanti per Milano',
    strikeTodayBadge: 'Oggi',
    strikeSoonBadge: 'Presto',
    strikeFilterAll: 'Tutti',
    strikeFilterToday: 'Oggi',
    strikeSummary: (n) =>
      n === 1 ? '1 sciopero che riguarda Milano' : `${n} scioperi che riguardano Milano`,
    strikeSummaryNone: 'Nessuno sciopero in programma per Milano',
    strikeWho: 'Chi',
    strikeWhen: 'Quando',
    strikeScope: 'Ambito',
    showOriginal: 'Originale (italiano)',
    translatedBy: 'Translated by DeepL',
    alertsHeading: 'Avvisi',
    mobDisruption: 'Disruption',
    mobStrike: 'Sciopero ATM',
    filters: { free: 'Solo gratis' },
    categories: { all: 'Tutti', culture: 'Cultura', music: 'Musica', sport: 'Sport', food: 'Cibo e bevande' },
    atmLink: 'Tempo reale sull\'app ATM',
    checkAtmShort: 'Verifica su atm.it',
    seeOnEventbrite: 'Vedi su',
    eventbrite: 'Eventbrite',
    seeOnDice: 'Vedi su',
    dice: 'DICE',
    backHome: '← The Milan Post',
    loading: 'Caricamento…',
    noUpcoming: 'Nessun evento futuro nel feed salvato.',
    refreshHint: 'Aggiorna in locale con: npm run fetch:milan-pulse',
    footerAffiliate:
      'Non affiliati ad ATM, Comune di Milano, Eventbrite o DICE',
    footerListings:
      'Gli eventi sono uno snapshot non ufficiale (non un calendario cittadino completo) — conferma sul link della fonte',
    footerVerify: 'Verifica i viaggi su',
    footerDataSources: 'Fonti dati',
  },
};

function pageLangFromUrl() {
  const initial = document.getElementById('milan-pulse')?.dataset.initialLang;
  if (initial === 'it' || initial === 'en') return initial;
  return document.documentElement.lang?.startsWith('it') ? 'it' : 'en';
}

let lang = pageLangFromUrl();
let tab = 'oggi';
let category = 'all';
let freeOnly = false;
let strikeFilter = 'all';
/** Agenda day picker: Rome calendar date `YYYY-MM-DD`, or null → auto. */
let agendaDay = null;
let tickTimer = null;
/** Event pool for live banner (wall clock). */
let liveEventPool = [];
/** Rotating banner slide index + fingerprint of current slide set. */
let bannerSlideIndex = 0;
let bannerSlideFp = '';
const BANNER_ROTATE_MS = 5000;

/** Slim shards (see scripts/milan-pulse/write-shards.mjs) — lazy-loaded by tab. */
let todayData = { events: [], live: false, sources: [] };
let agendaData = { events: [], live: false, sources: [] };
let strikesData = { strikes: [], live: false };
let mobilityData = { lines: [], alerts: [], live: false };
const loaded = { today: false, agenda: false, strikes: false, mobility: false };
const loading = { today: null, agenda: null, strikes: null, mobility: null };

const locale = () => (lang === 'it' ? 'it-IT' : 'en-GB');
const t = () => i18n[lang];

function events() {
  const bundle = tab === 'agenda' ? agendaData : todayData;
  return bundle.events || [];
}
const strikes = () => strikesData.strikes || [];

function eventsBundleLive() {
  const bundle = tab === 'agenda' ? agendaData : todayData;
  return Boolean(bundle.live);
}

function dateFmt(iso, options) {
  return new Date(iso).toLocaleString(locale(), { timeZone: TZ, ...options });
}

const fmtTime = (iso) => dateFmt(iso, { hour: '2-digit', minute: '2-digit', hour12: false });
const fmtDate = (iso) => dateFmt(iso, { weekday: 'short', day: 'numeric', month: 'short' });
const fmtUpdated = (iso) => (iso ? dateFmt(iso, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }) : '');

function todayIso() {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ });
}

function eventTitle(e) {
  return lang === 'it' && e.titleIt ? e.titleIt : e.title;
}

function sectorMatch(sector, ...needles) {
  const s = (sector || '').toLowerCase();
  return needles.some((n) => s.includes(n));
}

function milanTplStrikeOn(dateStr) {
  return strikes().find((s) => {
    if (s.start > dateStr || s.end < dateStr) return false;
    if (strikeType(s.sector) !== 'tpl') return false;
    const region = (s.region || '').trim();
    const cat = (s.category || '').toUpperCase();
    if (region === 'Lombardia') return true;
    return /ATM|MILANO/.test(cat);
  });
}

function eventLineDisruption(event) {
  const warned = new Set(
    (mobilityData.lines || []).filter((l) => l.status === 'warning').map((l) => l.id),
  );
  if (!warned.size) return false;
  return (event.nearestStops || []).some((stop) =>
    (stop.lines || []).some((line) => warned.has(line)),
  );
}

function mobilityPillForEvent(event) {
  const dateStr = event.start.slice(0, 10);
  if (milanTplStrikeOn(dateStr)) {
    return { cls: 'mob-bad', label: t().mobStrike };
  }
  if (eventLineDisruption(event)) {
    return { cls: 'mob-warn', label: t().mobDisruption };
  }
  return null;
}

function strikeOn(dateStr, sectors, { milanOnly = true } = {}) {
  return strikes().find((s) => {
    if (s.start > dateStr || s.end < dateStr) return false;
    if (milanOnly && !s.milanRelevant) return false;
    return sectorMatch(s.sector, ...sectors);
  });
}

function filterEvents(list) {
  return list.filter((e) => {
    if (category !== 'all' && e.category !== category) return false;
    if (freeOnly && !e.free) return false;
    return true;
  });
}

function formatDuration(ms) {
  if (ms <= 0) return '';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${Math.max(m, 1)}m`;
}

function countdown(iso) {
  return formatDuration(new Date(iso).getTime() - Date.now());
}

function eventStartMs(e) {
  return new Date(e.start).getTime();
}

function eventEndMs(e) {
  if (e.end) {
    const end = new Date(e.end).getTime();
    if (Number.isFinite(end)) return end;
  }
  // No end in feed — assume a few hours so day-long listings do not stick after start.
  return eventStartMs(e) + 3 * 60 * 60 * 1000;
}

/** All events with start ≤ now < end (wall clock). */
function eventsHappeningNow(list) {
  const now = Date.now();
  return list
    .filter((e) => {
      const start = eventStartMs(e);
      return Number.isFinite(start) && start <= now && eventEndMs(e) > now;
    })
    .sort((a, b) => eventEndMs(a) - eventEndMs(b));
}

/** Soonest event that has not started yet. */
function pickNextUpcoming(list) {
  const now = Date.now();
  return (
    list
      .filter((e) => eventStartMs(e) > now)
      .sort((a, b) => eventStartMs(a) - eventStartMs(b))[0] || null
  );
}

function mobilityAlertText(a) {
  if (lang === 'en') {
    return {
      title: a.titleEn || a.titleIt || a.title,
      body: a.bodyEn || a.bodyIt || a.body,
      url: a.urlEn || a.urlIt || a.url,
    };
  }
  return {
    title: a.titleIt || a.title,
    body: a.bodyIt || a.body,
    url: a.urlIt || a.url,
  };
}

function renderAlert(a, fallback = 'info') {
  const severity = a.severity === 'warning' ? '' : (a.severity || fallback);
  const text = a.titleEn || a.titleIt ? mobilityAlertText(a) : { title: a.title, body: a.body, url: a.url };
  const link = text.url
    ? `<p style="margin-top:6px;font-size:12px"><a href="${text.url}" target="_blank" rel="noopener">atm.it →</a></p>`
    : '';
  return `
    <div class="alert ${severity}">
      <strong>${text.title}</strong>
      <p>${text.body}</p>
      ${link}
    </div>`;
}

function fmtPrice(amount) {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/\.?0+$/, '');
}

function priceTagHtml(e) {
  if (e.free) return `<span class="tag free">${t().free}</span>`;
  if (e.priceFrom == null) return '';
  const from = fmtPrice(e.priceFrom);
  if (e.priceTo != null && e.priceTo > e.priceFrom) {
    return `<span class="tag">€${from}+</span>`;
  }
  return `<span class="tag">€${from}</span>`;
}

function renderEventCard(e) {
  const mob = mobilityPillForEvent(e);
  const stop = e.nearestStops?.[0];
  const priceTag = priceTagHtml(e);

  const eventbriteLink = e.source === 'eventbrite' && e.url
    ? `<p class="event-source">${t().seeOnEventbrite} <a href="${e.url}" target="_blank" rel="noopener">${t().eventbrite}</a></p>`
    : '';
  const diceLink = e.source === 'dice' && e.url
    ? `<p class="event-source">${t().seeOnDice} <a href="${e.url}" target="_blank" rel="noopener">${t().dice}</a></p>`
    : '';

  return `
    <article class="event-card">
      <div class="event-time">
        ${fmtTime(e.start)}
        <small>${fmtDate(e.start)}</small>
      </div>
      <div class="event-body">
        <h3>${eventTitle(e)}</h3>
        <p class="event-meta">${e.venue} · ${e.zone}${stop ? ` · ${stop.lines.join(', ')} (${stop.walkMin} min)` : ''}</p>
        ${eventbriteLink}${diceLink}
        <div class="event-tags">
          <span class="tag cat-${e.category}">${t().categories[e.category] || e.category}</span>
          ${priceTag}
          ${mob ? `<span class="tag ${mob.cls}">${mob.label}</span>` : ''}
        </div>
      </div>
    </article>`;
}

function buildBannerSlides(list) {
  const slides = [];
  if (tab === 'oggi') {
    const todayStrike = strikeOn(todayIso(), 'pubblico', 'ferroviario');
    if (todayStrike) {
      const L = labelStrike(todayStrike, lang);
      const g = todayStrike.guaranteed?.length
        ? todayStrike.guaranteed.join(', ')
        : t().checkAtmShort;
      slides.push({
        key: `strike-${todayStrike.id || todayStrike.start}`,
        kind: 'strike',
        label: t().strikeToday,
        title: `${L.icon} ${L.sector}`,
        meta: `${L.who} · ${L.mode}`,
        detail: `${t().guaranteed}: ${g}`,
      });
    }
  }
  for (const e of eventsHappeningNow(list)) {
    const until = formatDuration(eventEndMs(e) - Date.now());
    const range = e.end ? `${fmtTime(e.start)}–${fmtTime(e.end)}` : fmtTime(e.start);
    slides.push({
      key: `live-${e.id}`,
      kind: 'live',
      label: t().happeningNow,
      title: eventTitle(e),
      meta: `${e.venue} · ${range}`,
      detail: until ? t().endsIn(until) : '',
      event: e,
    });
  }
  const next = pickNextUpcoming(list);
  if (next) {
    const cd = countdown(next.start);
    slides.push({
      key: `next-${next.id}`,
      kind: 'next',
      label: t().nextUp,
      title: eventTitle(next),
      meta: `${fmtTime(next.start)} · ${next.venue} · ${next.zone}`,
      detail: cd || '',
      event: next,
    });
  }
  return slides;
}

function bannerSlideInnerHtml(slide) {
  const pulse =
    slide.kind === 'live'
      ? '<span class="live-banner-pulse" aria-hidden="true"></span>'
      : '';
  return `
    <div class="live-banner-label">${pulse}${slide.label}</div>
    <div class="live-banner-title">${slide.title}</div>
    <div class="live-banner-meta">${slide.meta}</div>
    ${slide.detail ? `<div class="live-banner-detail">${slide.detail}</div>` : ''}`;
}

function syncBannerSlideIndex(slides) {
  const fp = slides.map((s) => s.key).join('|');
  if (fp !== bannerSlideFp) {
    bannerSlideFp = fp;
    bannerSlideIndex = 0;
  } else if (slides.length) {
    bannerSlideIndex = bannerSlideIndex % slides.length;
  } else {
    bannerSlideIndex = 0;
  }
}

function renderBanners(filtered) {
  liveEventPool = filtered;
  const slides = buildBannerSlides(filtered);
  syncBannerSlideIndex(slides);
  if (!slides.length) {
    return `<div id="milan-pulse-banners" class="live-banner" hidden></div>`;
  }
  const slide = slides[bannerSlideIndex];
  const dots =
    slides.length > 1
      ? `<div class="live-banner-dots" aria-hidden="true">${slides
          .map(
            (_, i) =>
              `<span class="live-banner-dot${i === bannerSlideIndex ? ' is-on' : ''}"></span>`,
          )
          .join('')}</div>`
      : '';
  return `
    <section
      id="milan-pulse-banners"
      class="live-banner live-banner--${slide.kind}"
      aria-live="polite"
      aria-atomic="true"
      data-slide-count="${slides.length}"
    >
      <div class="live-banner-stage">
        <div class="live-banner-slide is-in" data-slide-key="${slide.key}">
          ${bannerSlideInnerHtml(slide)}
        </div>
      </div>
      ${dots}
    </section>`;
}

function renderHero(filtered) {
  return renderBanners(filtered);
}

function preferReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Crossfade to the next slide (or refresh timers) without rebuilding the page. */
function refreshLiveBlocks() {
  if (tab !== 'oggi' && tab !== 'agenda') return;
  const host = document.getElementById('milan-pulse-banners');
  if (!host) return;

  const slides = buildBannerSlides(liveEventPool);
  syncBannerSlideIndex(slides);

  if (!slides.length) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  host.hidden = false;
  if (slides.length > 1) {
    bannerSlideIndex = (bannerSlideIndex + 1) % slides.length;
  }
  const slide = slides[bannerSlideIndex];
  const stage = host.querySelector('.live-banner-stage');
  if (!stage) {
    host.outerHTML = renderBanners(liveEventPool);
    return;
  }

  const reduce = preferReducedMotion();
  const incoming = document.createElement('div');
  incoming.className = `live-banner-slide${reduce ? ' is-in' : ' is-enter'}`;
  incoming.dataset.slideKey = slide.key;
  incoming.innerHTML = bannerSlideInnerHtml(slide);

  const outgoing = stage.querySelector('.live-banner-slide');
  host.className = `live-banner live-banner--${slide.kind}`;
  host.dataset.slideCount = String(slides.length);

  if (!outgoing || reduce || outgoing.dataset.slideKey === slide.key) {
    stage.replaceChildren(incoming);
    incoming.classList.add('is-in');
  } else {
    outgoing.classList.remove('is-in');
    outgoing.classList.add('is-out');
    stage.appendChild(incoming);
    requestAnimationFrame(() => incoming.classList.add('is-in'));
    window.setTimeout(() => outgoing.remove(), 420);
  }

  const dots = host.querySelector('.live-banner-dots');
  if (slides.length > 1) {
    const html = slides
      .map(
        (_, i) =>
          `<span class="live-banner-dot${i === bannerSlideIndex ? ' is-on' : ''}"></span>`,
      )
      .join('');
    if (dots) dots.innerHTML = html;
    else
      host.insertAdjacentHTML(
        'beforeend',
        `<div class="live-banner-dots" aria-hidden="true">${html}</div>`,
      );
  } else if (dots) {
    dots.remove();
  }
}

function emptyEventsHtml(listLength) {
  if (listLength) return `<p class="empty">${t().noEvents}</p>`;
  const now = Date.now();
  const hasUpcoming = events().some((e) => eventEndMs(e) > now);
  if (!hasUpcoming) {
    return `<p class="empty">${t().noUpcoming}<span class="empty-hint">${t().refreshHint}</span></p>`;
  }
  return `<p class="empty">${t().noEvents}</p>`;
}

function renderOggi(filtered) {
  const todayEvents = filtered.filter((e) => isToday(e.start));
  // Hero from today's pool only, ranked by wall clock (not JSON order / fetch time).
  return `
    ${renderHero(todayEvents)}
    <h2 class="section-title">${t().today}</h2>
    <div class="event-list">
      ${todayEvents.length ? todayEvents.map((e) => renderEventCard(e)).join('') : emptyEventsHtml(filtered.length)}
    </div>`;
}

function isToday(iso) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ }) === todayIso();
}

function eventDayKey(iso) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
}

function addRomeDays(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function agendaDayParts(isoDate) {
  const weekday = new Date(`${isoDate}T12:00:00`)
    .toLocaleDateString(locale(), { timeZone: TZ, weekday: 'short' })
    .replace(/\.$/, '')
    .toUpperCase();
  const dayNum = new Date(`${isoDate}T12:00:00`).toLocaleDateString(locale(), {
    timeZone: TZ,
    day: 'numeric',
  });
  return { weekday, dayNum };
}

function agendaDayFullLabel(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(locale(), {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

function renderAgendaDayStrip(dayKeys, selected, hasEvents) {
  const aria = lang === 'it' ? 'Giorno agenda' : 'Agenda day';
  const chips = dayKeys
    .map((key) => {
      const active = key === selected;
      const isTod = key === todayIso();
      const empty = !hasEvents.has(key);
      const { weekday, dayNum } = agendaDayParts(key);
      const emptyTitle = empty
        ? ` title="${lang === 'it' ? 'Nessun evento' : 'No events'}"`
        : '';
      return `
        <button
          type="button"
          class="agenda-day${active ? ' active' : ''}${empty ? ' is-empty' : ''}${isTod ? ' is-today' : ''}"
          data-agenda-day="${key}"
          aria-pressed="${active ? 'true' : 'false'}"
          aria-label="${weekday} ${dayNum}"
          ${emptyTitle}
        >
          <span class="agenda-day-wd">${weekday}</span>
          <span class="agenda-day-num">${dayNum}</span>
        </button>`;
    })
    .join('');
  return `<div class="agenda-days" role="toolbar" aria-label="${aria}">${chips}</div>`;
}

function renderAgenda(filtered) {
  const today = todayIso();
  const dayKeys = Array.from({ length: 7 }, (_, i) => addRomeDays(today, i));

  // All matching events in the 7-day window (include future starts; drop only if ended).
  const weekEvents = filtered
    .filter((e) => {
      const key = eventDayKey(e.start);
      return dayKeys.includes(key) && eventEndMs(e) > Date.now();
    })
    .sort((a, b) => eventStartMs(a) - eventStartMs(b));

  const hasEvents = new Set(weekEvents.map((e) => eventDayKey(e.start)));

  // Default selection: today if it has events, else first day with events, else today.
  if (!agendaDay || !dayKeys.includes(agendaDay)) {
    agendaDay =
      (hasEvents.has(today) ? today : null) ||
      dayKeys.find((k) => hasEvents.has(k)) ||
      today;
  }

  const dayEvents = weekEvents.filter((e) => eventDayKey(e.start) === agendaDay);
  const strip = renderAgendaDayStrip(dayKeys, agendaDay, hasEvents);
  const heading = `<h2 class="section-title">${agendaDayFullLabel(agendaDay)}</h2>`;
  const list = dayEvents.length
    ? `<div class="event-list">${dayEvents.map((e) => renderEventCard(e)).join('')}</div>`
    : `<p class="empty">${t().noEvents}</p>`;

  return `${strip}${renderHero(dayEvents)}${heading}${list}`;
}

function renderMobilita() {
  const infoUrl = mobilityData.sourceUrl || 'https://www.atm.it/it/ViaggiaConNoi/InfoTraffico';
  const disclaimer = mobilityData.disclaimer || t().mobilityDisclaimer;
  const lines = mobilityData.lines || [];
  const alerts = mobilityData.alerts || [];

  if (!mobilityData.live) {
    return `
      <p class="empty">${t().mobilityUnavailable}</p>
      <p style="margin-top:12px;font-size:13px">
        <a href="${infoUrl}" target="_blank" rel="noopener">${t().atmInfoTraffico} →</a>
      </p>`;
  }

  const lineBlock = lines.length
    ? `<div class="line-list">
        ${lines.map((l) => `
        <div class="line-row ${l.status}">
          <span class="line-badge">${l.id}</span>
          <div class="line-info">
            <strong>${l.name}</strong>
            <span>${lang === 'en' && l.noteEn ? l.noteEn : l.note}</span>
          </div>
          <span class="status-dot ${l.status === 'ok' ? '' : l.status}"></span>
        </div>`).join('')}
      </div>`
    : '';

  const alertBlock = alerts.length
    ? alerts.map((a) => renderAlert(a)).join('')
    : `<p class="empty">${t().noMobilityAlerts}</p>`;

  return `
    ${lines.length ? `<h2 class="section-title">ATM</h2>${lineBlock}` : ''}
    <p style="font-size:12px;color:var(--muted);margin-bottom:12px">${t().mobilityFilterNote}</p>
    <h2 class="section-title">${t().alertsHeading}</h2>
    ${alertBlock}
    <p style="margin-top:16px;font-size:12px;color:var(--muted)">${disclaimer}</p>
    <p style="margin-top:10px;font-size:13px">
      <a href="${infoUrl}" target="_blank" rel="noopener">${t().atmInfoTraffico} →</a>
      · <a href="https://play.google.com/store/apps/details?id=it.atm.appmobile" target="_blank" rel="noopener">${t().atmAppAndroid}</a>
      · <a href="https://apps.apple.com/app/atm-milano-official-app/id415637297" target="_blank" rel="noopener">${t().atmAppIos}</a>
    </p>`;
}

const STRIKE_FILTERS = ['all', 'tpl', 'air', 'rail', 'today'];

function daysUntil(iso) {
  const today = todayIso();
  const ms = new Date(`${iso}T12:00:00`) - new Date(`${today}T12:00:00`);
  return Math.round(ms / 86400000);
}

function filterStrikes(list) {
  const today = todayIso();
  return list.filter((s) => {
    if (s.end < today) return false;
    if (strikeFilter === 'today') return s.start <= today && s.end >= today;
    if (strikeFilter === 'all') return true;
    return strikeType(s.sector) === strikeFilter;
  });
}

function renderStrikeRow(s) {
  const L = labelStrike(s, lang);
  const today = todayIso();
  const isToday = s.start <= today && s.end >= today;
  const days = daysUntil(s.start);
  const isSoon = !isToday && days >= 0 && days <= 3;
  const tpl = L.type === 'tpl';
  const badge = isToday ? t().strikeTodayBadge : (isSoon ? t().strikeSoonBadge : '');

  return `
    <article class="strike-row ${L.type}${isToday ? ' is-today' : ''}${isSoon ? ' is-soon' : ''}">
      <div class="strike-row-icon" aria-hidden="true">${L.icon}</div>
      <div class="strike-row-body">
        <div class="strike-row-top">
          <span class="strike-type-pill strike-type-${L.type}">${L.typeLabel}</span>
          ${badge ? `<span class="strike-when-badge">${badge}</span>` : ''}
          <span class="strike-mode">${L.mode}</span>
        </div>
        <div class="strike-row-who">${L.who}</div>
        <div class="strike-row-meta">
          <span>${L.relevance}</span>
          ${L.region ? `<span>${L.region}</span>` : ''}
        </div>
        ${s.guaranteed?.length ? `
          <div class="strike-guaranteed-inline">✓ ${t().guaranteed}: ${s.guaranteed.join(', ')}</div>
        ` : (tpl ? `<div class="strike-guaranteed-inline strike-hint-inline">${t().checkAtmShort} → <a href="https://www.atm.it" target="_blank" rel="noopener">atm.it</a></div>` : '')}
        ${L.machineTranslated ? `<details class="strike-original"><summary>${t().showOriginal}</summary><p>${s.sector}<br>${s.category}<br>${s.mode}</p></details>` : ''}
      </div>
    </article>`;
}

function renderStrikeControls() {
  const filters = STRIKE_FILTERS.map((f) => {
    const label = f === 'all' ? t().strikeFilterAll
      : f === 'today' ? t().strikeFilterToday
      : TYPE[f]?.[lang] || f;
    return `<button type="button" class="chip ${strikeFilter === f ? 'active' : ''}" data-strike-filter="${f}">${label}</button>`;
  }).join('');

  return `
    <div class="controls strike-controls">
      ${filters}
      <a class="lang-toggle" href="${lang === 'en' ? '/it/tracker/' : '/tracker/'}" data-astro-reload>${lang === 'en' ? 'IT' : 'EN'}</a>
    </div>`;
}

function renderScioperi() {
  const relevant = filterStrikes(strikes().filter((s) => s.milanRelevant));
  const mitUrl = strikesData.portalUrl || MIT_PORTAL_URL;
  const upcoming = relevant.filter((s) => s.end >= todayIso());

  const byDate = upcoming.reduce((acc, s) => {
    (acc[s.start] ||= []).push(s);
    return acc;
  }, {});

  const dateSections = Object.keys(byDate).sort().map((date) => {
    const items = byDate[date].map(renderStrikeRow).join('');
    const dayLabel = fmtStrikeDate(date, lang);
    const count = byDate[date].length;
    return `
      <section class="strike-day-group">
        <header class="strike-day-header">
          <span class="strike-day-date">${fmtStrikeDay(date)}</span>
          <span class="strike-day-label">${dayLabel}</span>
          <span class="strike-day-count">${count}</span>
        </header>
        <div class="strike-rows">${items}</div>
      </section>`;
  }).join('');

  const summary = upcoming.length
    ? t().strikeSummary(upcoming.length)
    : t().strikeSummaryNone;

  return `
    ${renderStrikeControls()}
    <div class="strike-summary">${summary}</div>
    <div class="strike-legend">
      ${['tpl', 'air', 'rail'].map((k) => `<span><span class="legend-dot strike-type-${k}">${TYPE[k].icon}</span>${TYPE[k][lang]}</span>`).join('')}
    </div>
    ${dateSections || `<p class="empty">${t().noStrikes}</p>`}
    <p class="strike-footer">
      <a href="${mitUrl}" target="_blank" rel="noopener">${t().viewMit} →</a>
    </p>`;
}

function renderTrustBar() {
  const s = t();
  if (tab === 'scioperi' && strikesData.live) {
    // DeepL is EN-only; Italian UI shows MIT originals — never claim DeepL there.
    const via =
      lang === 'en' && strikesData.translation?.engine === 'deepl' ? ` · ${s.translatedBy}` : '';
    return `${s.source}: <a href="${MIT_PORTAL_URL}" target="_blank" rel="noopener">MIT</a> · ${fmtUpdated(strikesData.updatedAt)} · <em>${s.strikesLive}${via}</em>`;
  }
  if ((tab === 'oggi' || tab === 'agenda') && eventsBundleLive()) {
    const bundle = tab === 'agenda' ? agendaData : todayData;
    const links = (bundle.sources || []).map((src) => {
      const href = src.url || '#';
      return `<a href="${href}" target="_blank" rel="noopener">${src.label}</a>`;
    });
    const updated = fmtUpdated(bundle.updatedAt);
    return `${s.source}: ${links.join(' · ') || '—'} · ${updated} · <em>${s.eventbriteLive}</em>`;
  }
  if (tab === 'mobilita' && mobilityData.live) {
    const url = mobilityData.sourceUrl || 'https://www.atm.it/it/ViaggiaConNoi/InfoTraffico';
    return `${s.source}: <a href="${url}" target="_blank" rel="noopener">ATM</a> · ${fmtUpdated(mobilityData.updatedAt)} · <em>${s.mobilityLive}</em>`;
  }
  const parts = [];
  if (todayData.live || agendaData.live) {
    parts.push(`Events ${fmtUpdated(todayData.updatedAt || agendaData.updatedAt)}`);
  }
  if (mobilityData.live) parts.push(`ATM ${fmtUpdated(mobilityData.updatedAt)}`);
  if (strikesData.live) parts.push(`MIT ${fmtUpdated(strikesData.updatedAt)}`);
  if (tab === 'mobilita' && !mobilityData.live) parts.push(`<em>${s.mobilityUnavailable}</em>`);
  if (!parts.length) return `${s.source}: —`;
  return `${s.source}: ${parts.join(' · ')}`;
}

function renderControls() {
  return `
    <div class="controls">
      ${CATEGORIES.map((c) => `
        <button type="button" class="chip ${category === c ? 'active' : ''}" data-cat="${c}">${t().categories[c]}</button>`).join('')}
      <button type="button" class="chip ${freeOnly ? 'active' : ''}" data-free="toggle">${t().filters.free}</button>
      <a class="lang-toggle" href="${lang === 'en' ? '/it/tracker/' : '/tracker/'}" data-astro-reload>${lang === 'en' ? 'IT' : 'EN'}</a>
    </div>`;
}

const TAB_RENDERERS = {
  oggi: renderOggi,
  agenda: renderAgenda,
  mobilita: () => renderMobilita(),
  scioperi: () => renderScioperi(),
};

function render() {
  const strings = t();
  const filtered = filterEvents(events());
  const panelFn = TAB_RENDERERS[tab];
  const panel = panelFn.length ? panelFn(filtered) : panelFn();
  const app = document.getElementById('milan-pulse');
  if (!app) return;

  const homeHref = lang === 'it' ? HOME_URL_IT : HOME_URL_EN;

  app.innerHTML = `
    <div class="page">
      <header class="brand">
        <div class="brand-kicker">${strings.kicker}</div>
        <h1>${strings.title}</h1>
        <p class="brand-sub">${strings.subtitle}</p>
        <div class="brand-actions">
          <a class="lang-toggle" href="${homeHref}" style="text-decoration:none;display:inline-flex;align-items:center">${strings.backHome}</a>
        </div>
      </header>

      <nav class="tabs mp-tabs-desktop" aria-label="${lang === 'it' ? 'Sezioni' : 'Sections'}">
        ${DOCK_ORDER.map((id) => `
          <button type="button" class="tab ${tab === id ? 'active' : ''}" data-tab="${id}">${strings.tabs[id]}</button>`).join('')}
      </nav>

      ${tab !== 'mobilita' && tab !== 'scioperi' ? renderControls() : ''}

      <p class="trust">${renderTrustBar()}</p>

      <main>${panel}</main>

      <footer>
        Part of <a href="${homeHref}">The Milan Post</a> ·
        ${strings.footerAffiliate} ·
        ${strings.footerListings} ·
        ${strings.footerVerify} <a href="https://www.atm.it" target="_blank" rel="noopener">atm.it</a> ·
        <a href="${lang === 'it' ? '/it/privacy/#tracker-data' : '/privacy/#tracker-data'}">${strings.footerDataSources}</a>
      </footer>
    </div>

    <nav class="mp-dock" aria-label="${lang === 'it' ? 'Navigazione mobile' : 'Mobile navigation'}">
      ${DOCK_ORDER.map((id) => `
        <button type="button" class="mp-dock-item ${tab === id ? 'active' : ''}" data-tab="${id}">
          <span class="mp-dock-icon" aria-hidden="true">${DOCK_ICONS[id]}</span>
          <span class="mp-dock-label">${strings.tabs[id].replace(/^⚠️\s*/, '')}</span>
        </button>`).join('')}
    </nav>`;
}

function onAppClick(e) {
  const root = e.target.closest('#milan-pulse');
  if (!root) return;

  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) {
    tab = tabBtn.dataset.tab;
    if (tab !== 'agenda') agendaDay = null;
    ensureTabData(tab).then(() => render());
    return;
  }
  const dayBtn = e.target.closest('[data-agenda-day]');
  if (dayBtn) {
    agendaDay = dayBtn.dataset.agendaDay;
    render();
    return;
  }
  const catBtn = e.target.closest('[data-cat]');
  if (catBtn) {
    category = catBtn.dataset.cat;
    render();
    return;
  }
  if (e.target.closest('[data-free]')) {
    freeOnly = !freeOnly;
    render();
    return;
  }
  if (e.target.closest('[data-strike-filter]')) {
    strikeFilter = e.target.closest('[data-strike-filter]').dataset.strikeFilter;
    render();
    return;
  }
}

async function fetchJson(name) {
  const res = await fetch(`${DATA_BASE}/${name}`);
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}`);
  return res.json();
}

async function loadShard(key, file, assign) {
  if (loaded[key]) return;
  if (loading[key]) return loading[key];
  loading[key] = fetchJson(file)
    .then((data) => {
      assign(data);
      loaded[key] = true;
    })
    .catch((err) => {
      console.warn(`[milan-pulse] ${file}`, err);
      assign(null);
      loaded[key] = true;
    })
    .finally(() => {
      loading[key] = null;
    });
  return loading[key];
}

async function ensureTabData(nextTab) {
  const tasks = [];
  if (nextTab === 'oggi') {
    tasks.push(
      loadShard('today', 'today.json', (d) => {
        todayData = d || { events: [], live: false, sources: [] };
      }),
    );
    // Mobility pills + leave-by need strikes + ATM lines on event cards.
    tasks.push(
      loadShard('mobility', 'mobility.json', (d) => {
        mobilityData = d || { lines: [], alerts: [], live: false };
      }),
    );
    tasks.push(
      loadShard('strikes', 'strikes-milan.json', (d) => {
        strikesData = d || { strikes: [], live: false };
      }),
    );
  } else if (nextTab === 'agenda') {
    tasks.push(
      loadShard('agenda', 'agenda.json', (d) => {
        agendaData = d || { events: [], live: false, sources: [] };
      }),
    );
    tasks.push(
      loadShard('mobility', 'mobility.json', (d) => {
        mobilityData = d || { lines: [], alerts: [], live: false };
      }),
    );
    tasks.push(
      loadShard('strikes', 'strikes-milan.json', (d) => {
        strikesData = d || { strikes: [], live: false };
      }),
    );
  } else if (nextTab === 'mobilita') {
    tasks.push(
      loadShard('mobility', 'mobility.json', (d) => {
        mobilityData = d || { lines: [], alerts: [], live: false };
      }),
    );
  } else if (nextTab === 'scioperi') {
    tasks.push(
      loadShard('strikes', 'strikes-milan.json', (d) => {
        strikesData = d || { strikes: [], live: false };
      }),
    );
  }
  await Promise.all(tasks);
}

async function loadData() {
  const app = document.getElementById('milan-pulse');
  if (!app) return;

  const bootEl = document.getElementById('milan-pulse-boot');
  if (bootEl) bootEl.textContent = t().loading;

  try {
    await ensureTabData(tab || 'oggi');
  } catch {
    if (bootEl) {
      bootEl.textContent = t().noUpcoming;
      bootEl.insertAdjacentHTML(
        'beforeend',
        `<span class="empty-hint">${t().refreshHint}</span>`,
      );
    }
    return;
  }

  render();
  // Rotate / refresh the single live banner every few seconds.
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (document.getElementById('milan-pulse')) refreshLiveBlocks();
  }, BANNER_ROTATE_MS);
}

/** Astro View Transitions: module scripts do not re-run on soft nav — re-boot on page-load. */
function bootMilanPulse() {
  if (!document.getElementById('milan-pulse')) return;
  lang = pageLangFromUrl();
  loaded.today = false;
  loaded.agenda = false;
  loaded.strikes = false;
  loaded.mobility = false;
  loadData();
}

if (!window.__mmpPulseBound) {
  document.addEventListener('click', onAppClick);
  document.addEventListener('astro:page-load', bootMilanPulse);
  window.__mmpPulseBound = true;
}

bootMilanPulse();
