export interface RequestDownloadFile {
  personOrderInfoSq: string;
  rowCount: number;
  fromRow: number;
}

export interface RequestShareFile {
  personalOrderResultSq: string;
  sharedEmails: string[];
}
export interface RequestSharedHistory {
  personOrderInfoSq: string;
  teamId?: number | null;
}

export interface DownloadFileResponse {
  total: number;
  data: FileInfo[];
}

interface CraftedLinks {
  small: string;
  large: string;
  medium: string;
}

interface MoreInfo {
  craftedLinks: CraftedLinks;
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
  downloadCount: number;
  sharedEmail: string;
  moreInfo: MoreInfo;
}

export interface SelectedFiles {
  id: string;
  fileUrlDownload: string;
  fileName: string;
  fileId: string;
  downloadCount: number;
  sharedEmail: string;
}
