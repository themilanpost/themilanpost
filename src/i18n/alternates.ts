import { brand } from '../config/brand';

/** Reciprocal hreflang set for the homepage pair (en + it + x-default). */
export const homeAlternates = [
  { hreflang: 'en', href: `${brand.url}/` },
  { hreflang: 'it', href: `${brand.url}/it/` },
  { hreflang: 'x-default', href: `${brand.url}/` },
] as const;
