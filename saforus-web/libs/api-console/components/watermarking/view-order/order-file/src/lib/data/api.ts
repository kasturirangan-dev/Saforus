import { saveAs } from 'file-saver';
import { apiGet } from '@web-workspace/shared/api/http-client';
import { IWtrDetailResponse } from '@web-workspace/api-console/components/watermarking/data';
import JSZip from 'jszip';
import { prependBaseUrl } from '@web-workspace/shared/api/http-client';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

export const QUERY_KEY = {
  ORDER_DETAIL: 'PIRACY_ORDER_DETAI',
};
const WTR_ORDERS = '/api/saforus-cs-api-wtr/adm/v1/orders';

export async function getWtrOrderDetail(
  orderId: number | string
): Promise<IWtrDetailResponse> {
  const apiUrl = `${WTR_ORDERS}/${orderId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}

export interface selectedFiles {
  id: string;
  fileUrlDownload: string;
  fileName: string;
}

export async function handleDownloadZip(
  selectedFiles: selectedFiles[],
  fileZipName: string
) {
  const zip = new JSZip();
  const fetchFileStatus: boolean[] = [];
  const fetchPromises = selectedFiles.map(async (file) => {
    if (file) {
      return await await fetch(prependBaseUrl(file.fileUrlDownload))
        .then((response) => {
          if (response.status === 200) {
            fetchFileStatus.push(true);
            return response.blob();
          }
          showToast.error('Error downloading the file');
          fetchFileStatus.push(false);
          return null;
        })
        .then((blob) => {
          if (blob !== null && blob !== undefined) {
            zip.file(file.fileName, blob);
          }
        })
        .catch((error) => {
          showToast.error('Error downloading the file');
        });
    }
    return null;
  });

  return Promise.all(fetchPromises)
    .then(() => {
      if (fetchFileStatus.length > 0 && fetchFileStatus.includes(true)) {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          if (content !== null && content !== undefined) {
            saveAs(content, `${fileZipName}.zip`);
          }
        });
      }
    })
    .catch((error) => {
      console.error('Failed to fetch files:', error);
    });
}

export async function handleDownloadFile(file: selectedFiles) {
  return await fetch(prependBaseUrl(file.fileUrlDownload))
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      }
      showToast.error('Error downloading the file');
      return null;
    })
    .then((blob) => {
      if (blob) saveAs(blob, file.fileName);
    })
    .catch((error) => {
      showToast.error('Error downloading the file');
    });
}
