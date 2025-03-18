import axiosInstance from '@web-workspace/shared/api/http-client';

const ATTACHMENT_API_URL = '/api/v1/mp-main/open-api/orders/pdfiles';

export async function downloadAttackment({
  fileId,
  orderInfoFileName,
  signal,
  setDownloadPercent,
}: {
  fileId: string;
  orderInfoFileName: string;
  signal?: AbortSignal | undefined;
  setDownloadPercent?: (percent: number) => void;
}) {
  const fileUrl = `${ATTACHMENT_API_URL}?fileId=${fileId}`;
  const fileName = orderInfoFileName;

  try {
    const response = await axiosInstance.get<Blob>(fileUrl, {
      responseType: 'blob', // Set the response type to 'blob' or 'arraybuffer',
      timeout: 0,
      signal: signal,
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        if (setDownloadPercent) {
          setDownloadPercent(Math.min(percentCompleted, 100));
        }
      },
    });
    // Create a download link and trigger the download
    const downloadUrl = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}
