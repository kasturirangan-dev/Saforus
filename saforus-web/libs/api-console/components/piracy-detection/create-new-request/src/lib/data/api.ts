import {
  CreateOrderFile,
  PiracyCreateRequest,
  PiracyCreateResponse,
} from '@web-workspace/api-console/components/piracy-detection/data';
import { apiPost, prependBaseUrl } from '@web-workspace/shared/api/http-client';

const PD_ORDERS = '/api/saforus-cs-api-pd/adm/v1/orders';

export async function createOrder(
  data: PiracyCreateRequest
): Promise<PiracyCreateResponse> {
  const response = await apiPost({
    url: PD_ORDERS,
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
        'x-amz-meta-markany-file-type': data.fileType,
        'x-amz-meta-markany-file-id': data.id,
        // 'x-amz-meta-markany-orig-file-key': data.origFileKey,
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
