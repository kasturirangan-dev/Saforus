import DownloadFileView from './view';
import { useDownloadFileData } from './data';

export function DownloadFileComponent() {
  const { isLoading, files, total, previewImageUrl, selectedFiles } =
    useDownloadFileData();
  return (
    <DownloadFileView
      isLoading={isLoading}
      files={files}
      total={total}
      previewImageUrl={previewImageUrl}
      selectedFiles={selectedFiles}
    />
  );
}

export default DownloadFileComponent;
