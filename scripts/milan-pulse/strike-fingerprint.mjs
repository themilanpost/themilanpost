import { createHash } from 'crypto';

/** Stable hash of MIT feed content — skip fetch/DeepL when unchanged. */
export function strikeFeedFingerprint(strikes) {
  const payload = strikes
    .map((s) => [s.id, s.start, s.end, s.sector, s.category, s.mode, s.relevance, s.region, s.unions?.join('/')].join('|'))
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}
