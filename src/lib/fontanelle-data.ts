/** Official Comune di Milano open data, DS502 vedovelle (fontanelle). */

import { fetchComuneGeoJson } from './comune-geojson';

export const FONTANELLE_DATASET_PAGE =
  'https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano';

export const FONTANELLE_CKAN_API =
  'https://dati.comune.milano.it/api/3/action/package_show?id=ds502_fontanelle-nel-comune-di-milano';

export const CASE_DELL_ACQUA_DATASET_PAGE =
  'https://dati.comune.milano.it/dataset/ds625-case-dell-acqua-nel-comune-di-milano';

export const MM_VEDOVELLE_PAGE =
  'https://www.latuaacqua.it/wps/portal/milanoblu/it/home/acqua-di-milano/scopri/vedovelle';

export const MM_HOME_SEARCH =
  'https://www.latuaacqua.it/wps/portal/milanoblu/it/home/acqua-di-milano/tutto-su-acqua-di-milano/vedovelle';

export const COMUNE_CASE_DELL_ACQUA_PAGE =
  'https://www.comune.milano.it/servizi/ambiente-e-animali/case-dell-acqua';

export type FontanelleGeoJsonBundle = Awaited<ReturnType<typeof fetchFontanelleGeoJson>>;

export async function fetchFontanelleGeoJson() {
  return fetchComuneGeoJson('ds502_fontanelle-nel-comune-di-milano');
}
