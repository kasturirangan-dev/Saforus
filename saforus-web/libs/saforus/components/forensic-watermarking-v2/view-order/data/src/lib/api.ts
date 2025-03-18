import {
  apiDelete,
  apiGet,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ResponseWatermarkingViewOrder } from './interface';
import { BaseResponseData } from '@web-workspace/saforus/common/model';

export const QUERY_KEY = {
  FORENSIC_VIEW_ORDER_LIST: 'forensic-view-order-list',
};

const GET_ORDERS = '/api/v1/saforus-web-be/watermarking/orders';
const DOWNLOAD_FILES = '/api/v1/saforus-web-be/watermarking/order/files/detail';

export async function getOrders(
  data: any
): Promise<ResponseWatermarkingViewOrder> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({ url: `${GET_ORDERS}?${searchParams}` });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function fetchFileList(personOrderInfoSq: string): Promise<any> {
  const reqData = {
    personOrderInfoSq,
    fromRow: 0,
    rowCount: 10,
  };

  const response = await apiPost({
    url: DOWNLOAD_FILES,
    data: reqData,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deleteOrder(id: string): Promise<BaseResponseData> {
  const response = await apiDelete({
    url: `${GET_ORDERS}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
