import { apiPost, downloadFile } from '@web-workspace/shared/api/http-client';
import {
  RequestDownloadFile,
  RequestShareFile,
  RequestSharedHistory,
} from './interface';
export const QUERY_KEY_DOWNLOAD_FILES = 'download-files';

const DOWNLOAD_FILES = '/api/v1/saforus-web-be/watermarking/order/files/detail';
const SHARE_FILE = '/api/v1/saforus-web-be/watermarking/orders/files/share';
const SHARE_FILE_HISTORY =
  '/api/v1/saforus-web-be/watermarking/orders/shared-file-histories';

export async function fetchFileList(data: RequestDownloadFile): Promise<any> {
  const response = await apiPost({ url: DOWNLOAD_FILES, data });
  return response.data;
}

export async function shareFile(data: RequestShareFile): Promise<any> {
  const response = await apiPost({ url: SHARE_FILE, data });
  return response.data;
}

export async function getSharedHistory(
  data: RequestSharedHistory
): Promise<any> {
  await downloadFile({
    fileUrl: `${SHARE_FILE_HISTORY}?personOrderInfoSq=${data?.personOrderInfoSq}&teamId=${data?.teamId}`,
    fileName: 'shared-history',
  });
}
