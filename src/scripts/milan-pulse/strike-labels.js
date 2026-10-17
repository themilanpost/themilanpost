const TYPE = {
  tpl: { icon: '🚌', en: 'Transit', it: 'TPL' },
  air: { icon: '✈️', en: 'Air', it: 'Aereo' },
  rail: { icon: '🚆', en: 'Rail', it: 'Treno' },
  freight: { icon: '📦', en: 'Freight', it: 'Merci' },
  other: { icon: '⚠️', en: 'Other', it: 'Altro' },
};

export function strikeType(sector) {
  const s = (sector || '').toLowerCase();
  if (s.includes('pubblico')) return 'tpl';
  if (s.includes('aereo')) return 'air';
  if (s.includes('ferroviario')) return 'rail';
  if (s.includes('merci')) return 'freight';
  return 'other';
}

function cleanItalianCategory(category) {
  return (category || '')
    .replace(/^PERSONALE\s+(SOC\.|SOCC\.)\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function fmtStrikeDate(iso, lang) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function fmtStrikeDay(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    timeZone: 'Europe/Rome',
    day: 'numeric',
    month: 'short',
  });
}

export function labelStrike(strike, lang) {
  const type = strikeType(strike.sector);
  const useEn = lang === 'en' && strike.en;

  return {
    type,
    icon: TYPE[type].icon,
    typeLabel: TYPE[type][lang],
    sector: useEn ? strike.en.sector : strike.sector,
    relevance: useEn ? strike.en.relevance : strike.relevance,
    mode: useEn ? strike.en.mode : strike.mode,
    who: useEn ? strike.en.category : cleanItalianCategory(strike.category),
    region: useEn ? strike.en.region : strike.region,
    machineTranslated: Boolean(useEn),
  };
}

export { TYPE };
