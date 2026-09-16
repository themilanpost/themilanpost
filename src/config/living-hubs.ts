/**
 * Living in Milan topic cards: links to practical city-life pages.
 */

export interface LivingTopic {
  id: string;
  /** Italian term or local name shown as eyebrow */
  label: string;
  title: string;
  description: string;
  href: string;
}

export interface ComingSoonTopic {
  id: string;
  label: string;
  title: string;
  description: string;
}

export const livingHub = {
  slug: 'living-in-milan',
  title: 'Living in Milan',
  intro:
    'Practical city-life guides live now: Milan maps, weekly street markets, public drinking fountains, and sourced celebrity places — plus a living glossary for local terms. Housing and transport notes are coming soon.',
  topics: [
    {
      id: 'maps',
      label: 'Mappe',
      title: 'Milan maps',
      description:
        'Embedded open-data maps, Google Maps collections, and official links, fountains, metro, markets, pharmacies, recycling.',
      href: '/living-in-milan/maps',
    },
    {
      id: 'draghi-verdi',
      label: 'Draghi Verdi',
      title: 'Public drinking fountains guide',
      description:
        'What vedovelle are, how they work, Case dell\'acqua, and Google Maps tips, with a link to the interactive map.',
      href: '/living-in-milan/draghi-verdi',
    },
    {
      id: 'markets',
      label: 'Mercati rionali',
      title: 'Weekly street markets',
      description:
        'Filter open-air markets by day and municipio, DS291 map plus hours, tips, and links to covered markets.',
      href: '/living-in-milan/markets',
    },
    {
      id: 'stars-in-milan',
      label: 'Celebrità',
      title: 'Stars in Milan',
      description:
        'Sourced celebrity stories and places: Dua Lipa’s Verso, Callas at La Scala, Versace dinners, Beatles lore — with a map.',
      href: '/living-in-milan/stars-in-milan',
    },
  ] satisfies LivingTopic[],
  comingSoon: [
    {
      id: 'transport',
      label: 'ATM',
      title: 'Transport & ATM passes',
      description:
        'Metro/bus/tram tickets, monthly pass activation on the app, Area C, and what to carry during ticket checks, official ATM FAQ first.',
    },
    {
      id: 'healthcare',
      label: 'SSN',
      title: 'Using the healthcare system',
      description:
        'After tessera enrollment: ricette (U/B/D/P), CUP specialist booking, esenzioni, pronto soccorso, and when private clinics help.',
    },
    {
      id: 'housing',
      label: 'Affitto',
      title: 'Finding housing in Milan',
      description:
        'Idealista filters, contract types, registration with Agenzia delle Entrate, and aligning your lease address with permesso and residenza.',
    },
    {
      id: 'italian-language',
      label: 'Lingua italiana',
      title: 'Italian for newcomers',
      description:
        'Comune language courses, CPIA integration classes, CILS prep, and A2 requirements tied to permesso and long-term residence.',
    },
    {
      id: 'driving-licence',
      label: 'Patente',
      title: 'Driving licence conversion',
      description:
        'Converting a foreign licence vs getting an Italian patente, medical certificate, theory quiz, practice hours, and exam logistics.',
    },
    {
      id: 'daily-services',
      label: 'Servizi',
      title: 'Daily life services',
      description:
        'Library signup (SPID/CIE), pharmacies, grocery patterns, eco-islands, and other recurring city-life touchpoints with official links.',
    },
    {
      id: 'utilities',
      label: 'Utenze',
      title: 'Utilities & resident tariffs',
      description:
        'Electricity, gas, and water contracts: resident vs non-resident rates, switching after Anagrafe, and common flat-share billing disputes (recurring r/Italy topic).',
    },
  ] satisfies ComingSoonTopic[],
};
