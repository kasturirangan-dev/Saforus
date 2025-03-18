import {
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ResponseWatermarkingOrders } from './interface';

export const QUERY_KEY = {
  WATERMARKING_ORDERS_ORDER_LIST: 'watermarking-orders-order-list',
  WATERMARKING_ORDERS_SERVICE_TYPES: 'watermarking-orders-service-types',
  WATERMARKING_ORDERS_REQUESTERS: 'watermarking-orders_requesters',
  WATERMARKING_ORDERS_STATUS: 'watermarking-orders-status',
  WATERMARKING_ORDERS_CONTENT_TYPE: 'watermarking-orders-content-type',
  WATERMARKING_ORDERS_FORMAT: 'watermarking-orders-format',
};

const GET_ORDERS = '/api/v1/cs-bo-web-be/watermarking/orders';
const GET_SERVICE_TYPE = '/api/v1/cs-bo-web-be/watermarking/servicetype';
const GET_REQUESTER = '/api/v1/cs-bo-web-be/watermarking/requester';
const GET_REQUEST_STATUS = '/api/v1/cs-bo-web-be/watermarking/requeststatus';
const GET_FORMAT = '/api/v1/cs-bo-web-be/watermarking/format';
const GET_CONTENT_TYPE = '/api/v1/cs-bo-web-be/watermarking/contenttype';
const CHANGE_EXPIRED_DATE = '/api/v1/cs-bo-web-be/watermarking/orders/files';

export async function getOrders(
  data: any
): Promise<ResponseWatermarkingOrders> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_ORDERS}?${searchParams}`,
  });
  //TODO: pass table error
  return response.data;
}

export async function changeExpiredDate(
  expDt: string,
  personOrderInfoSq: string
) {
  const response = await apiPatch({
    url: `${CHANGE_EXPIRED_DATE}/${personOrderInfoSq}`,
    data: {
      expDt: expDt,
    },
  });
  if (response.isSuccess) {
    return response.data;
  }
  throw response.data;
}
