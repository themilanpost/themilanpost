/** Curated official Milan maps: external links and on-site embeds. */

import type { MilanMapResource } from './milan-map-types';
export type { MilanMapKind, MilanMapResource } from './milan-map-types';
export { milanMapCategories } from './milan-map-types';

export const milanExternalMaps: MilanMapResource[] = [
  {
    id: 'latuaacqua-search',
    category: 'Water',
    title: 'MM: nearest vedovella or Case dell\'acqua',
    description:
      'Address search on latuaacqua.it for the closest street fountain or water house. Same data powers the MM mobile app.',
    source: 'Metropolitana Milanese',
    href: 'https://www.latuaacqua.it/wps/portal/milanoblu/it/home/acqua-di-milano/tutto-su-acqua-di-milano/vedovelle',
    kind: 'external',
  },
  {
    id: 'comune-fontanelle-story',
    category: 'Water',
    title: 'Comune: fontanelle story map',
    description:
      'City-wide overview, municipio breakdown, and the artistic fountains in City Life park. CSV download for DIY maps.',
    source: 'Comune di Milano: Portale del Dato',
    href: 'https://dati.comune.milano.it/web/portale-del-dato/w/fontanelle-di-milano',
    kind: 'external',
  },
  {
    id: 'giromilano',
    category: 'Transport',
    title: 'GiroMilano: live route planner',
    description:
      'Interactive ATM map: plan journeys, see nearby stops, BikeMi stations, park-and-ride, and Area C gates.',
    source: 'ATM: Azienda Trasporti Milanesi',
    href: 'https://giromilano.atm.it/',
    kind: 'external',
  },
  {
    id: 'atm-metro-schematic',
    category: 'Transport',
    title: 'ATM: metro network schematic (image)',
    description:
      'Current metro and suburban rail lines: stations, accessibility, and fare-zone boundaries.',
    source: 'ATM',
    href: 'https://giromilano.atm.it/assets/images/schema_rete_metro.jpg',
    kind: 'external',
  },
  {
    id: 'atm-metro-pdf',
    category: 'Transport',
    title: 'ATM: metro network map (PDF)',
    description:
      'Downloadable schematic of metro and suburban rail, same network as the image map, PDF format.',
    source: 'ATM',
    href: 'https://www.atm.it/it/AltriServizi/Trasporto/Documents/schema_rete_metro.pdf',
    kind: 'external',
  },
  {
    id: 'atm-full-network-pdf',
    category: 'Transport',
    title: 'ATM: full surface network (PDF)',
    description:
      'Metro, bus, tram, and trolleybus lines across greater Milan.',
    source: 'ATM',
    href: 'https://www.atm.it/it/AltriServizi/Trasporto/Documents/Carta%20ATM_WEB_2025.11.pdf',
    kind: 'external',
  },
  {
    id: 'atm-night-network-pdf',
    category: 'Transport',
    title: 'ATM: night bus network (PDF)',
    description:
      'N-line night buses and metro-replacement routes when the metro is closed.',
    source: 'ATM',
    href: 'https://www.atm.it/it/ViaggiaConNoi/Documents/rete_notte.pdf',
    kind: 'external',
  },
  {
    id: 'atm-fare-zones',
    category: 'Transport',
    title: 'ATM: fare zones (Mi1-Mi9 map)',
    description:
      'STIBM tariff zones for Milan and Monza Brianza. Check which ticket or pass applies to your route.',
    source: 'ATM',
    href: 'https://nuovosistematariffario.atm.it/static/tariffe/stibm/zoom.png',
    kind: 'external',
  },
  {
    id: 'area-bc-story',
    category: 'Driving & zones',
    title: 'Comune: Area C & Area B gates map',
    description:
      'Story map of electronic access gates: Area C (paid ZTL inside the Bastioni ring) and Area B (emissions-based restrictions).',
    source: 'Comune di Milano: Portale del Dato',
    href: 'https://dati.comune.milano.it/web/portale-del-dato/w/mappa-dei-varchi-di-area-c-e-area-b-a-milano',
    kind: 'external',
  },
  {
    id: 'comune-area-c',
    category: 'Driving & zones',
    title: 'Comune: Area C boundaries & gates (FAQ map)',
    description:
      'Official map of Area C varchi and boundary streets, with links to Area B rules.',
    source: 'Comune di Milano',
    href: 'https://servizicrm.comune.milano.it/centro-supporto/KA-01472/Confini-e-varchi-di-Area-C',
    kind: 'external',
  },
  {
    id: 'farmacia-aperta',
    category: 'Health',
    title: 'Farmacia Aperta: on-duty pharmacies',
    description:
      'Map of pharmacies open now or on turno near you. Run by Federfarma Lombardia; ATS Milano points residents here for turni.',
    source: 'Federfarma Lombardia',
    href: 'https://www.farmacia-aperta.eu/',
    kind: 'external',
  },
  {
    id: 'ats-farmacie',
    category: 'Health',
    title: 'ATS Milano: pharmacy services',
    description:
      'Regional health agency hub with links to pharmacy lists and turni for Milan.',
    source: 'ATS Milano',
    href: 'https://www.ats-milano.it/ats/carta-servizi/guida-servizi/farmaci-farmacie/farmacie',
    kind: 'external',
  },
  {
    id: 'amsa-riciclerie',
    category: 'Waste & recycling',
    title: 'AMSA: riciclerie map',
    description:
      'Recycling centres across Milan with an Esri map for directions, opening hours, and accepted waste types.',
    source: 'AMSA',
    href: 'https://www.amsa.it/it/milano/servizi/ricicleria',
    kind: 'external',
  },
  {
    id: 'amsa-cam',
    category: 'Waste & recycling',
    title: 'AMSA: mobile environmental centre (CAM)',
    description:
      'Calendar and locations for the roaming CAM that collects electronics, batteries, oils, and similar waste.',
    source: 'AMSA / Comune open data DS1689',
    href: 'https://www.amsa.it/cittadini/milano/centro-ambientale-mobile',
    kind: 'external',
  },
  {
    id: 'comune-street-sport',
    category: 'Sport & parks',
    title: 'Comune: street sport & outdoor facilities (app map)',
    description:
      '400+ outdoor courts and street-sport locations in the Fascicolo del Cittadino app, Sport category, no login required to browse the map.',
    source: 'Comune di Milano',
    href: 'https://www.comune.milano.it/servizi/sport/impianti-sportivi-comunali-rapporti-e-convenzioni',
    kind: 'external',
  },
  {
    id: 'weekly-markets-by-day',
    category: 'Markets & shopping',
    title: 'Weekly markets: by day',
    description:
      'Filter Comune open data (DS291) by weekday and municipio. List + map: defaults to today. For covered indoor markets see the embed below.',
    source: 'Comune di Milano DS291',
    href: '/living-in-milan/markets',
    kind: 'external',
  },
  {
    id: 'mappaletteraria',
    category: 'Culture',
    title: 'Mappaletteraria.it: searchable literary map',
    description:
      'Open-source hub for literary maps across Italy, including Milan, filter by city, genre, or reading route.',
    source: 'Associazione L\'Impronta / Mappaletteraria.it',
    href: 'https://www.mappaletteraria.it/',
    kind: 'external',
  },
];
