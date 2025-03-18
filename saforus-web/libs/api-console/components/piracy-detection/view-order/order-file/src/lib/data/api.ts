import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { IPiracyDetailResponse } from '@web-workspace/api-console/components/piracy-detection/data';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

export const QUERY_KEY = {
  ORDER_DETAIL: 'PIRACY_ORDER_DETAI',
  DETECTION_RESULT: 'DETECTION_RESULT',
};
const PD_ORDERS = '/api/saforus-cs-api-pd/adm/v1/orders';
const PD_DETECTIONRESULT = 'api/saforus-cs-api-search/adm/v1/orders';

export async function getPiracyOrderDetail(
  orderId: number | string
): Promise<IPiracyDetailResponse> {
  const apiUrl = `${PD_ORDERS}/${orderId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}

export async function getDetectionResultData(watermarkCode: string) {
  const response = await apiGet({
    url: `${PD_DETECTIONRESULT}/search?filters=orderFiles.wtrOrderFiles.wtrMsg:${watermarkCode}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function retryDetection(
  orderId: string,
  fileId: string,
  origFileKey: string
): Promise<ApiResponseData> {
  const data = {
    retryFiles: [
      {
        fileId,
        origFileKey,
      },
    ],
  };
  const response = await apiPost({
    url: `${PD_ORDERS}/${orderId}/retry`,
    data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
