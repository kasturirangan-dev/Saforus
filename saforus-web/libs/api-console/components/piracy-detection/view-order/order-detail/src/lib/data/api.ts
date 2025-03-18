import { apiGet } from '@web-workspace/shared/api/http-client';
import { IPiracyDetailResponse } from '@web-workspace/api-console/components/piracy-detection/data';

export const QUERY_KEY = {
  ORDER_DETAIL: 'PIRACY_ORDER_DETAI',
};
const PD_ORDERS = '/api/saforus-cs-api-pd/adm/v1/orders';

export async function getPiracyOrderDetail(
  orderId: number | string
): Promise<IPiracyDetailResponse> {
  const apiUrl = `${PD_ORDERS}/${orderId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}
