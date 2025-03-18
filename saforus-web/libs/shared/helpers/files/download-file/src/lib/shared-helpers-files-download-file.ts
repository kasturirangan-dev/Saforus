import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { apiGet, prependBaseUrl } from '@web-workspace/shared/api/http-client';
import { TFunction } from 'i18next';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

const DOWNLOAD_FILE_URL = `/api/v1/mp-main/open-api/orders/files`;
const ATTACHMENT_API_URL =
  '/api/v1/saforus-web-be/watermarking/order/attachment';

export interface selectedFiles {
  fileUrlDownload: string;
  fileName: string;
  id: string;
  fileId: string;
}

export async function HandleDownloadZip(
  selectedFiles: selectedFiles[],
  fileZipName: string,
  token: string | null,
  t: TFunction
) {
  const zip = new JSZip();
  const fetchFileStatus: boolean[] = [];
  const fetchPromises = selectedFiles.map(async (file) => {
    if (file) {
      const fileName = file.fileName;
      return await fetch(`${DOWNLOAD_FILE_URL}?fileId=${file.fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            fetchFileStatus.push(true);
            return response.blob();
          }
          showToast.error(`${t('api.download-file-failed')}`, {
            delay: 0,
          });
          fetchFileStatus.push(false);
          return null;
        })
        .then((blob) => {
          if (blob !== null && blob !== undefined) {
            zip.file(fileName, blob);
          }
        })
        .catch((error) => {
          console.error(`Failed to fetch file ${fileName}:`, error);
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

export async function HandleDownloadFile(
  fileId: string,
  fileName: string,
  token?: string | null,
  t: TFunction
) {
  return await fetch(`${DOWNLOAD_FILE_URL}?fileId=${fileId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      }
      showToast.error(`${t('api.download-file-failed')}`, {
        delay: 0,
      });
      return null;
    })
    .then((blob) => {
      if (blob) saveAs(blob, fileName);
    })
    .catch((error) => {
      console.error('Error downloading the file:', error);
    });
}

export async function getAttachment({
  teamId,
  orderInfoId,
  orderInfoFileName,
  getImageinBase64,
  timeout = 30000,
}: {
  teamId?: number | null;
  orderInfoId: string;
  orderInfoFileName: string;
  getImageinBase64?: boolean;
  timeout?: number;
}) {
  const url = `${ATTACHMENT_API_URL}?teamId=${teamId}&orderInfoId=${orderInfoId}&orderInfoFileName=${orderInfoFileName}`;
  return await getAttachmentByUrl({ url, timeout });
}

export async function getAttachmentByUrl({
  url,
  timeout = 30000,
}: {
  url: string;
  timeout?: number;
}) {
  if (!url) {
    throw new Error('Invalid URL');
  }

  const response = await apiGet({
    url,
    responseType: 'blob',
    timeout,
  });

  if (!response.isSuccess || !response.data.size) {
    throw new Error('Failed to get attachment');
  }

  const reader = new FileReader();
  const dataUrl = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(response.data);
  });
  return dataUrl;
}
