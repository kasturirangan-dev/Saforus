import { apiDelete, apiGet } from '@web-workspace/shared/api/http-client';
import { RequestPiracyOrder, ResponsePiracyOrder } from './interface';
import queryString from 'query-string';

export const QUERY_KEY = {
  PIRACY_VIEW_ORDER_LIST: 'piracy-view-order-list',
};

const ORDERS = '/api/v1/mp-pd/orders';

export async function getPdOrders(
  data: Partial<RequestPiracyOrder>
): Promise<ResponsePiracyOrder> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${ORDERS}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deletePdOrder(
  id: string
): Promise<ResponsePiracyOrder | null> {
  const response = await apiDelete({
    url: `${ORDERS}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
