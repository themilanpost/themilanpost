/** Places named in the celebrity Milan anecdotes guide — map markers open Google Maps. */

export interface CelebrityMilanPlace {
  id: string;
  name: string;
  blurb: string;
  celeb: string;
  lat: number;
  lng: number;
  /** Query used when opening Google Maps (place search). */
  mapsQuery: string;
  address?: string;
}

export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const celebrityMilanPlaces: CelebrityMilanPlace[] = [
  {
    id: 'verso',
    name: 'Libreria Verso',
    blurb: 'Dua Lipa’s cozy Milan bookstore pick (Vogue Italia, 2026).',
    celeb: 'Dua Lipa',
    lat: 45.4572267,
    lng: 9.1808275,
    mapsQuery: 'Libreria Verso, Corso di Porta Ticinese 40, Milano',
    address: 'Corso di Porta Ticinese 40',
  },
  {
    id: 'paradiso',
    name: 'Bar Paradiso',
    blurb: 'Her Milan aperitivo stop — natural wines, Porta Romana.',
    celeb: 'Dua Lipa',
    lat: 45.4523507,
    lng: 9.2089029,
    mapsQuery: 'Bar Paradiso, Via Gerolamo Tiraboschi, Milano',
    address: 'Via Gerolamo Tiraboschi 4',
  },
  {
    id: 'scala',
    name: 'Teatro alla Scala',
    blurb: 'Callas scandals, Chaplin’s box, Dua Lipa still dying to go.',
    celeb: 'Callas / Chaplin / Dua Lipa',
    lat: 45.4676041,
    lng: 9.1891136,
    mapsQuery: 'Teatro alla Scala, Milano',
    address: 'Piazza della Scala',
  },
  {
    id: 'verso-gesu',
    name: 'Palazzo Versace (Via Gesù)',
    blurb: 'Gaga’s 40,000 roses; Elton’s “nectar” risotto dinners with Gianni.',
    celeb: 'Lady Gaga / Elton John',
    lat: 45.4699264,
    lng: 9.1959898,
    mapsQuery: 'Via Gesù 12, Milano',
    address: 'Via Gesù 12',
  },
  {
    id: 'callas-home',
    name: 'Via Buonarroti 38',
    blurb: 'Callas’s Milan home in the 1950s, near Santa Maria delle Grazie.',
    celeb: 'Maria Callas',
    lat: 45.4715335,
    lng: 9.1557358,
    mapsQuery: 'Via Michelangelo Buonarroti 38, Milano',
    address: 'Via Michelangelo Buonarroti 38',
  },
  {
    id: 'parigi',
    name: 'Palazzo Parigi',
    blurb: 'Devil Wears Prada 2 lobby: martinis between takes.',
    celeb: 'Justin Theroux / Stanley Tucci',
    lat: 45.4733994,
    lng: 9.1911115,
    mapsQuery: 'Palazzo Parigi Hotel, Corso di Porta Nuova 1, Milano',
    address: 'Corso di Porta Nuova 1',
  },
  {
    id: 'brera',
    name: 'Accademia di Brera',
    blurb: 'Lady Gaga’s Prada 2 cameo moved here from the Duomo to stay secret.',
    celeb: 'Lady Gaga',
    lat: 45.4722421,
    lng: 9.1884071,
    mapsQuery: 'Accademia di Belle Arti di Brera, Via Brera 28, Milano',
    address: 'Via Brera 28',
  },
  {
    id: 'assago',
    name: 'Forum di Assago',
    blurb: 'Madonna + Donatella on stage scoring dancers to Vogue.',
    celeb: 'Madonna / Donatella Versace',
    lat: 45.4015471,
    lng: 9.1424748,
    mapsQuery: 'Forum di Assago, Milano',
  },
  {
    id: 'castello',
    name: 'Castello Sforzesco',
    blurb: 'City tribute gala for Charlie Chaplin, February 1972.',
    celeb: 'Charlie Chaplin',
    lat: 45.4703009,
    lng: 9.1780912,
    mapsQuery: 'Castello Sforzesco, Milano',
  },
  {
    id: 'centrale',
    name: 'Milano Centrale',
    blurb: 'Beatles arrival, June 1965 — then crushed into one Alfa Spider.',
    celeb: 'The Beatles',
    lat: 45.4858786,
    lng: 9.2042617,
    mapsQuery: 'Milano Centrale, Piazza Duca d\'Aosta, Milano',
  },
  {
    id: 'hotel-duomo',
    name: 'Grand Hotel Duomo (historic)',
    blurb: 'Press conference + terrace photos with Duomo spires behind them.',
    celeb: 'The Beatles',
    lat: 45.4649401,
    lng: 9.1912584,
    mapsQuery: 'Via San Raffaele 1, Milano',
    address: 'Via San Raffaele (historic hotel)',
  },
  {
    id: 'vigorelli',
    name: 'Velodromo Vigorelli',
    blurb: 'Two Beatles concerts on 24 June 1965 — their only Italian tour.',
    celeb: 'The Beatles',
    lat: 45.4814619,
    lng: 9.1580765,
    mapsQuery: 'Velodromo Maspes-Vigorelli, Milano',
  },
];
