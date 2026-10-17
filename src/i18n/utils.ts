import { blogPath, localePath } from './paths';
import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';

/**
 * Bare paths (no locale prefix) that have a published Italian page.
 * Blog articles are handled separately via slug pairing.
 */
export const italianContentPaths = new Set<string>([
  '/',
  '/guides',
  '/paperwork',
  '/living-in-milan',
  '/tracker',
  '/about',
  '/contact',
  '/privacy',
  '/blog/tari-waste-tax-milan-newcomers',
  '/blog/permesso-di-soggiorno-milan-newcomers',
  '/blog/cie-digital-id-for-expats-in-italy',
  '/blog/moving-to-milan-complete-guide-students-job-seekers-professionals',
]);

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale && maybeLocale in languages) {
    return maybeLocale as Lang;
  }
  return defaultLang;
}

/** Strip `/it` locale prefix for cross-locale path mapping. */
export function stripLocalePrefix(pathname: string): string {
  const trimmed =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (trimmed === '/it') return '/';
  if (trimmed.startsWith('/it/')) {
    const rest = trimmed.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return trimmed || '/';
}

function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Map current path to the other locale.
 * Missing Italian pages fall back to `/it/` (visible link — Google forbids auto locale redirects).
 */
export function getAlternateLocalePath(pathname: string, target: Lang): string {
  const bare = stripLocalePrefix(pathname);

  if (target === 'en') {
    return withTrailingSlash(bare);
  }

  if (italianContentPaths.has(bare)) {
    return bare === '/' ? '/it/' : withTrailingSlash(`/it${bare}`);
  }

  // Blog slug pairing: /blog/foo ↔ /it/blog/foo when listed above; else home
  if (bare.startsWith('/blog/')) {
    const slug = bare.slice('/blog/'.length);
    if (italianContentPaths.has(`/blog/${slug}`)) {
      return blogPath(slug, 'it');
    }
  }

  return '/it/';
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export { localePath, blogPath };
