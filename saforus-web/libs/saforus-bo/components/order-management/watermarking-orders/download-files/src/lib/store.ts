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
  orderNo: string;
  previewImageUrl: string;
  isLoading: boolean;
  requestQuery: RequestDownloadFile;
  expiredDate: Date | string;
  setExpiredDate: (date: Date | string) => void;
  setRequestQuery: (query: Partial<RequestDownloadFile>) => void;
  setFiles: (data: DownloadFileResponse) => Promise<void>;
  selectedFiles: SelectedFiles[];
  setSelectedFiles: (fileList: SelectedFiles[], idList: string[]) => void;
  onReset: () => void;
}

function downloadFileStore() {
  const store: DownloadFileStoreType = {
    files: [],
    total: 0,
    orderNo: '',
    previewImageUrl: '',
    isLoading: false,
    selectedFiles: [],
    expiredDate: new Date(),
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
      if (response.total !== DownloadFileStore.total) {
        DownloadFileStore.total = response.total;
      }
      DownloadFileStore.previewImageUrl = response?.previewImageUrl;
      DownloadFileStore.orderNo = response?.orderNo;
      DownloadFileStore.expiredDate = response?.expirationDate;
    },
    requestQuery: {
      personOrderInfoSq: '',
      fromRow: 0,
      rowCount: 10,
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
      DownloadFileStore.previewImageUrl = '';
      DownloadFileStore.files = [];
      DownloadFileStore.total = 0;
      DownloadFileStore.orderNo = '';
      DownloadFileStore.isLoading = false;
      DownloadFileStore.selectedFiles = [];
      DownloadFileStore.requestQuery = {
        personOrderInfoSq: '',
        fromRow: 0,
        rowCount: 10,
      };
    },
    setExpiredDate: (date) => {
      DownloadFileStore.expiredDate = date;
    },
  };
  return store;
}

const DownloadFileStore = proxy<DownloadFileStoreType>(downloadFileStore());
devtools(DownloadFileStore, {
  name: 'BO_DOWNLOAD_FILE_STORE',
});

export default DownloadFileStore;
