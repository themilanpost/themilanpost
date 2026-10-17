/**
 * UI chrome strings. Page body content is translated per-route (start with /it/).
 * Keep keys stable; expand as Italian pages ship.
 */
export const languages = {
  en: 'English',
  it: 'Italiano',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.newInMilan': 'New in Milan',
    'nav.tracker': 'Milan Tracker',
    'nav.guides': 'Guides',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Toggle menu',
    'lang.switchTo': 'Italiano',
    'lang.label': 'Language',
    'lang.availableNote': 'Italian homepage',
  },
  it: {
    'nav.newInMilan': 'New in Milan',
    'nav.tracker': 'Milan Tracker',
    'nav.guides': 'Guide',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatti',
    'nav.menu': 'Apri o chiudi il menu',
    'lang.switchTo': 'English',
    'lang.label': 'Lingua',
    'lang.availableNote': 'Versione italiana',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
