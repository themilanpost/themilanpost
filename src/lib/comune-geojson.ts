/** Fetch GeoJSON bundles from Comune di Milano CKAN open data. */

export interface ComuneGeoJsonBundle {
  geojson: GeoJSON.FeatureCollection;
  geoJsonDownloadUrl: string;
  datasetModified: string;
  featureCount: number;
}

export async function fetchComuneGeoJson(packageId: string): Promise<ComuneGeoJsonBundle> {
  const metaRes = await fetch(
    `https://dati.comune.milano.it/api/3/action/package_show?id=${encodeURIComponent(packageId)}`,
  );
  if (!metaRes.ok) {
    throw new Error(`Dataset metadata fetch failed for ${packageId} (${metaRes.status})`);
  }

  const meta = (await metaRes.json()) as {
    result: {
      metadata_modified: string;
      resources: Array<{ format: string; url: string }>;
    };
  };

  const geoResource = meta.result.resources.find((r) => r.format.toLowerCase() === 'geojson');
  if (!geoResource?.url) {
    throw new Error(`GeoJSON resource missing from ${packageId}`);
  }

  const geoRes = await fetch(geoResource.url);
  if (!geoRes.ok) {
    throw new Error(`GeoJSON fetch failed for ${packageId} (${geoRes.status})`);
  }

  const geojson = (await geoRes.json()) as GeoJSON.FeatureCollection;

  return {
    geojson,
    geoJsonDownloadUrl: geoResource.url,
    datasetModified: meta.result.metadata_modified,
    featureCount: geojson.features?.length ?? 0,
  };
}
