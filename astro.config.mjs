// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://www.themilanpost.it',
  output: 'static',

  /**
   * Multilingual routing (Google: separate URLs per language + hreflang).
   * Default English stays unprefixed; Italian under /it/.
   * @see https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
   * @see https://docs.astro.build/en/guides/internationalization/
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/contact/success') &&
        // Soft-redirect shells (Astro HTML refresh on GitHub Pages) — do not advertise in sitemap
        page.replace(/\/$/, '') !== 'https://www.themilanpost.it/blog' &&
        !page.includes('/blog/milan-paperwork-first-month'),
    }),
    robotsTxt(),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Josefin Sans',
      cssVariable: '--font-display',
      weights: ['400', '500', '600', '700'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Josefin Sans',
      cssVariable: '--font-body',
      weights: ['400', '500', '600', '700'],
      styles: ['normal'],
    },
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
