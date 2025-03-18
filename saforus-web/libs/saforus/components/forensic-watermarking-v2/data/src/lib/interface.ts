import { FileType } from '@web-workspace/saforus/common/model';

export interface IOrderFile {
  psnOrderId: string;
  psnInfoId: string;
  psnInfoFileNm: string;
  psnInfoFullPath: string;
  psnInfoFileTpCd: string;
  delYn: string;
  regId: string;
  regDt: string;
  personOrderInfoSq: string;
  psnFileMediaCd: string;
  psnStartNum: string;
  psnEndNum: string;
  psnFwmTpCd: string;
  contentType: string;
  format: string;
  size: string;
  fileName: string;
  finalTime: string;
  watermarkCode: string;
  expirationDate: string;
  progress: string;
  moreInfo: MoreInfo;
  estimatedCompletionTime: string;
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

export interface WatermarkCode {
  id?: string;
  wtrMsg?: string | number;
  description?: string | null;
}

export interface WatermarkingOrderInfo {
  orderNo: string;
  contentType?: string;
  file?: FileType;
  fileName?: string;
  thumbnail?: string;
  playback?: string;
  status?: StatusName;
  requestor?: string;
  requestedDate?: Date | string;
  estimatedCompletionTime?: Date | string;
}

export const enum StatusName {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_QUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}
