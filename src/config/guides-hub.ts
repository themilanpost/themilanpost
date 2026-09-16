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
  return (
    pathname === '/guides' ||
    pathname.startsWith('/paperwork') ||
    pathname.startsWith('/living-in-milan') ||
    pathname.startsWith('/blog')
  );
}

export const guidesNavItems = guidesHub.sections.map(({ label, href }) => ({ label, href }));
