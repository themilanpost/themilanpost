/** Public Google My Maps collections for Milan, validated at build time. */

import type { MilanMapResource } from './milan-map-types';

export interface MilanGoogleCollectionConfig extends MilanMapResource {
  kind: 'google-collection';
  /** Google My Maps `mid` parameter. */
  mapId: string;
  center: { lat: number; lng: number };
  zoom: number;
}

export const milanGoogleCollections: MilanGoogleCollectionConfig[] = [
  {
    id: 'outdoor-sport',
    category: 'Sport & parks',
    title: 'Milano palestra a cielo aperto',
    description:
      'Comune map of 320+ outdoor sport spots, basketball courts, football pitches, running tracks, skateparks, and fitness areas. Published 2014; for the latest list see the Fascicolo del Cittadino app (Sport category).',
    source: 'Comune di Milano: Assessorato Sport',
    kind: 'google-collection',
    mapId: '1EkImtRwEIt1aCizwe9FVPPwv0x8',
    center: { lat: 45.4642, lng: 9.19 },
    zoom: 11,
    href: 'https://www.google.com/maps/d/viewer?mid=1EkImtRwEIt1aCizwe9FVPPwv0x8',
  },
  {
    id: 'mappa-letteraria-vol1',
    category: 'Culture',
    title: 'Mappa Letteraria Milano: Vol. I (until 1999)',
    description:
      'Literary citations mapped across Milan and the metropolitan area, fiction, essays, and poetry up to 1999. Curated by Quarto Paesaggio on Google My Maps.',
    source: 'Quarto Paesaggio',
    kind: 'google-collection',
    mapId: '1y58NHs3MGmEDwNYTIi865j9wHXJ9O8o',
    center: { lat: 45.4642, lng: 9.19 },
    zoom: 12,
    href: 'https://www.google.com/maps/d/viewer?mid=1y58NHs3MGmEDwNYTIi865j9wHXJ9O8o',
  },
  {
    id: 'mappa-letteraria-vol2',
    category: 'Culture',
    title: 'Mappa Letteraria Milano: Vol. II (from 2000)',
    description:
      'Second volume of the literary map: books published from 2000 onward, with the same pin-and-citation format as Vol. I.',
    source: 'Quarto Paesaggio',
    kind: 'google-collection',
    mapId: '1fxDXsBA2aoZpBaRn1--EJfDj0EM3-c4',
    center: { lat: 45.4642, lng: 9.19 },
    zoom: 12,
    href: 'https://www.google.com/maps/d/viewer?mid=1fxDXsBA2aoZpBaRn1--EJfDj0EM3-c4',
  },
];
