import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { DownloadFileResponse } from '../interface';
import { fetchFileList, QUERY_KEY_DOWNLOAD_FILES } from '../api';
import DownloadFileStore from '../store';

export function useDownloadFileData() {
  const {
    requestQuery,
    files,
    selectedFiles,
    setFiles,
    total,
    previewImageUrl,
  } = useSnapshot(DownloadFileStore);
  const {
    isLoading,
    isError,
    data,
    refetch: refetchFiles,
  } = useQuery<unknown, Error, DownloadFileResponse>({
    queryKey: [QUERY_KEY_DOWNLOAD_FILES, ...Object.values(requestQuery)],
    queryFn: async () => {
      if (requestQuery.personOrderInfoSq) {
        return fetchFileList(requestQuery);
      }
      return null;
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setFiles(data);
    }
    if (isError) {
      setFiles({ data: [], total: 0 });
    }
    DownloadFileStore.isLoading = isLoading;
  }, [isLoading, data, isError]);

  return {
    files: [...files],
    refetchFiles,
    total,
    isLoading,
    previewImageUrl,
    selectedFiles: [...selectedFiles],
  };
}
