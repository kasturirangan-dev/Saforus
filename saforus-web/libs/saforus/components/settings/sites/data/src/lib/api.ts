import { ServiceRegion, Site, SiteStorage } from './interface';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  Response,
} from '@web-workspace/shared/api/http-client';

export const QUERY_KEY = {
  SITES_LIST: 'sites',
  SERVICE_REGIONS: 'service-regions',
};

const siteEndpoint = '/api/v1/saforus-web-be/site';
const storageEndpoint = '/api/v1/saforus-web-be/storage';

export async function fetchSites(): Promise<Site[]> {
  const response = await apiGet({ url: siteEndpoint, showToast: true });
  return response.data;
}

export async function createSites(newSite: Partial<Site>): Promise<Site> {
  const response = await apiPost({
    url: siteEndpoint,
    data: newSite,
    showToast: true,
  });
  return response.data;
}

export async function updateSite(data: Partial<Site>): Promise<Site> {
  const response = await apiPut({ url: siteEndpoint, data, showToast: true });
  return response.data;
}

export async function deleteSite(siteId: number): Promise<boolean> {
  const response = await apiDelete({
    url: `${siteEndpoint}/${siteId}`,
    showToast: true,
  });
  return response.isSuccess;
}

export async function createStorage(
  data: Partial<SiteStorage>
): Promise<Response<SiteStorage>> {
  const response = await apiPost({
    url: storageEndpoint,
    data,
    showToast: true,
  });
  return response;
}

export async function updateStorage(
  data: Partial<SiteStorage>
): Promise<SiteStorage | null> {
  const response = await apiPut({
    url: storageEndpoint,
    data,
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  }
  return null;
}

export async function deleteStorage(storageId: number): Promise<boolean> {
  const response = await apiDelete({
    url: `${storageEndpoint}/${storageId}`,
    showToast: true,
  });
  return response.isSuccess;
}

export async function fetchServiceRegions(): Promise<ServiceRegion[]> {
  const response = await apiGet({
    url: `${siteEndpoint}/region`,
    showToast: true,
  });
  return response.data;
}
