import { apiGet } from '@web-workspace/shared/api/http-client';
import { IResponseDrmServiceInfo } from './interface';

export const DRM_QUERY_KEY = {
  DRM_SERVICE: 'drm-service',
};

const GET_DRM_SERVICE = '/api/v1/drm-common/common/drm';

export async function fetchDrmServiceInfo(): Promise<IResponseDrmServiceInfo> {
  const response = await apiGet({ url: GET_DRM_SERVICE });
  return response.data;
}
