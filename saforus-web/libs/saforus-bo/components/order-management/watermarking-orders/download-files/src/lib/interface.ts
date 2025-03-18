export interface RequestDownloadFile {
  personOrderInfoSq: string;
  rowCount: number;
  fromRow: number;
}

export interface DownloadFileResponse {
  total: number;
  data: FileInfo[];
}

export interface FileInfo {
  id: string;
  psnResultSort: string;
  psnResultUrl: string;
  psnResultFileMsg: string;
  psnResultSize: number;
  fileName: string;
  fileSizeUnit: string;
  fileId: string;
  orderNo: string;
  expirationDate: string;
  downloadCount: number;
}

export interface SelectedFiles {
  id: string;
  fileUrlDownload: string;
  fileName: string;
  fileId: string;
}
