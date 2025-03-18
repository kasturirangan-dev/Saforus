import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ResponseWatermarkingViewOrder } from './interface';
import {
  DateFormat,
  formatDate,
  formatTzDate,
} from '@web-workspace/shared/helpers/dates';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

export const QUERY_KEY = {
  FORENSIC_VIEW_ORDER_LIST: 'forensic-view-order-list',
  FORENSIC_SERVICE_TYPES: 'forensic-service-types',
  FORENSIC_FORMAT: 'forensic-format',
  FORENSIC_STATUS: 'forensic-status',
  FORENSIC_CONTENT_TYPE: 'forensic-content-type',
};

const GET_ORDERS = '/api/v1/saforus-web-be/watermarking/orders';
const CREATE_SITE = '/api/v1/saforus-web-be/createSite';

// export async function fetchOrders(data: any): Promise<unknown[]> {
//   const response = await apiPost({ url: GET_ORDERS, data });
//   //TODO: pass table error
//   return response.data;
// }

export async function getOrders(
  data: any
): Promise<ResponseWatermarkingViewOrder> {
  const tzOffset = getMinuteOffset();
  const formattedData = Object.assign({}, data, {
    startDate:
      data.startDate instanceof Date
        ? formatTzDate(data.startDate, tzOffset)
        : data.startDate,
    endDate:
      data.endDate instanceof Date
        ? formatTzDate(data.endDate, tzOffset, false)
        : data.endDate,
  });

  const searchParams = queryString.stringify(formattedData);
  const response = await apiGet({ url: `${GET_ORDERS}?${searchParams}` });
  //TODO: pass table error
  return response.data;
}

export async function search(newSite: Partial<unknown>): Promise<unknown> {
  const response = await apiPost({ url: CREATE_SITE, data: newSite });
  return response.data;
}
