import { apiDelete, apiGet } from '@web-workspace/shared/api/http-client';
import { ViewOrderQuery, ViewOrderResponse } from './interface';
import queryString from 'query-string';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

export const QUERY_KEY = {
  VIEW_ORDER_LIST: 'VIEW_ORDER_LIST',
};

const ORDERS_SEARCH = '/api/saforus-cs-api-search/adm/v1/orders/search';
const WTR_ORDERS = '/api/saforus-cs-api-wtr/adm/v1/orders';
const PD_ORDERS = '/api/saforus-cs-api-pd/adm/v1/orders';

function esQueryParam(filters: object) {
  const esQuery = Object.entries(filters)
    .filter(([_, value]) => value && value !== 'ALL')
    .map(([key, value]) => `${key}:${value}`)
    .join(',');
  return encodeURIComponent(esQuery);
}

export async function getOrders(
  data: Partial<ViewOrderQuery>
): Promise<ViewOrderResponse | null> {
  const filters = {
    orderType: data.orderType,
    createdAt: `${data.startDate} ${data.endDate}`,
    status: data.status,
    'orderFiles.fileFormat': data.format,
    channel: data.channel,
  };
  const queries = {
    keywords: data.keyword,
  };

  const searchParams = queryString.stringify({
    page: data.page,
    pageSize: data.pageSize,
    filters: esQueryParam(filters),
    queries: esQueryParam(queries),
    sorts: '-createdAt',
  });

  const response = await apiGet({
    url: `${ORDERS_SEARCH}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deleteWtrOrder(id: string): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${WTR_ORDERS}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deletePdOrder(id: string): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${PD_ORDERS}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
