import { apiPost } from '@web-workspace/shared/api/http-client';
import { RequestDownloadFile } from './interface';
export const QUERY_KEY_DOWNLOAD_FILES = 'download-files';

const DOWNLOAD_FILES = '/api/v1/cs-bo-web-be/watermarking/order/files/detail';
export async function fetchFileList(data: RequestDownloadFile): Promise<any> {
  const response = await apiPost({ url: DOWNLOAD_FILES, data });
  return response.data;
}
