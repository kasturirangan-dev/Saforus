import axiosInstance from './index';

const getFilenameFromContentDisposition = (header: string | null): string => {
  if (!header) return 'unknown_filename';

  const matches = header.match(/filename="?([^;]*)"?;/);
  return matches && matches[1] ? matches[1] : 'unknown_filename';
};

const downloadFile = async ({
  fileUrl,
  fileName,
}: DownloadFileParams): Promise<void> => {
  try {
    const response = await axiosInstance.get<Blob>(fileUrl, {
      responseType: 'blob', // Set the response type to 'blob' or 'arraybuffer'
    });

    // Get the filename from the Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    const filename =
      fileName || getFilenameFromContentDisposition(contentDisposition);

    // Create a download link and trigger the download
    const downloadUrl = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

interface DownloadFileParams {
  fileUrl: string;
  fileName?: string;
}

// Usage example
// downloadFile(apiUrl).then();

export default downloadFile;
