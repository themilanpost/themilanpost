/**
 * Cross-links between published paperwork / moving guides.
 * Shown at the bottom of blog posts via GuideRelatedLinks.astro.
 */

export interface GuideLink {
  title: string;
  href: string;
  /** Optional hub label, e.g. "Paperwork hub" */
  hub?: string;
}

export const guideRelatedLinks: Record<string, GuideLink[]> = {
  'moving-to-milan-complete-guide-students-job-seekers-professionals': [
    {
      title: 'Permesso di soggiorno in Milan',
      href: '/blog/permesso-di-soggiorno-milan-newcomers',
      hub: 'Paperwork',
    },
    {
      title: 'Carta d\'Identità Elettronica (CIE)',
      href: '/blog/cie-digital-id-for-expats-in-italy',
      hub: 'Paperwork',
    },
    {
      title: 'TARI waste tax for tenants',
      href: '/blog/tari-waste-tax-milan-newcomers',
      hub: 'Paperwork',
    },
    {
      title: 'Weekly street markets',
      href: '/living-in-milan/markets',
      hub: 'Living in Milan',
    },
  ],
  'permesso-di-soggiorno-milan-newcomers': [
    {
      title: 'First steps when moving to Milan',
      href: '/blog/moving-to-milan-complete-guide-students-job-seekers-professionals',
    },
    {
      title: 'Carta d\'Identità Elettronica (CIE)',
      href: '/blog/cie-digital-id-for-expats-in-italy',
      hub: 'Paperwork',
    },
    {
      title: 'TARI waste tax for tenants',
      href: '/blog/tari-waste-tax-milan-newcomers',
      hub: 'Paperwork',
    },
  ],
  'cie-digital-id-for-expats-in-italy': [
    {
      title: 'First steps when moving to Milan',
      href: '/blog/moving-to-milan-complete-guide-students-job-seekers-professionals',
    },
    {
      title: 'Permesso di soggiorno in Milan',
      href: '/blog/permesso-di-soggiorno-milan-newcomers',
      hub: 'Paperwork',
    },
    {
      title: 'TARI waste tax for tenants',
      href: '/blog/tari-waste-tax-milan-newcomers',
      hub: 'Paperwork',
    },
  ],
  'tari-waste-tax-milan-newcomers': [
    {
      title: 'First steps when moving to Milan',
      href: '/blog/moving-to-milan-complete-guide-students-job-seekers-professionals',
    },
    {
      title: 'Carta d\'Identità Elettronica (CIE)',
      href: '/blog/cie-digital-id-for-expats-in-italy',
      hub: 'Paperwork',
    },
    {
      title: 'Permesso di soggiorno in Milan',
      href: '/blog/permesso-di-soggiorno-milan-newcomers',
      hub: 'Paperwork',
    },
  ],
};

export function relatedGuidesFor(slug: string): GuideLink[] {
  return guideRelatedLinks[slug] ?? [];
}
