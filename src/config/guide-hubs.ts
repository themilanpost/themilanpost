/**
 * Topic hubs: one entry per guide card on category landing pages.
 * Link `articleSlug` to a blog post id when the guide is published.
 */

export type GuideTopicStatus = 'published' | 'coming-soon';

export interface GuideTopic {
  id: string;
  title: string;
  /** Italian term or official name shown as eyebrow label */
  label: string;
  description: string;
  status: GuideTopicStatus;
  /** Blog collection entry id (filename without .md) */
  articleSlug?: string;
}

export interface GuideHub {
  slug: string;
  title: string;
  intro: string;
  topics: GuideTopic[];
}

export const paperworkHub: GuideHub = {
  slug: 'paperwork',
  title: 'Paperwork in Milan',
  intro:
    'Essential admin steps for newcomers: from tax codes and ID documents to residency and local registrations. Each card links to a full guide when it is ready. Unfamiliar admin terms? See the paperwork glossary.',
  topics: [
    {
      id: 'codice-fiscale',
      label: 'Codice Fiscale',
      title: 'Getting your tax code',
      description:
        'AA4/8 at Agenzia delle Entrate, Questura assignment during permesso, and how to break common admin chicken-and-egg loops.',
      status: 'coming-soon',
    },
    {
      id: 'carta-identita',
      label: "Carta d'Identità",
      title: 'Italian ID card (CIE)',
      description: 'How to request the CIE in Milan, what to bring, delivery times, and online use.',
      status: 'published',
      articleSlug: 'cie-digital-id-for-expats-in-italy',
    },
    {
      id: 'residenza',
      label: 'Residenza',
      title: 'Registering your address',
      description:
        'First-time residenza online (ANPR), EU vs extra-UE document lists, and when booking differs from a change of address.',
      status: 'coming-soon',
    },
    {
      id: 'permesso-soggiorno',
      label: 'Permesso di Soggiorno',
      title: 'Residence permit basics',
      description: '8-day deadline, Poste kit (MOD. 209), codice 31/16/17, document checklists, status tracking, and renewal timing.',
      status: 'published',
      articleSlug: 'permesso-di-soggiorno-milan-newcomers',
    },
    {
      id: 'tessera-sanitaria',
      label: 'Tessera Sanitaria',
      title: 'Health card & SSN enrollment',
      description:
        'Regional SSN enrollment (scelta e revoca), medico di base, fascicolo sanitario, ricette, and CUP booking in Lombardy.',
      status: 'coming-soon',
    },
    {
      id: 'tari',
      label: 'TARI',
      title: 'Waste tax (TARI)',
      description: 'Declare occupancy within 90 days, who pays when you rent, 2026 deadlines, and how to close TARI when you move out.',
      status: 'published',
      articleSlug: 'tari-waste-tax-milan-newcomers',
    },
    {
      id: 'spid-digital-identity',
      label: 'SPID',
      title: 'SPID & digital identity',
      description:
        'When you need SPID, how CIE and Fascicolo del Cittadino fit in, and common blocks (stale CF certificate, booking portals).',
      status: 'coming-soon',
    },
    {
      id: 'permesso-conversions',
      label: 'Conversione permesso',
      title: 'Permit conversions & work changes',
      description:
        'Study to work, ricerca lavoro to subordinato, attesa occupazione, and nulla osta paths, with official sources only.',
      status: 'coming-soon',
    },
    {
      id: 'permesso-ue-lungo-periodo',
      label: 'Permesso UE lungo periodo',
      title: 'EU long-term residence',
      description:
        'Five-year rule, absence limits, A2 Italian (CPIA), and what counts toward eligibility, verified against Polizia di Stato.',
      status: 'coming-soon',
    },
    {
      id: 'banking-documents',
      label: 'Conto corrente',
      title: 'Banking with permesso or ricevuta',
      description:
        'Which documents banks typically ask for, reported options when you only have a ricevuta, and how CIE unlocks online accounts, branch rules vary.',
      status: 'coming-soon',
    },
    {
      id: 'accordo-integrazione',
      label: 'Accordo di integrazione',
      title: 'Integration agreement',
      description:
        'Signed at first permesso for applicants 16+, points system, language civics modules, and renewal implications, from official Portale Immigrazione rules.',
      status: 'coming-soon',
    },
    {
      id: 'fascicolo-cittadino',
      label: 'Fascicolo del Cittadino',
      title: 'Comune digital citizen file',
      description:
        'Access via SPID or CIE, pay TARI and municipal fees, request certificates, and track Comune correspondence without queuing at the desk.',
      status: 'coming-soon',
    },
    {
      id: 'dichiarazione-presenza',
      label: 'Dichiarazione di presenza',
      title: 'Short-stay presence declaration',
      description:
        'For non-EU stays up to 90 days, when it replaces a permesso, hotel vs private lodging rules, and Questura deadlines after entry.',
      status: 'coming-soon',
    },
    {
      id: 'registrazione-contratto',
      label: 'Registrazione contratto',
      title: 'Rental contract registration',
      description:
        'Registering your lease with Agenzia delle Entrate (Modello RLI), stamp duty, who pays, and why permesso and residenza checks need a registered contract.',
      status: 'coming-soon',
    },
    {
      id: 'certificati-anagrafici',
      label: 'Certificati anagrafici',
      title: 'Anagrafe certificates',
      description:
        'Certificato di residenza, stato di famiglia, and other Comune certificates, when renewals and employers ask for them and how to order online.',
      status: 'coming-soon',
    },
    {
      id: 'taxes-italy',
      label: 'Fisco',
      title: 'Taxes in Italy for newcomers',
      description:
        'Tax residency (183-day rule), IRPEF basics, Modello 730 vs Redditi PF, Quadro RW foreign assets, IVIE/IVAFE, scoped to Agenzia delle Entrate rules.',
      status: 'coming-soon',
    },
    {
      id: 'isee',
      label: 'ISEE',
      title: 'ISEE income certificate',
      description:
        'When newcomers need ISEE (rent subsidies, tuition, social benefits), DSU compilation, and how residenza and foreign assets affect the score.',
      status: 'coming-soon',
    },
    {
      id: 'partita-iva',
      label: 'Partita IVA',
      title: 'Freelancing & Partita IVA',
      description:
        'Opening a VAT number, flat-rate regime (forfettario) eligibility, invoicing, and F24 payments for remote workers and self-employed in Milan.',
      status: 'coming-soon',
    },
    {
      id: 'permesso-duplicate',
      label: 'Duplicato permesso',
      title: 'Lost or stolen permesso',
      description:
        'Denuncia at Questura, Poste duplicato kit, replacing a lost ricevuta, and travel limits while waiting, a top recurring forum question.',
      status: 'coming-soon',
    },
    {
      id: 'dichiarazione-ospitalita',
      label: 'Ospitalità',
      title: 'Hosting declaration (ospitalità)',
      description:
        'When you stay with a host instead of a lease, Comune form, host ID, police verification, and how it differs from a registered rental contract.',
      status: 'coming-soon',
    },
    {
      id: 'permesso-family',
      label: 'Motivi familiari',
      title: 'Family stay permits',
      description:
        'Convivenza di fatto, EU family card, ricongiungimento paths, and Comune vs Questura order, high-confusion topic on expat forums.',
      status: 'coming-soon',
    },
    {
      id: 'prenotafacile',
      label: 'PrenotaFacile',
      title: 'Questura appointments (PrenotaFacile)',
      description:
        'When Poste kit is not enough: conversions, medical permits, subsidiary protection, and booking at Questura di Milano online.',
      status: 'coming-soon',
    },
    {
      id: 'moving-first-steps',
      label: 'Primi passi',
      title: 'Moving to Milan: admin order',
      description:
        'End-to-end sequence for students, workers, and EU arrivals, visa checks, 8-day permesso, CF, healthcare, housing, and residenza timing.',
      status: 'published',
      articleSlug: 'moving-to-milan-complete-guide-students-job-seekers-professionals',
    },
  ],
};

export function topicHref(topic: GuideTopic): string | undefined {
  if (topic.status === 'published' && topic.articleSlug) {
    return `/blog/${topic.articleSlug}`;
  }
  return undefined;
}
