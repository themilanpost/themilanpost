/** On-site Leaflet embeds sourced from Comune di Milano open data. */

import type { MilanMapResource } from './milan-map-types';

export type EmbeddedPopupType =
  | 'fontanelle'
  | 'case-acqua'
  | 'farmacia'
  | 'ricicleria'
  | 'varco-c'
  | 'varco-b'
  | 'metro-stop'
  | 'bikemi'
  | 'cpia'
  | 'weekly-market'
  | 'eco-island'
  | 'ztl-area'
  | 'cycle-path'
  | 'rail-station'
  | 'covered-market'
  | 'library'
  | 'open-wifi'
  | 'musei-card';

export type EmbeddedGeometryMode = 'points' | 'lines' | 'polygons';

export interface MilanEmbeddedMapConfig extends MilanMapResource {
  kind: 'embedded';
  packageId: string;
  datasetPage: string;
  popupType: EmbeddedPopupType;
  /** Points (default), line network, or polygon areas. */
  geometryMode?: EmbeddedGeometryMode;
  /** Optional second dataset (e.g. metro lines under stops). */
  linePackageId?: string;
  guideHref?: string;
  pointColor: string;
  pointBorder: string;
}

export const milanEmbeddedMaps: MilanEmbeddedMapConfig[] = [
  {
    id: 'draghi-verdi',
    category: 'Water',
    title: 'Draghi Verdi: drinking fountains',
    description:
      'Interactive map from Comune open data (DS502, weekly updates). Tap a pin for neighbourhood and Google Maps directions.',
    source: 'Comune di Milano DS502',
    kind: 'embedded',
    packageId: 'ds502_fontanelle-nel-comune-di-milano',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano',
    popupType: 'fontanelle',
    guideHref: '/living-in-milan/draghi-verdi',
    pointColor: '#40916c',
    pointBorder: '#1b4332',
  },
  {
    id: 'case-dell-acqua',
    category: 'Water',
    title: "Case dell'acqua: refill stations",
    description:
      'Refrigerated still and sparkling water points (DS625). Free with tessera sanitaria at the machine, not the same as street fountains.',
    source: 'Comune di Milano DS625',
    kind: 'embedded',
    packageId: 'ds625-case-dell-acqua-nel-comune-di-milano',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds625-case-dell-acqua-nel-comune-di-milano',
    popupType: 'case-acqua',
    pointColor: '#0077b6',
    pointBorder: '#023e8a',
  },
  {
    id: 'bikemi',
    category: 'Transport',
    title: 'BikeMi stations',
    description:
      'Shared-bike docking stations (DS65). For live availability use the BikeMi app, this map shows official station locations.',
    source: 'Comune di Milano DS65',
    kind: 'embedded',
    packageId: 'ds65_infogeo_aree_sosta_bike_sharing_localizzazione_',
    datasetPage:
      'https://dati.comune.milano.it/dataset/ds65_infogeo_aree_sosta_bike_sharing_localizzazione_',
    popupType: 'bikemi',
    pointColor: '#e63946',
    pointBorder: '#9d0208',
  },
  {
    id: 'rail-stations',
    category: 'Transport',
    title: 'Rail & suburban stations',
    description:
      'FS and suburban rail stops within Milan (DS80). Complements the metro map: use Trenitalia or Trenord for live timetables.',
    source: 'Comune di Milano DS80',
    kind: 'embedded',
    packageId: 'ds80_infogeo_stazioni_ferroviarie_localizzazione_',
    datasetPage:
      'https://dati.comune.milano.it/dataset/ds80_infogeo_stazioni_ferroviarie_localizzazione_',
    popupType: 'rail-station',
    pointColor: '#6a040f',
    pointBorder: '#370617',
  },
  {
    id: 'cycle-paths',
    category: 'Transport',
    title: 'Cycle paths & bike routes',
    description:
      'Official cycle network segments (DS60, ~4k features). Dense overlay: zoom in for detail; not all segments are protected lanes.',
    source: 'Comune di Milano DS60',
    kind: 'embedded',
    packageId: 'ds60_infogeo_piste_ciclabili_localizzazione_',
    datasetPage:
      'https://dati.comune.milano.it/dataset/ds60_infogeo_piste_ciclabili_localizzazione_',
    popupType: 'cycle-path',
    geometryMode: 'lines',
    pointColor: '#06d6a0',
    pointBorder: '#118ab2',
  },
  {
    id: 'metro-stops',
    category: 'Transport',
    title: 'Metro stops & lines',
    description:
      'ATM metro stations (DS535) with route lines (DS539) from Comune open data. For live departures use GiroMilano.',
    source: 'Comune di Milano DS535 / DS539',
    kind: 'embedded',
    packageId: 'ds535_atm-fermate-linee-metropolitane',
    linePackageId: 'ds539_atm-percorsi-linee-metropolitane',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds535_atm-fermate-linee-metropolitane',
    popupType: 'metro-stop',
    pointColor: '#ffffff',
    pointBorder: '#212529',
  },
  {
    id: 'area-c-gates',
    category: 'Driving & zones',
    title: 'Area C: electronic gates',
    description:
      'Camera-equipped access points around the historic centre (DS82). Paid ZTL: ticket required in active hours unless exempt.',
    source: 'Comune di Milano DS82',
    kind: 'embedded',
    packageId: 'ds82_infogeo_varchi_elettronici_localizzazione_',
    datasetPage:
      'https://dati.comune.milano.it/dataset/ds82_infogeo_varchi_elettronici_localizzazione_',
    popupType: 'varco-c',
    pointColor: '#2d6a4f',
    pointBorder: '#1b4332',
  },
  {
    id: 'ztl-areas',
    category: 'Driving & zones',
    title: 'Pedestrian areas & ZTL zones',
    description:
      'Pedestrian zones and limited-traffic areas (DS51). Complements the Area C/B gate maps: check ordinances and hours on the Comune site.',
    source: 'Comune di Milano DS51',
    kind: 'embedded',
    packageId: 'ds51_trafficotrasporti_aree_pedonali_ztl',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds51_trafficotrasporti_aree_pedonali_ztl',
    popupType: 'ztl-area',
    geometryMode: 'polygons',
    pointColor: '#ffd166',
    pointBorder: '#ef476f',
  },
  {
    id: 'area-b-gates',
    category: 'Driving & zones',
    title: 'Area B: access points',
    description:
      'Low-emission zone checkpoints across Milan (DS959). Plate standards apply: no Area C ticket.',
    source: 'Comune di Milano DS959',
    kind: 'embedded',
    packageId: 'ds959-varchi-areab',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds959-varchi-areab',
    popupType: 'varco-b',
    pointColor: '#4361ee',
    pointBorder: '#3a0ca3',
  },
  {
    id: 'farmacie',
    category: 'Health',
    title: 'Pharmacies in Milan (locations)',
    description:
      'All registered pharmacies (DS501): static locations, not live turni. For on-duty pharmacies use Farmacia Aperta (link below).',
    source: 'Comune di Milano DS501',
    kind: 'embedded',
    packageId: 'ds501_farmacie-nel-comune-di-milano',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds501_farmacie-nel-comune-di-milano',
    popupType: 'farmacia',
    pointColor: '#52b788',
    pointBorder: '#2d6a4f',
  },
  {
    id: 'eco-islands',
    category: 'Waste & recycling',
    title: 'Eco-islands: small drop-off points',
    description:
      'Neighbourhood eco-islands for glass, paper, plastic, and organic waste (DS680). Not the same as AMSA riciclerie: smaller street-level bins.',
    source: 'Comune di Milano DS680',
    kind: 'embedded',
    packageId: 'ds680-ambiente-ecoisole-a-milano',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds680-ambiente-ecoisole-a-milano',
    popupType: 'eco-island',
    pointColor: '#80b918',
    pointBorder: '#2b9348',
  },
  {
    id: 'riciclerie',
    category: 'Waste & recycling',
    title: 'AMSA riciclerie',
    description:
      'Five fixed recycling centres (DS692). Opening hours and accepted materials on amsa.it, link below.',
    source: 'Comune di Milano DS692',
    kind: 'embedded',
    packageId: 'ds692-riciclerie',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds692-riciclerie',
    popupType: 'ricicleria',
    pointColor: '#f77f00',
    pointBorder: '#d62828',
  },
  {
    id: 'covered-markets',
    category: 'Markets & shopping',
    title: 'Covered municipal markets',
    description:
      'Indoor mercati comunali (DS2471): fixed stalls under roof. Check Comune pages for current opening hours.',
    source: 'Comune di Milano DS2471',
    kind: 'embedded',
    packageId: 'ds2471-mercati-comunali-coperti',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds2471-mercati-comunali-coperti',
    popupType: 'covered-market',
    pointColor: '#ff6b35',
    pointBorder: '#bc4749',
  },
  {
    id: 'open-wifi',
    category: 'Digital & services',
    title: 'Open WiFi Milano: outdoor access points',
    description:
      'Municipal outdoor Wi-Fi antenna locations (DS69). Free registration required: network name OpenWifiMilano.',
    source: 'Comune di Milano DS69',
    kind: 'embedded',
    packageId: 'ds69-ammcomunale-antenne-open-wifi-localizzazione',
    datasetPage:
      'https://dati.comune.milano.it/dataset/ds69-ammcomunale-antenne-open-wifi-localizzazione',
    popupType: 'open-wifi',
    pointColor: '#4cc9f0',
    pointBorder: '#4361ee',
  },
  {
    id: 'cpia',
    category: 'Culture',
    title: 'Italian for foreigners & CPIA schools',
    description:
      'Italian language courses and CPIA centres for adults (DS551). Verify enrolment requirements with each provider.',
    source: 'Comune di Milano DS551',
    kind: 'embedded',
    packageId: 'ds551_scuole-di-italiano-per-stranieri-e-cpia',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds551_scuole-di-italiano-per-stranieri-e-cpia',
    popupType: 'cpia',
    pointColor: '#7209b7',
    pointBorder: '#560bad',
  },
  {
    id: 'libraries',
    category: 'Culture',
    title: 'Libraries: SBM network',
    description:
      'Sistema Bibliotecario Milanese branch locations (DS1306). Hours and services vary: check sbm-cultura.it before visiting.',
    source: 'Comune di Milano DS1306',
    kind: 'embedded',
    packageId: 'ds1306-sistema-bibliotecario-milano',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds1306-sistema-bibliotecario-milano',
    popupType: 'library',
    pointColor: '#5a189a',
    pointBorder: '#3c096c',
  },
  {
    id: 'musei-card',
    category: 'Culture',
    title: 'Milano Musei Card museums',
    description:
      'Municipal museums included in the Milano Musei Card pass (DS2727). Card validity and free-entry rules on museicivicimilano.it.',
    source: 'Comune di Milano DS2727',
    kind: 'embedded',
    packageId: 'ds2727-cultura-milano-musei-card',
    datasetPage: 'https://dati.comune.milano.it/dataset/ds2727-cultura-milano-musei-card',
    popupType: 'musei-card',
    pointColor: '#9d4edd',
    pointBorder: '#7b2cbf',
  },
];
