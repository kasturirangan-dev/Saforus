import { apiPost } from '@web-workspace/shared/api/http-client';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { PiracyCreateForm } from './interface';
import { FileType } from '@web-workspace/saforus/common/model';

const piracyApi = getEnvVar('VITE_API_URL');

export async function createOrder(
  data: PiracyCreateForm,
  file: FileType
): Promise<string> {
  if (!file) {
    return '';
  }
  const formData = new FormData();
  formData.append('file', file.file);
  formData.append('watermarkingOrderNo', data.watermarkingOrderNo);
  formData.append('contentType', data.contentType);
  formData.append('watermarkingOrderInfoId', data.watermarkingOrderInfoSq);
  formData.append('teamId', data.teamId);
  formData.append('autoDetection', data.autoDetection.toString());
  // formData.append('orderId', data.orderId);
  formData.append('orderNo', `${data.orderId}`);
  // formData.append('title', data.title);
  formData.append('title', file.file.name);
  const response = await apiPost({
    url: `${piracyApi}/api/v1/mp-pd/orders`,
    data: formData,
    timeout: 10 * 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function SearchFile(file: FileType): Promise<any> {
  if (!file) {
    return '';
  }
  const formData = new FormData();
  formData.append('file', file.file);

  const response = await apiPost({
    url: '/api/cs-img-search/saforus-web/v1/files/upload',
    data: formData,
    timeout: 60 * 1000, // 60 seconds
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
