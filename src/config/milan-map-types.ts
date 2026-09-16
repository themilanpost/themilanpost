/** Shared types for Milan maps hub (embedded + external). */

export type MilanMapKind = 'embedded' | 'google-collection' | 'external';

export interface MilanMapResource {
  id: string;
  category: string;
  title: string;
  description: string;
  source: string;
  href?: string;
  kind: MilanMapKind;
}

export const milanMapCategories = [
  'Water',
  'Transport',
  'Driving & zones',
  'Health',
  'Waste & recycling',
  'Markets & shopping',
  'Digital & services',
  'Sport & parks',
  'Culture',
] as const;
