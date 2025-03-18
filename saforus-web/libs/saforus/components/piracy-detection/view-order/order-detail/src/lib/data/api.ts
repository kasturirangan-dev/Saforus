import { MOCK_CURRENT_ORDER } from './mock';
import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { IPiracyDetailResponse } from './interface';

export const QUERY_KEY = {
  ORDER_DETAIL: 'PIRACY_ORDER_DETAI',
};
const GET_DETAIL_PIRACY_ORDER = '/api/v1/mp-pd/orders';
const POST_REQUEST_EXPERT_DETECTION = '/api/v1/mp-pd/orders';

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

export async function getPdAttachment({
  orderId,
  getImageinBase64,
}: {
  orderId: number | string;
  getImageinBase64?: boolean;
}) {
  const response = await apiGet({
    url: `${GET_DETAIL_PIRACY_ORDER}/attachments/${orderId}`,
    responseType: 'blob',
    timeout: 30000,
  });

  if (!response.isSuccess || !response.data.size) {
    throw new Error('Failed to get attachment');
  }

  const reader = new FileReader();
  const dataUrl = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(response.data);
  });
  return dataUrl;
}

export async function postRequestPiracyDetection(
  orderId: number | string
): Promise<any> {
  const apiUrl = `${POST_REQUEST_EXPERT_DETECTION}/${orderId}/request-expert-detection`;
  const response = await apiPost({ url: apiUrl });
  return response.data;
}
