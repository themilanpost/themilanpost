import type { GlossaryCategory } from './glossary-types';
import { allGlossaryEntries } from './glossary-types';

export const livingGlossaryPath = '/living-in-milan/glossary';

export const livingGlossaryCategories: GlossaryCategory[] = [
  {
    id: 'water',
    title: 'Water & fountains',
    entries: [
      {
        term: 'Case dell\'acqua',
        english: 'Water houses',
        description:
          'MM refrigerated refill stations for still and sparkling tap water. Free with tessera sanitaria or CRS card. Find on latuaacqua.it, the MM app, or our maps page (#case-dell-acqua).',
      },
      {
        term: 'Draghi Verdi',
        english: 'Green dragons (nickname)',
        description:
          'Nickname for Milan\'s green cast-iron public fountains, the spout is shaped like a dragon. Same as vedovelle. See our draghi verdi guide and maps page (#draghi-verdi).',
      },
      {
        term: 'Metropolitana Milanese (MM)',
        english: 'Milan water utility',
        description:
          'City water company (not the metro). Maintains vedovelle, Case dell\'acqua, and latuaacqua.it.',
      },
      {
        term: 'Vedovella / vedovelle',
        english: 'Public drinking fountain',
        description:
          'Milan\'s continuous-flow street fountains with potable water (also called draghi verdi). No card needed. See our draghi verdi guide.',
      },
    ],
  },
  {
    id: 'transport-zones',
    title: 'Transport & traffic zones',
    entries: [
      {
        term: 'Area B',
        english: 'Low-emission zone (outer)',
        description:
          'ZTL covering most of Milan municipality. Restricts access for the most polluting vehicles, no ticket, but plate standards apply. Access-point map on our Milan maps page (#area-b-gates).',
      },
      {
        term: 'Area C',
        english: 'Congestion charge zone (centre)',
        description:
          'Paid ZTL inside the Cerchia dei Bastioni (historic centre). Entry via electronic gates (varchi); ticket required in active hours unless exempt. Gate map: #area-c-gates on Milan maps.',
      },
      {
        term: 'ATM',
        english: 'Milan public transport operator',
        description:
          'Azienda Trasporti Milanesi: metro, bus, tram, and GiroMilano interactive map. Not the same as Metropolitana Milanese (MM, water utility).',
      },
      {
        term: 'BikeMi',
        english: 'Milan bike sharing',
        description:
          'Public bike-share docking stations. Live availability in the BikeMi app; official station locations on our Milan maps page (#bikemi).',
      },
      {
        term: 'Ferrovia suburbana / stazione ferroviaria',
        english: 'Suburban rail station',
        description:
          'FS and suburban rail stops within Milan (Passante, S-lines, etc.). Comune open-data map on Milan maps (#rail-stations); timetables on Trenitalia or Trenord.',
      },
      {
        term: 'GiroMilano',
        english: 'ATM journey planner & map',
        description:
          'Interactive route planner at giromilano.atm.it. Static metro schematic: giromilano.atm.it/assets/images/schema_rete_metro.jpg.',
      },
      {
        term: 'Piste ciclabili',
        english: 'Cycle paths & bike routes',
        description:
          'Official cycle network segments from Comune open data (DS60). Dense overlay: zoom in on our Milan maps page (#cycle-paths); not all segments are protected lanes.',
      },
      {
        term: 'Varco elettronico',
        english: 'Electronic access gate',
        description:
          'Camera-equipped checkpoint for Area C or Area B. Area C gates require a ticket in active hours unless exempt. Maps: #area-c-gates and #area-b-gates.',
      },
      {
        term: 'ZTL (Zona a Traffico Limitato)',
        english: 'Limited traffic zone',
        description:
          'Restricted-access area enforced by cameras. Area C (centre, paid) and Area B (wider, emissions-based) are Milan\'s main ZTLs. Pedestrian and ZTL polygons: #ztl-areas on Milan maps.',
      },
    ],
  },
  {
    id: 'waste',
    title: 'Waste & recycling',
    entries: [
      {
        term: 'AMSA',
        english: 'Milan waste company',
        description:
          'Azienda Milanese Servizi Ambientali: handles rubbish collection, riciclerie, eco-islands, and mobile CAM centres in Milan. Maps at amsa.it and on our Milan maps page.',
      },
      {
        term: 'CAM (Centro Ambientale Mobile)',
        english: 'Mobile recycling centre',
        description:
          'Roaming AMSA collection point for electronics, batteries, oils, and similar waste. Calendar on amsa.it and Comune open data DS1689 (CSV, not on our map embeds).',
      },
      {
        term: 'Eco-isola / ecoisole',
        english: 'Neighbourhood waste drop-off island',
        description:
          'Small street-level bins for separated waste (glass, paper, plastic, organic). Not the same as AMSA riciclerie. Map on Milan maps (#eco-islands).',
      },
      {
        term: 'Ricicleria',
        english: 'Recycling centre',
        description:
          'AMSA fixed drop-off site for bulky waste, electronics, wood, metal, and other separated materials. Five locations in Milan: map on Milan maps (#riciclerie); hours on amsa.it.',
      },
    ],
  },
  {
    id: 'markets-shopping',
    title: 'Markets & shopping',
    entries: [
      {
        term: 'Fare Impresa Milano',
        english: 'Comune business & markets portal',
        description:
          'Official Comune site for mercati settimanali scoperti, geoportale map, ubicazioni PDF, and stall counts. fareimpresa.comune.milano.it/mercati-settimanali-scoperti.',
      },
      {
        term: 'Mercato comunale coperto',
        english: 'Covered municipal market',
        description:
          'Fixed indoor market hall with permanent stalls, open most weekdays, separate from weekly street markets. Map on Milan maps (#covered-markets, DS2471).',
      },
      {
        term: 'Mercato rionale / mercati settimanali scoperti',
        english: 'Weekly open-air street market',
        description:
          'Temporary stalls on public streets or piazzas, usually on fixed weekday(s). Filter by day and municipio on our markets guide (DS291).',
      },
      {
        term: 'Posteggi alimentari / non alimentari',
        english: 'Food / non-food market stalls',
        description:
          'Stall categories in Comune market data: food (produce, fish, etc.) vs clothing, household goods, and similar. Counts appear in DS291 map popups.',
      },
      {
        term: 'Sgombero',
        english: 'Market pack-down',
        description:
          'Window when stalls are dismantled at the end of a market session. Comune PDFs list orario sgombero per market, arrive before this time.',
      },
    ],
  },
  {
    id: 'culture-digital',
    title: 'Culture, language & digital services',
    entries: [
      {
        term: 'CPIA (Centro Provinciale Istruzione Adulti)',
        english: 'Provincial adult education centre',
        description:
          'Public centres offering Italian language and basic education for adults, including newcomers. Locations on Milan maps (#cpia, DS551): verify enrolment with each provider.',
      },
      {
        term: 'Milano Musei Card',
        english: 'Municipal museums pass',
        description:
          'Pass covering selected Comune civic museums. Participating sites on Milan maps (#musei-card, DS2727); rules and validity on museicivicimilano.it.',
      },
      {
        term: 'Open WiFi Milano',
        english: 'Municipal outdoor Wi-Fi',
        description:
          'Free public Wi-Fi at outdoor access points (network name OpenWifiMilano). Registration required. Antenna map on Milan maps (#open-wifi, DS69).',
      },
      {
        term: 'Scuola di italiano per stranieri',
        english: 'Italian language school for foreigners',
        description:
          'Courses run by associations, comune programmes, and CPIA centres for non-native speakers. Comune list on Milan maps (#cpia, DS551).',
      },
      {
        term: 'Sistema Bibliotecario Milanese (SBM)',
        english: 'Milan public library network',
        description:
          'City library branches (Biblioteche di quartiere and central libraries). Branch map on Milan maps (#libraries, DS1306); hours on sbm-cultura.it.',
      },
    ],
  },
  {
    id: 'local-services',
    title: 'Local services & neighbourhoods',
    entries: [
      {
        term: 'Farmacia di turno',
        english: 'On-duty pharmacy',
        description:
          'Pharmacy open outside normal hours on a rota. Live turni: farmacia-aperta.eu. Static pharmacy locations on Milan maps (#farmacie, DS501), not live opening hours.',
      },
      {
        term: 'Municipio',
        english: 'City district (1-9)',
        description:
          'Milan is divided into nine municipi (boroughs). Open-data stats and our markets filter use the Comune ZD (zona decreto) field, which aligns with municipio in DS291.',
      },
      {
        term: 'NIL (Nucleo di Identità Locale)',
        english: 'Neighbourhood unit',
        description:
          'Fine-grained neighbourhood label in Comune open data, used on fountain, pharmacy, Wi-Fi, and library maps.',
      },
      {
        term: 'Portale del Dato',
        english: 'Comune open data portal',
        description:
          'Story maps and datasets at dati.comune.milano.it. Our Milan maps page embeds CKAN GeoJSON feeds (DS502, DS291, etc.) for interactive Leaflet maps.',
      },
      {
        term: 'Zona Decreto (ZD)',
        english: 'Administrative zone code',
        description:
          'Numeric zone in Comune datasets (often 1-9), used as municipio on the weekly markets map filter and in official market PDFs.',
      },
    ],
  },
];

export const allLivingGlossaryEntries = () => allGlossaryEntries(livingGlossaryCategories);
