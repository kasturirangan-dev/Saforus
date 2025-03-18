import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  DownloadFileResponse,
  FileInfo,
  RequestDownloadFile,
  SelectedFiles,
} from './interface';
import { unionBy, cloneDeep, filter, includes } from 'lodash-es';

interface DownloadFileStoreType {
  files: FileInfo[] | null;
  total: number;
  selectedFiles: SelectedFiles[];
  requestQuery: RequestDownloadFile;
  setFiles: (data: DownloadFileResponse) => Promise<void>;
  setSelectedFiles: (fileList: SelectedFiles[], idList: string[]) => void;
  setRequestQuery: (query: Partial<RequestDownloadFile>) => void;
  onReset: () => void;
}

function downloadFileStore() {
  const store: DownloadFileStoreType = {
    files: [],
    total: 0,
    selectedFiles: [],

    requestQuery: {
      personOrderInfoSq: '',
      fromRow: 0,
      rowCount: 10,
    },

    setFiles: async (response: any) => {
      DownloadFileStore.files =
        response && response.data && response.data.length > 0
          ? response.data.map((el: any, index: number) => {
              return {
                ...el,
                fileId: el.id,
                id: `${response.fromRow}_${index}`,
              };
            })
          : [];

      // if (DownloadFileStore.selectedFiles.length > 0) {
      //   // Update downloadCount and sharedEmail for selectedFiles based on fileId
      //   DownloadFileStore.selectedFiles = DownloadFileStore.selectedFiles.map(
      //     (selectedFile: SelectedFiles) => {
      //       const matchingFile = DownloadFileStore.files?.find(
      //         (file: FileInfo) => file.fileId === selectedFile.fileId
      //       );
      //       if (matchingFile) {
      //         selectedFile.downloadCount = matchingFile.downloadCount;
      //         selectedFile.sharedEmail = matchingFile.sharedEmail;
      //       }
      //       return selectedFile;
      //     }
      //   );
      //   // Remove selectedFiles that are invalid
      //   DownloadFileStore.selectedFiles =
      //     DownloadFileStore.selectedFiles.filter(
      //       (selectedFile: SelectedFiles) =>
      //         !selectedFile.sharedEmail && selectedFile.downloadCount < 3
      //     );
      // }

      if (response.total !== DownloadFileStore.total) {
        DownloadFileStore.total = response.total;
      }
    },

    setRequestQuery: (query: Partial<RequestDownloadFile>) => {
      DownloadFileStore.requestQuery = {
        ...DownloadFileStore.requestQuery,
        ...query,
      };
    },

    setSelectedFiles: (fileList: SelectedFiles[], idList: string[]) => {
      const selectedFiles = cloneDeep([...DownloadFileStore.selectedFiles]);
      const filteredListAfterUpdate = filter(
        unionBy(selectedFiles, fileList, 'id'),
        (item) => includes(idList, item.id)
      );
      DownloadFileStore.selectedFiles = filteredListAfterUpdate;
    },

    onReset: () => {
      DownloadFileStore.files = [];
      DownloadFileStore.total = 0;
      DownloadFileStore.selectedFiles = [];
      DownloadFileStore.requestQuery = {
        personOrderInfoSq: '',
        fromRow: 0,
        rowCount: 10,
      };
    },
  };
  return store;
}

const DownloadFileStore = proxy<DownloadFileStoreType>(downloadFileStore());
devtools(DownloadFileStore, {
  name: 'DOWNLOAD_FILE_STORE',
});

export default DownloadFileStore;
