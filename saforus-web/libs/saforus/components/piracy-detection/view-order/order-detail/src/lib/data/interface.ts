export interface IPiracyDetailResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: PiracyDetailData;
}

export interface PiracyDetailData {
  id: number;
  userId: number;
  orderNo: string;
  title: string;
  watermarkingOrderNo: string;
  contentType: string;
  status: string;
  autoDetection: boolean;
  createdAt: string;
  fileList: FileList[];
  code: string;
}

export interface ContentType {
  value: string;
}

export interface FileList {
  id: number;
  pdOrderId: number;
  fileName: string;
  fileSize: number;
  status: string;
  detectedCode: string;
  imageURL: string | null;
  moreInfo: MoreInfo;
  psnDescription: string | null;
  sharedEmail: string | null;
  createdAt: string;
  estimatedCompletionTime: string;
  wtrCreatedAt: string;
  wtrMoreInfo: WtrMoreInfo;
  wtrFileName: string;
  wtrFileSize: number;
  sharedHistories: sharedFile[];
}

interface CraftedLinks {
  small?: string;
  large?: string;
  medium?: string;
  playback?: string;
}

interface MoreInfo {
  craftedLinks: CraftedLinks;
}
interface WtrMoreInfo {
  craftedLinks: CraftedLinks;
}

interface sharedFile {
  sharedEmails: string[];
  createdAt: string;
}
