/** Validate and build embed URLs for public Google My Maps collections. */

export interface GoogleMapsCollectionBundle {
  mapId: string;
  embedUrl: string;
  viewerUrl: string;
}

const LOGIN_MARKERS = ['You need to log in', 'only available to some users'];

export function buildGoogleMapsEmbedUrl(
  mapId: string,
  center: { lat: number; lng: number },
  zoom: number,
): string {
  const params = new URLSearchParams({
    mid: mapId,
    ll: `${center.lat},${center.lng}`,
    z: String(zoom),
    ehbc: '2E312F',
  });
  return `https://www.google.com/maps/d/embed?${params.toString()}`;
}

export function buildGoogleMapsViewerUrl(mapId: string): string {
  return `https://www.google.com/maps/d/viewer?mid=${encodeURIComponent(mapId)}`;
}

export function getGoogleMapsCollectionBundle(
  mapId: string,
  center: { lat: number; lng: number },
  zoom: number,
): GoogleMapsCollectionBundle {
  return {
    mapId,
    embedUrl: buildGoogleMapsEmbedUrl(mapId, center, zoom),
    viewerUrl: buildGoogleMapsViewerUrl(mapId),
  };
}

/** Optional network check: used only when you need to confirm a collection is still public. */
export async function validateGoogleMapsCollection(embedUrl: string): Promise<void> {
  const res = await fetch(embedUrl);
  if (!res.ok) {
    throw new Error(`Google Maps collection unavailable (${res.status})`);
  }

  const html = await res.text();
  if (LOGIN_MARKERS.some((marker) => html.includes(marker))) {
    throw new Error('Google Maps collection requires sign-in');
  }
}
