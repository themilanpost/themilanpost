/**
 * Top-level guide hubs shown on /guides, paperwork, living, etc.
 */

export interface GuideHubSection {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
}

export const guidesHub = {
  slug: 'guides',
  title: 'Guides',
  intro:
    'Admin and paperwork on one track, everyday city life on another. Each hub links to full guides and maps.',
  sections: [
    {
      id: 'paperwork',
      label: 'Paperwork',
      title: 'Paperwork in Milan',
      description:
        'Codice Fiscale, permesso di soggiorno, residenza, CIE, tessera sanitaria, TARI, and other first-month admin, step-by-step, Milan-first.',
      href: '/paperwork',
    },
    {
      id: 'living',
      label: 'Living in Milan',
      title: 'Everyday essentials',
      description:
        'Maps, markets, fountains, transport zones, and local habits, practical city-life notes with official open-data tools.',
      href: '/living-in-milan',
    },
  ] satisfies GuideHubSection[],
};

/** Paths that should highlight the Guides nav item. */
export function isGuidesNavActive(pathname: string): boolean {
  const p = pathname.replace(/^\/it(?=\/|$)/, '') || '/';
  return (
    p === '/guides' ||
    p === '/guides/' ||
    p.startsWith('/paperwork') ||
    p.startsWith('/living-in-milan') ||
    p.startsWith('/blog')
  );
}

export const guidesNavItems = guidesHub.sections.map(({ label, href }) => ({ label, href }));

/** Italian labels for guide hub cards (full Italian surface under /it/). */
export const guidesHubIt = {
  title: 'Guide',
  intro:
    'Da una parte documenti e pratiche, dall’altra la vita in città. Ogni hub apre le guide complete in italiano, per chi vive o si trasferisce a Milano.',
  sections: [
    {
      id: 'paperwork',
      label: 'Pratiche',
      title: 'Documenti e pratiche a Milano',
      description:
        'Codice fiscale, permesso di soggiorno dove serve, residenza, CIE, tessera sanitaria, TARI e altre pratiche comuni, passo passo.',
      href: '/it/paperwork/',
    },
    {
      id: 'living',
      label: 'Vivere a Milano',
      title: 'La vita di tutti i giorni',
      description:
        'Mappe, mercati, fontanelle, trasporti e abitudini locali. Le schede di dettaglio in italiano arrivano a breve; qui trovi l’hub e le guide pratiche già pronte.',
      href: '/it/living-in-milan/',
    },
  ],
} as const;

export const guidesNavItemsIt = guidesHubIt.sections.map(({ label, href }) => ({ label, href }));

export function guidesNavFor(lang: 'en' | 'it') {
  return lang === 'it' ? guidesNavItemsIt : guidesNavItems;
}
