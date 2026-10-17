import type { Lang } from './ui';

/** Prefix a site path for the active locale. English stays unprefixed. */
export function localePath(path: string, lang: Lang): string {
  const bare = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  if (bare === '/') return '/it/';
  const trimmed = bare.endsWith('/') ? bare.slice(0, -1) : bare;
  return `/it${trimmed}/`;
}

/** Blog article URL in the given locale (same slug both sides). */
export function blogPath(slug: string, lang: Lang): string {
  return localePath(`/blog/${slug}`, lang);
}
