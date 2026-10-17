/**
 * Batch-translate strike fields via DeepL (official deepl-node).
 * Reuses existing `en` when Italian source text is unchanged (saves quota).
 */
import * as deepl from 'deepl-node';

const FIELDS = ['sector', 'category', 'mode', 'relevance', 'region'];
const BATCH_SIZE = 40;

function reuseTranslations(strike, previous) {
  if (!previous?.en) return;
  strike.en = {};
  for (const field of FIELDS) {
    if (previous[field] === strike[field] && previous.en[field]) {
      strike.en[field] = previous.en[field];
    }
  }
}

export async function translateStrikes(strikes, previousById = new Map()) {
  const authKey = process.env.DEEPL_AUTH_KEY;
  if (!authKey) {
    return { engine: null, reason: 'DEEPL_AUTH_KEY not set', skipped: 0, translated: 0 };
  }

  const targets = strikes.filter((s) => s.milanRelevant);
  if (!targets.length) return { engine: 'deepl', count: 0, skipped: 0, translated: 0 };

  const textList = [];
  const textIndex = new Map();
  const jobs = [];
  let skipped = 0;

  for (const strike of targets) {
    reuseTranslations(strike, previousById.get(strike.id));

    for (const field of FIELDS) {
      const text = strike[field]?.trim();
      if (!text) continue;
      if (strike.en?.[field]) {
        skipped += 1;
        continue;
      }
      if (!textIndex.has(text)) {
        textIndex.set(text, textList.length);
        textList.push(text);
      }
      jobs.push({ strike, field, idx: textIndex.get(text) });
    }
  }

  if (!textList.length) {
    return { engine: 'deepl', count: targets.length, skipped, translated: 0, chars: 0 };
  }

  try {
    const client = new deepl.DeepLClient(authKey);
    const translated = [];

    for (let i = 0; i < textList.length; i += BATCH_SIZE) {
      const chunk = textList.slice(i, i + BATCH_SIZE);
      const results = await client.translateText(chunk, 'it', 'en-GB');
      translated.push(...results.map((r) => r.text));
    }

    for (const { strike, field, idx } of jobs) {
      strike.en ||= {};
      strike.en[field] = translated[idx];
    }

    const chars = textList.reduce((n, s) => n + s.length, 0);
    return {
      engine: 'deepl',
      count: targets.length,
      uniqueStrings: textList.length,
      chars,
      skipped,
      translated: textList.length,
    };
  } catch (err) {
    return { engine: null, reason: err.message, skipped, translated: 0 };
  }
}
