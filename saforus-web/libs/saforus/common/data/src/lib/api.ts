import { apiGet } from '@web-workspace/shared/api/http-client';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';

const GET_SERVICE_TYPE = '/api/v1/saforus-web-be/watermarking/servicetype';
const GET_REQUEST_STATUS = '/api/v1/saforus-web-be/watermarking/requeststatus';
const GET_FORMAT = '/api/v1/saforus-web-be/watermarking/format';
const GET_CONTENT_TYPE = '/api/v1/saforus-web-be/watermarking/contenttype';
const GET_META_DATA = 'api/v1/saforus-web-be/open-api/config/homes/metadata';

export const QUERY_COMMON_KEY = {
  WATERMARKING_ORDERS_ORDER_LIST: 'watermarking-orders-order-list',
  WATERMARKING_ORDERS_SERVICE_TYPES: 'watermarking-orders-service-types',
  WATERMARKING_ORDERS_REQUESTERS: 'watermarking-orders_requesters',
  WATERMARKING_ORDERS_STATUS: 'watermarking-orders-status',
  WATERMARKING_ORDERS_CONTENT_TYPE: 'watermarking-orders-content-type',
  WATERMARKING_ORDERS_FORMAT: 'watermarking-orders-format',
  META_DATA: 'meta-data',
};


export async function fetchServiceTypes(): Promise<unknown[]> {
  const response = await apiGet({ url: GET_SERVICE_TYPE });
  return response.data;
}

export async function fetchFormats(): Promise<unknown[]> {
  const response = await apiGet({ url: GET_FORMAT });
  return response.data;
}

export async function fetchStatus(): Promise<unknown[]> {
  const response = await apiGet({ url: GET_REQUEST_STATUS });
  return response.data;
}

export async function fetchContentTypes(): Promise<unknown[]> {
  const response = await apiGet({ url: GET_CONTENT_TYPE });
  return response.data;
}

export async function getMetaData(lang: string): Promise<any> {
  let langStr = 'en';
  if (isNotEmpty(lang)) {
    langStr = lang;
  }
  const response = await apiGet({ url: `${GET_META_DATA}?lang=${langStr}` });
  return response.data;
}