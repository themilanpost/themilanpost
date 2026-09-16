/** Shared types for paperwork and living-in-Milan glossaries. */

export interface GlossaryEntry {
  /** Italian term as used on forms and official sites */
  term: string;
  /** Short English equivalent */
  english: string;
  /** Plain-language explanation for newcomers */
  description: string;
}

export interface GlossaryCategory {
  id: string;
  title: string;
  entries: GlossaryEntry[];
}

export function allGlossaryEntries(categories: GlossaryCategory[]): GlossaryEntry[] {
  return categories
    .flatMap((c) => c.entries)
    .sort((a, b) => a.term.localeCompare(b.term, 'it'));
}
