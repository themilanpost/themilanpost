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
      title: "Carta d'Identità Elettronica (CIE)",
      href: '/blog/cie-digital-id-for-expats-in-italy',
      hub: 'Paperwork',
    },
    {
      title: 'TARI waste tax for tenants',
      href: '/blog/tari-waste-tax-milan-newcomers',
      hub: 'Paperwork',
    },
  ],
  'permesso-di-soggiorno-milan-newcomers': [
    {
      title: 'First steps when moving to Milan',
      href: '/blog/moving-to-milan-complete-guide-students-job-seekers-professionals',
    },
    {
      title: "Carta d'Identità Elettronica (CIE)",
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
      title: "Carta d'Identità Elettronica (CIE)",
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

/** Italian titles + /it/ paths (no English living pages from Italian guides). */
export const guideRelatedLinksIt: Record<string, GuideLink[]> = {
  'moving-to-milan-complete-guide-students-job-seekers-professionals': [
    {
      title: 'Permesso di soggiorno a Milano',
      href: '/it/blog/permesso-di-soggiorno-milan-newcomers/',
      hub: 'Pratiche',
    },
    {
      title: 'CIE a Milano',
      href: '/it/blog/cie-digital-id-for-expats-in-italy/',
      hub: 'Pratiche',
    },
    {
      title: 'TARI a Milano',
      href: '/it/blog/tari-waste-tax-milan-newcomers/',
      hub: 'Pratiche',
    },
  ],
  'permesso-di-soggiorno-milan-newcomers': [
    {
      title: 'Primi passi a Milano',
      href: '/it/blog/moving-to-milan-complete-guide-students-job-seekers-professionals/',
    },
    {
      title: 'CIE a Milano',
      href: '/it/blog/cie-digital-id-for-expats-in-italy/',
      hub: 'Pratiche',
    },
    {
      title: 'TARI a Milano',
      href: '/it/blog/tari-waste-tax-milan-newcomers/',
      hub: 'Pratiche',
    },
  ],
  'cie-digital-id-for-expats-in-italy': [
    {
      title: 'Primi passi a Milano',
      href: '/it/blog/moving-to-milan-complete-guide-students-job-seekers-professionals/',
    },
    {
      title: 'Permesso di soggiorno a Milano',
      href: '/it/blog/permesso-di-soggiorno-milan-newcomers/',
      hub: 'Pratiche',
    },
    {
      title: 'TARI a Milano',
      href: '/it/blog/tari-waste-tax-milan-newcomers/',
      hub: 'Pratiche',
    },
  ],
  'tari-waste-tax-milan-newcomers': [
    {
      title: 'Primi passi a Milano',
      href: '/it/blog/moving-to-milan-complete-guide-students-job-seekers-professionals/',
    },
    {
      title: 'CIE a Milano',
      href: '/it/blog/cie-digital-id-for-expats-in-italy/',
      hub: 'Pratiche',
    },
    {
      title: 'Permesso di soggiorno a Milano',
      href: '/it/blog/permesso-di-soggiorno-milan-newcomers/',
      hub: 'Pratiche',
    },
  ],
};

export function relatedGuidesFor(slug: string, lang: 'en' | 'it' = 'en'): GuideLink[] {
  if (lang === 'it') return guideRelatedLinksIt[slug] ?? [];
  return guideRelatedLinks[slug] ?? [];
}
