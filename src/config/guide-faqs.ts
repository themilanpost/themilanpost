/**
 * Italian FAQs for guide pages (shown on Italian posts).
 * Phrased from real GSC queries (Oct 2026); answers grounded in each guide’s sourced content.
 * Visible on-page + FAQPage JSON-LD (Google: FAQ must match visible text).
 * Prefer inclusive framing when the topic applies to everyone (e.g. CIE, TARI); keep
 * “extra-UE / permesso” only where the rule is genuinely nationality-specific.
 */

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideFaqBlock {
  /** Section heading (Italian) */
  heading: string;
  intro: string;
  items: GuideFaqItem[];
}

const tariFaqs: GuideFaqBlock = {
  heading: 'Domande frequenti sulla TARI a Milano',
  intro:
    'Risposte brevi per chi occupa un’abitazione a Milano (inquilini, proprietari, nuovi e vecchi residenti). Controlla sempre importi e scadenze aggiornate sul sito del Comune.',
  items: [
    {
      question: 'Cos’è la TARI a Milano?',
      answer:
        'È la tassa sui rifiuti del Comune. Serve a finanziare raccolta e smaltimento. Per le utenze domestiche il conto ha una quota fissa (metri quadri) e una quota variabile (numero di occupanti), più il TEFA metropolitano.',
    },
    {
      question: 'Chi paga la TARI se affitto casa a Milano?',
      answer:
        'Di regola, se l’affitto dura sei mesi o più paga l’inquilino, salvo diverso accordo nel contratto. Sotto i sei mesi di solito paga il proprietario. Leggi sempre il contratto di locazione.',
    },
    {
      question: 'Entro quando va presentata la dichiarazione di nuova occupazione?',
      answer:
        'Entro 90 giorni dall’inizio dell’occupazione, secondo il regolamento TARI del Comune. Senza dichiarazione il Comune non può calcolare la tassa e spesso non manda l’avviso di pagamento.',
    },
    {
      question: 'Come si dichiara la TARI online a Milano?',
      answer:
        'Dal servizio “dichiarazione di occupazione” sul sito del Comune, con SPID o CIE. Servono codice fiscale, dati catastali, superficie e numero di occupanti. Conserva la ricevuta online.',
    },
    {
      question: 'Come si fa la cessazione TARI quando si lascia l’appartamento?',
      answer:
        'Non basta cambiare la residenza anagrafica. Va presentata la dichiarazione di cessazione quando lasci davvero l’immobile, altrimenti la posizione resta aperta. Usa i canali indicati dal Comune (online, PEC o moduli ufficiali).',
    },
    {
      question: 'Si può pagare la TARI con F24 o MAV?',
      answer:
        'No, secondo le indicazioni del Comune. Si paga con i codici riportati sull’avviso di pagamento ufficiale, non con bollettini generici o F24.',
    },
  ],
};

const permessoFaqs: GuideFaqBlock = {
  heading: 'Domande frequenti sul permesso di soggiorno a Milano',
  intro:
    'Per cittadini extra-UE. Le fonti principali sono Polizia di Stato, Poste Italiane e Portale Immigrazione. Controlla sempre gli importi sul kit e sulle pagine ufficiali: cambiano.',
  items: [
    {
      question: 'Entro quando va richiesto il permesso di soggiorno?',
      answer:
        'Entro otto giorni lavorativi dall’ingresso in Italia. Non è un consiglio: è il termine indicato da Polizia di Stato e Poste per la maggior parte dei motivi di soggiorno lunghi.',
    },
    {
      question: 'Si fa alle Poste o in Questura a Milano?',
      answer:
        'Nella maggior parte dei casi (studio, lavoro, famiglia, ecc.) si parte dal kit alle Poste Sportello Amico. Alcuni motivi vanno invece in Questura o allo Sportello Unico Immigrazione: dipende dal tipo di visto e dal codice del kit.',
    },
    {
      question: 'Cosa sono i codici kit 16 e 17?',
      answer:
        'Sono i motivi di soggiorno stampati sul kit giallo MOD. 209. Il codice deve combaciare con il tuo visto. Un codice sbagliato ritarda o blocca la pratica: verifica la tabella aggiornata sulle pagine di Poste e Portale Immigrazione.',
    },
    {
      question: 'Con la ricevuta delle Poste si può viaggiare?',
      answer:
        'La ricevuta non è un documento di viaggio. In certi casi la Polizia consente uscita e rientro temporanei se hai passaporto, ricevuta e, dove richiesto, il visto ancora valido. Controlla le condizioni ufficiali prima di prenotare un volo.',
    },
    {
      question: 'Come si prenota la Questura di Milano per il permesso?',
      answer:
        'Di solito l’appuntamento arriva con la ricevuta Poste o con una raccomandata. Per alcune pratiche (conversioni, casi fuori kit) si usa PrenotaFacile. Porta foto tessera e i documenti elencati nella convocazione.',
    },
    {
      question: 'I cittadini UE devono fare il permesso di soggiorno?',
      answer:
        'No. Per soggiorni oltre tre mesi si iscrivono all’anagrafe del Comune (residenza). Non passano dalla Questura per un permesso elettronico.',
    },
  ],
};

