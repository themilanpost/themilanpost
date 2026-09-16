/**
 * Vintage hit counter API for The Milan Post (GitHub Pages).
 * GET ?action=hit | get  →  { count, display }
 */

const COUNT_KEY = 'total';

const ALLOWED_ORIGINS = new Set([
  'https://www.themilanpost.it',
  'https://themilanpost.it',
  'https://themilanpost.github.io',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
]);

/** @param {string | null | undefined} raw */
function parseCount(raw) {
  const n = Number.parseInt(raw ?? '0', 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** @param {number} count @param {number} minLength */
function padCount(count, minLength = 6) {
  return String(count).padStart(minLength, '0');
}

/** @param {string | null} origin */
function corsHeaders(origin) {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://www.themilanpost.it';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

/** @param {any} data @param {number} status @param {string | null} origin */
function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...corsHeaders(origin),
    },
  });
}

export default {
  /** @param {Request} request @param {{ HITS: KVNamespace }} env */
  async fetch(request, env) {
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ error: 'method_not_allowed' }, 405, origin);
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action') === 'get' ? 'get' : 'hit';

    try {
      let count = parseCount(await env.HITS.get(COUNT_KEY));

      if (action === 'hit') {
        count += 1;
        await env.HITS.put(COUNT_KEY, String(count));
      }

      const minLength = Math.max(6, String(count).length);
      const display = padCount(count, minLength);

      return jsonResponse({ count, display }, 200, origin);
    } catch (error) {
      console.error('hit-counter error', error);
      return jsonResponse({ count: null, display: '------', error: true }, 503, origin);
    }
  },
};
