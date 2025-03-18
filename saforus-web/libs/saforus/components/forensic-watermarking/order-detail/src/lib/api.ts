import { apiPost } from '@web-workspace/shared/api/http-client';
export const QUERY_KEY_ORDER_DETAIL = 'order-detail';
export interface RequestOrderDetail {
  orderId: string;
  rowCount: number;
  fromRow: number;
}

const GET_ORDER_DETAIL = '/api/v1/saforus-web-be/watermarking/order/files';
export async function fetchOrderDetail(data: RequestOrderDetail): Promise<any> {
  const response = await apiPost({ url: GET_ORDER_DETAIL, data });
  return response.data;
}
