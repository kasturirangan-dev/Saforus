import {
  CreateOrderFile,
  WatermarkingRequest,
} from '@web-workspace/api-console/components/watermarking/data';
import { apiPost, prependBaseUrl } from '@web-workspace/shared/api/http-client';

const WTR_ORDERS = '/api/saforus-cs-api-wtr/adm/v1/orders';
export async function createOrder(data: WatermarkingRequest): Promise<any> {
  const response = await apiPost({
    url: WTR_ORDERS,
    data: data,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function uploadFile(
  data: CreateOrderFile,
  file: File
): Promise<any> {
  try {
    const response = await fetch(prependBaseUrl(data.uploadUrl), {
      method: 'PUT',
      headers: {
        // 'x-amz-meta-markany-file-type': data.fileType,
        'x-amz-meta-markany-file-id': data.id,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
