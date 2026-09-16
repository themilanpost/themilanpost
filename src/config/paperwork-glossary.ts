import type { GlossaryCategory } from './glossary-types';
import { allGlossaryEntries } from './glossary-types';

export const paperworkGlossaryPath = '/paperwork/glossary';

export const paperworkGlossaryCategories: GlossaryCategory[] = [
  {
    id: 'identity-registration',
    title: 'Identity & registration',
    entries: [
      {
        term: 'Anagrafe',
        english: 'Registry office',
        description:
          'Municipal office that manages population records: residenza, certificates, and (in Milan) CIE appointments.',
      },
      {
        term: "Carta d'Identità Elettronica (CIE)",
        english: 'Electronic identity card',
        description:
          'Italy\'s chip-based ID card. For foreign residents it is useful inside Italy and online, but not for travel abroad (espatrio). Use your passport. In Milan, book via comune.milano.it, not the national Agenda CIE portal.',
      },
      {
        term: 'Certificato di residenza',
        english: 'Certificate of residence',
        description:
          'Official proof that you are registered at an address in a comune. Often required for renewals and some permit applications.',
      },
      {
        term: 'Codice Fiscale',
        english: 'Tax code',
        description:
          '16-character identifier used for tax, contracts, university enrolment, and most admin. Printed on the tessera sanitaria. First issuance for foreign nationals usually requires an Agenzia delle Entrate appointment (form AA4/8).',
      },
      {
        term: 'Comune',
        english: 'Municipality / city hall',
        description:
          'Local government for your city (e.g. Comune di Milano). Handles Anagrafe, many taxes, and municipal services.',
      },
      {
        term: 'Dati catastali',
        english: 'Cadastral property data',
        description:
          'Official land-registry identifiers for a property (foglio, particella, subalterno). Required on Milan TARI occupancy declarations and some housing forms.',
      },
      {
        term: 'Domicilio',
        english: 'Declared domicile',
        description:
          'A declared address where you live but may differ from registered residenza. CIE can sometimes be requested at domicilio in limited cases, confirm with your comune.',
      },
      {
        term: 'Espatrio',
        english: 'Travel abroad (validity)',
        description:
          'Whether an ID document is accepted for leaving Italy. Foreign residents\' CIE is not valid for espatrio. Use your passport. Italian citizens may use a CIE marked valid for EU/EEA travel.',
      },
      {
        term: 'Fascicolo del Cittadino',
        english: 'Citizen portal',
        description:
          'Milan\'s online portal for municipal services (TARI, certificates, etc.). Login requires SPID or CIE. Track TARI bills and declared properties under Pagamenti and Le mie informazioni.',
      },
      {
        term: 'Iscrizione anagrafica',
        english: 'Registry registration',
        description:
          'The act of registering your address in the municipal population register, same underlying process as declaring residenza.',
      },
      {
        term: 'Residenza',
        english: 'Registered residence',
        description:
          'Your official address on file with the comune. Distinct from simply living somewhere or holding a permesso di soggiorno.',
      },
      {
        term: 'Tessera Sanitaria',
        english: 'Health card',
        description:
          'Card showing your Codice Fiscale and SSN enrollment. Used for healthcare and often as ID for admin appointments.',
      },
    ],
  },
  {
    id: 'immigration-stay',
    title: 'Immigration & stay titles',
    entries: [
      {
        term: 'Carta di soggiorno',
        english: 'Long-term residence card',
        description:
          'Stay title for long-term residents (e.g. EU long-term permit). Different from the standard permesso di soggiorno.',
      },
      {
        term: 'Dichiarazione di presenza',
        english: 'Declaration of presence',
        description:
          'Form for some non-EU short stays (typically under 90 days). Not a permesso di soggiorno: do not use for long-term study or work.',
      },
      {
        term: 'Extra-UE / Extracomunitario',
        english: 'Non-EU (foreign national)',
        description:
          'Citizen of a country outside the European Union. Different rules apply than for UE/EEA/Swiss citizens.',
      },
      {
        term: 'Kit a banda gialla (MOD. 209)',
        english: 'Yellow-striped permit kit',
        description:
          'Physical Poste package (Modulo 1, Modulo 2, instructions, bollettino, envelope) for applying for or renewing a permesso. Pick up at a post office: not a generic PDF.',
      },
      {
        term: 'Modulo 1 / Modulo 2',
        english: 'Permit application forms 1 and 2',
        description:
          'Modulo 1 is always required. Modulo 2 is for income/work details: complete it if you have earnings or certain work permits.',
      },
      {
        term: 'Motivo di soggiorno / codice motivo',
        english: 'Reason for stay / motive code',
        description:
          'Category on Modulo 1 (field d.) matching your visa, e.g. codice 31 for students, 16 for standard employment, 17 for special work categories.',
      },
      {
        term: 'Nulla osta',
        english: 'Work or family authorization',
        description:
          'Pre-entry clearance from Italian authorities, usually via the Sportello Unico Immigrazione, before a work or family visa.',
      },
      {
        term: 'Permesso di soggiorno',
        english: 'Residence permit',
        description:
          'Legal stay title for non-EU foreigners in Italy beyond short tourist visits. Request within 8 working days of entry. Electronic card issued by the Questura after Poste submission and fingerprinting. Track status on Portale Immigrazione.',
      },
      {
        term: 'Portale Immigrazione',
        english: 'Immigration application portal',
        description:
          'Official site (portaleimmigrazione.it) for permesso kit instructions, motive codes, and tracking your application using credentials on the ricevuta.',
      },
      {
        term: 'Prefettura',
        english: 'Provincial government office',
        description:
          'Hosts the Sportello Unico Immigrazione for nulla osta and some first work/family permit steps before Poste submission.',
      },
      {
        term: 'Questura',
        english: 'Provincial police HQ: immigration office',
        description:
          'Where fingerprints and photos are taken after Poste accepts your permesso kit. Also handles motives not processed via Poste.',
      },
      {
        term: 'Ricevuta',
        english: 'Application receipt',
        description:
          'Proof you submitted a permesso or CIE application. For permesso, attach to passport (first issue) or expired permesso (renewal) while waiting.',
      },
      {
        term: 'Sportello Unico Immigrazione (SUI)',
        english: 'Immigration one-stop desk',
        description:
          'Prefettura desk for nulla osta and first-issue work/family kits. Do not use a random Poste kit if your route starts here.',
      },
      {
        term: 'TUI (Testo Unico Immigrazione)',
        english: 'Consolidated immigration law',
        description:
          'Italian immigration code referenced on visas and permit forms (e.g. art. 39 bis for students, art. 27 for special work categories).',
      },
      {
        term: 'UE / Unione Europea',
        english: 'European Union',
        description:
          'EU/EEA/Swiss citizens generally do not need a Questura permesso for long stays, they register residenza at the Comune instead.',
      },
      {
        term: 'Universitaly',
        english: 'National university pre-enrollment portal',
        description:
          'Official platform for pre-enrolling at Italian universities when required. Part of the study-visa sequence before consular visa application.',
      },
    ],
  },
  {
    id: 'poste-payments',
    title: 'Poste, payments & documents',
    entries: [
      {
        term: 'Autocertificazione',
        english: 'Self-declaration',
        description:
          'Signed statement you prepare yourself (e.g. enrollment status, economic resources) where official certificates are not required.',
      },
      {
        term: 'Bollettino postale',
        english: 'Postal payment slip',
        description:
          'Pre-printed slip in the permesso kit for paying production fees and state contributions at Poste.',
      },
      {
        term: 'Dichiarazione di ospitalità',
        english: 'Hospitality declaration',
        description:
          'Form when you live with a host who is not your landlord, common for students. Often needed with housing proof for permesso and residenza.',
      },
      {
        term: 'Marca da bollo',
        english: 'Revenue stamp',
        description:
          '€16 adhesive stamp affixed to permesso and some other applications. Buy at a tabaccheria before Poste submission.',
      },
      {
        term: 'Patronato',
        english: 'Authorized assistance office',
        description:
          'Free help compiling permesso kits and other social/admin forms. Listed on Portale Immigrazione.',
      },
      {
        term: 'PEC',
        english: 'Certified email',
        description:
          'Legally equivalent to registered mail for many PA submissions. Milan accepts PEC for TARI declarations (tassarifiuti@pec.comune.milano.it) and other comune services.',
      },
      {
        term: 'Poste Italiane: Sportello Amico',
        english: 'Post office counter for permit applications',
        description:
          'Enabled post offices that accept permesso di soggiorno kits. Not every branch: check Poste\'s office finder.',
      },
      {
        term: 'Raccomandata',
        english: 'Registered mail',
        description:
          'Tracked letter used for Questura appointments when no slot is available at Poste, and for CIE delivery.',
      },
    ],
  },
  {
    id: 'tax-municipal',
    title: 'Tax & municipal services',
    entries: [
      {
        term: 'Acconto e saldo',
        english: 'TARI instalments',
        description:
          'Milan bills TARI in two yearly payments: acconto (advance, due ~July) and saldo (balance, due ~December). Amounts appear on the official avviso di pagamento.',
      },
      {
        term: 'Avviso di pagamento',
        english: 'Payment notice',
        description:
          'Official bill from the comune (e.g. TARI) with PagoPA codes. Pay only using the codes on this document.',
      },
      {
        term: 'Bimestre',
        english: 'Two-month billing period',
        description:
          'Milan TARI is calculated in bimestri. Occupancy and cessation declarations take effect from the bimestre after the event.',
      },
      {
        term: 'Comodato d\'uso',
        english: 'Free loan of property',
        description:
          'Housing arrangement where the owner lends the property without rent. For TARI, the owner (not the occupant) usually pays unless the contract says otherwise.',
      },
      {
        term: 'Contratto di locazione',
        english: 'Rental lease',
        description:
          'Housing contract. Required for visa, permesso, and residenza. Keep addresses consistent with passport and forms.',
      },
      {
        term: 'Dichiarazione di occupazione / cessazione (TARI)',
        english: 'TARI occupancy / cessation declaration',
        description:
          'Notify Milan when you start or stop occupying a property for waste tax purposes, separate from cancelling residenza. File within 90 days of move-in.',
      },
      {
        term: 'Occupante',
        english: 'Occupant (TARI)',
        description:
          'Person who actually uses a property. The occupant pays TARI by default, regardless of ownership, unless a lease or comodato says otherwise.',
      },
      {
        term: 'PagoPA',
        english: 'Public administration payment system',
        description:
          'Standard way to pay Italian public fees online or at authorized points using codes from an avviso di pagamento.',
      },
      {
        term: 'TARI',
        english: 'Municipal waste tax',
        description:
          'Local tax funding rubbish collection in Milan. Tenants usually pay on leases longer than six months unless the contract says otherwise. See our TARI guide.',
      },
      {
        term: 'TEFA',
        english: 'Metropolitan waste surcharge',
        description:
          '5% metropolitan component added to Milan domestic TARI bills. Shown in the total on your avviso di pagamento.',
      },
    ],
  },
  {
    id: 'digital-health',
    title: 'Digital identity & healthcare',
    entries: [
      {
        term: 'CieID',
        english: 'CIE mobile app',
        description:
          'App to read your CIE via NFC and log in with Entra con CIE on phones and some portals.',
      },
      {
        term: 'Entra con CIE',
        english: 'Sign in with CIE',
        description:
          'Login option on many government sites using your electronic ID card and PIN.',
      },
      {
        term: 'Fascicolo Sanitario Elettronico (FSE)',
        english: 'Electronic health record',
        description:
          'Online health documents portal. Accessible with CIE or SPID on supported regional systems.',
      },
      {
        term: 'PrenotaFacile',
        english: 'Questura appointment app',
        description:
          'Polizia di Stato system to book or manage Questura appointments, useful for permesso renewal proof when expired.',
      },
      {
        term: 'Servizio Sanitario Nazionale (SSN)',
        english: 'National Health Service',
        description:
          'Italy\'s public healthcare system. Enrollment gives you a tessera sanitaria and access to public care.',
      },
      {
        term: 'SPID',
        english: 'Public digital identity',
        description:
          'Certified online login (PosteID, Aruba, etc.) accepted on many PA portals including Milan\'s Fascicolo del Cittadino.',
      },
    ],
  },
];

export const allPaperworkGlossaryEntries = () => allGlossaryEntries(paperworkGlossaryCategories);
