import { apiGet } from '@web-workspace/shared/api/http-client';
import { IWtrDetailResponse } from '@web-workspace/api-console/components/watermarking/data';

export const QUERY_KEY = {
  ORDER_DETAIL: 'PIRACY_ORDER_DETAI',
};
const WTR_ORDERS = '/api/saforus-cs-api-wtr/adm/v1/orders';

export async function getWtrOrderDetail(
  orderId: number | string
): Promise<IWtrDetailResponse> {
  const apiUrl = `${WTR_ORDERS}/${orderId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}
