/** Comune di Milano weekly open-air markets (DS291). */

import { fetchComuneGeoJson } from './comune-geojson';

export const WEEKLY_MARKETS_PACKAGE_ID = 'ds291-economia-mercati-settimanali-scoperti';

export const WEEKLY_MARKETS_DATASET_PAGE =
  'https://dati.comune.milano.it/dataset/ds291-economia-mercati-settimanali-scoperti';

export const FARE_IMPRESA_MARKETS_PAGE =
  'https://fareimpresa.comune.milano.it/mercati-settimanali-scoperti';

export const FARE_IMPRESA_MARKETS_PDF =
  'https://fareimpresa.comune.milano.it/documents/87339536/190972166/MSS+-+ubicazioni,orari,organici+04+agosto+2025.pdf/bc139e9a-790d-f478-48ea-d9a482721a9f?t=1754293478784';

export const COVERED_MARKETS_DATASET_PAGE =
  'https://dati.comune.milano.it/dataset/ds2471-mercati-comunali-coperti';

export const MARKET_DAY_KEYS = [
  'LUNEDI',
  'MARTEDI',
  'MERCOLEDI',
  'GIOVEDI',
  'VENERDI',
  'SABATO',
  'DOMENICA',
] as const;

export type MarketDayKey = (typeof MARKET_DAY_KEYS)[number];

export interface MarketDayOption {
  key: MarketDayKey;
  label: string;
  /** JS Date.getDay() value (0 = Sunday). */
  jsDay: number;
}

export const MARKET_DAYS: MarketDayOption[] = [
  { key: 'LUNEDI', label: 'Mon', jsDay: 1 },
  { key: 'MARTEDI', label: 'Tue', jsDay: 2 },
  { key: 'MERCOLEDI', label: 'Wed', jsDay: 3 },
  { key: 'GIOVEDI', label: 'Thu', jsDay: 4 },
  { key: 'VENERDI', label: 'Fri', jsDay: 5 },
  { key: 'SABATO', label: 'Sat', jsDay: 6 },
  { key: 'DOMENICA', label: 'Sun', jsDay: 0 },
];

export function fetchWeeklyMarketsGeoJson() {
  return fetchComuneGeoJson(WEEKLY_MARKETS_PACKAGE_ID);
}

export function marketDisplayName(properties: Record<string, unknown>): string {
  const name = properties.MERCATO ?? properties['nome MSS'];
  if (typeof name === 'string' && name.trim()) {
    return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return 'Market';
}

export function marketMunicipio(properties: Record<string, unknown>): string | null {
  const zd = properties.ZD;
  if (zd == null || zd === '') return null;
  return String(zd);
}

export function marketOpenOnDay(properties: Record<string, unknown>, dayKey: MarketDayKey): boolean {
  const flag = properties[dayKey];
  return flag === 'x' || flag === 'X';
}
