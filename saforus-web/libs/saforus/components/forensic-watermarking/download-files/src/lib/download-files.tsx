import DownloadFileView from './view';
import { useDownloadFileData } from './data';

export function DownloadFileComponent() {
  const {
    isLoading,
    files,
    refetchFiles,
    total,
    previewImageUrl,
    selectedFiles,
  } = useDownloadFileData();
  return (
    <DownloadFileView
      refetchFiles={refetchFiles}
      isLoading={isLoading}
      files={files}
      total={total}
      previewImageUrl={previewImageUrl}
      selectedFiles={selectedFiles}
    />
  );
}

export default DownloadFileComponent;
