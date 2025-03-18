import { MOCK_CURRENT_ORDER } from './mock';
import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { IPiracyDetailResponse } from './interface';

const GET_DETAIL_PIRACY_ORDER = '/api/v1/cs-bo-web-be/pd/orders';
const POST_REQUEST_EXPERT_DETECTION = 'api/v1/mp-pd';

export async function fetchPỉacyOrderDetail(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CURRENT_ORDER);
    }, 1000);
  });
}

export async function getPiracyOrderDetail(
  orderId: number | string
): Promise<IPiracyDetailResponse> {
  const apiUrl = `${GET_DETAIL_PIRACY_ORDER}/${orderId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}

export async function postRequestPiracyDetection(
  orderId: number | string
): Promise<any> {
  const apiUrl = `${POST_REQUEST_EXPERT_DETECTION}/${orderId}/request-expert-detection`;
  const response = await apiPost({ url: apiUrl });
  return response.data;
}