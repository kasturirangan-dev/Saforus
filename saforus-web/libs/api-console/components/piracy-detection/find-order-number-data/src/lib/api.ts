import { apiGet } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ViewOrderQuery, ViewOrderResponse } from './interface';

export const QUERY_KEY = {
  FORENSIC_VIEW_ORDER_LIST: 'forensic-view-order-list',
};

const ORDERS_SEARCH = '/api/saforus-cs-api-search/adm/v1/orders/search';

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
