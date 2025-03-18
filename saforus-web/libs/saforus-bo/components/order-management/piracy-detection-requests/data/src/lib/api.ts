import { apiGet, apiPatch } from '@web-workspace/shared/api/http-client';
import {
  RequestPiracyDetectionRequests,
  ResponsePiracyDetectionRequests,
} from './interface';
import queryString from 'query-string';

export const QUERY_KEY = {
  PIRACY_DETECTION_REQUESTS_LIST: 'piracy-view-order-list',
  PIRACY_DETECTION_REQUESTS_SERVICE_TYPE: 'piracy-service-type',
};

const GET_ORDERS = '/api/v1/cs-bo-web-be/pd/orders';
const PATH_UPDATE_EXPERT_DETECTION = '/api/v1/cs-bo-web-be/pd/orders';

export async function getRequests(
  data: Partial<RequestPiracyDetectionRequests>
): Promise<ResponsePiracyDetectionRequests> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_ORDERS}?${searchParams}`,
  });
  return response.data;
}

export async function patchExpertPiracyOrderDetail(
  orderId: number | string,
  data: any,
): Promise<any> {
  const apiUrl = `${PATH_UPDATE_EXPERT_DETECTION}/${orderId}`;
  const response = await apiPatch({ url: apiUrl, data, showToast: true });
  return response.data;
}