const cieFaqs: GuideFaqBlock = {
  heading: 'Domande frequenti sulla CIE a Milano',
  intro:
    'Per chi richiede la CIE al Comune di Milano (cittadini italiani e residenti di altre nazionalità). Prenotazione e documenti possono cambiare: verifica sempre sulla pagina Anagrafe del Comune prima di prenotare.',
  items: [
    {
      question: 'Cos’è la Carta d’Identità Elettronica (CIE)?',
      answer:
        'È la carta d’identità italiana con chip. Serve come documento fisico e, con l’app CieID, per entrare in molti servizi pubblici online (“Entra con CIE”).',
    },
    {
      question: 'Chi può richiedere la CIE a Milano?',
      answer:
        'Chi ha la residenza anagrafica a Milano (o, in casi limitati, il domicilio). Se sei extra-UE serve anche un permesso o carta di soggiorno validi — oppure ricevuta di rinnovo / conferma appuntamento Questura, secondo le FAQ del Comune.',
    },
    {
      question: 'Come si prenota la CIE a Milano?',
      answer:
        'Solo su appuntamento, dal sistema del Comune di Milano collegato alla pagina “Carta d’identità”. Non usare il portale nazionale agendacie.interno.gov.it per Milano: il Comune ha un canale proprio.',
    },
    {
      question: 'Con la CIE si può viaggiare all’estero?',
      answer:
        'Dipende dalla cittadinanza. Per i cittadini italiani la CIE valida per espatrio vale in UE e in alcuni Paesi EFTA. Se non sei cittadino italiano, la CIE rilasciata in Italia non vale per l’espatrio: per uscire serve il passaporto (o altro documento di viaggio del tuo Paese).',
    },
    {
      question: 'La CIE sostituisce il permesso di soggiorno?',
      answer:
        'No. Restano due documenti diversi. Se ti serve un permesso (o altro titolo di soggiorno), va tenuto in regola anche se hai già la CIE.',
    },
    {
      question: 'A cosa serve la CIE online?',
      answer:
        'Con CieID puoi accedere a molti portali della PA (Comune, fascicolo del cittadino, alcuni servizi nazionali). È utile dopo la residenza, per esempio per dichiarazioni TARI e pratiche digitali.',
    },
  ],
};

export const guideFaqsBySlug: Record<string, GuideFaqBlock> = {
  'tari-waste-tax-milan-newcomers': tariFaqs,
  'permesso-di-soggiorno-milan-newcomers': permessoFaqs,
  'cie-digital-id-for-expats-in-italy': cieFaqs,
};

export function getGuideFaqs(slug: string | undefined): GuideFaqBlock | undefined {
  if (!slug) return undefined;
  return guideFaqsBySlug[slug];
}

/** JSON-LD FAQPage mainEntity list */
export function faqPageMainEntity(items: GuideFaqItem[]) {
  return items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));
}
