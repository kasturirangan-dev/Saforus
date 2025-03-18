import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { IOrderFile } from './interface';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export const QUERY_KEY = {
  ORDER_DETAIL: 'ORDER_DETAI',
};

const GET_ORDER_FILES = '/api/v1/saforus-web-be/watermarking/order/files';
const mainURL = getEnvVar('VITE_MAIN_URL');

export async function getOrderFileList(orderId: string): Promise<IOrderFile[]> {
  const response = await apiGet({ url: `${GET_ORDER_FILES}/${orderId}` });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function createWatermark(data: any): Promise<any> {
  const formData = new FormData();

  const files = Array.from(data.psnFileArr) as File[];
  files.forEach((file) => {
    formData.append('psnFileArr', file);
  });

  formData.append('token', data.token);
  formData.append('userName', data.userName);
  formData.append('psnOrderId', data.psnOrderId);
  formData.append('psnFileCnt', data.psnFileCnt);
  formData.append('psnFileMediaCd', data.psnFileMediaCd);
  formData.append('psnFwmTpCd', data.psnFwmTpCd);
  formData.append('psnDrmTpCd', data.psnDrmTpCd);
  formData.append('psnStartNum', data.psnStartNum);
  formData.append('psnEndNum', data.psnEndNum);
  formData.append('psnGpuYn', data.psnGpuYn);
  formData.append('title', data.title);
  formData.append('psnDescriptionsJson', data.psnDescriptionsJson);
  formData.append('userId', data.userId);
  formData.append('teamId', data.teamId);

  const response = await apiPost({
    url: `${mainURL}/psn/orderfile`,
    data: formData,
    timeout: 10 * 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
