const DOWNLOAD_SHARED_FILE =
  '/api/v1/saforus-web-be/papi/watermarking/shared-files';

export async function downloadSharedFile(token: string): Promise<any> {
  const response = await fetch(`${DOWNLOAD_SHARED_FILE}?token=${token}`);

  const blob = await response.blob();

  if (response.ok) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    let fileName = 'unknown';

    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch && fileNameMatch.length === 2) {
        const encodeFileName = fileNameMatch[1].replace(/\+/g, '%20');
        fileName = decodeURIComponent(encodeFileName);
      }
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    // Clean-up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    window.close();
  } else {
    const text = await blob.text();
    return JSON.parse(text);
  }
}
