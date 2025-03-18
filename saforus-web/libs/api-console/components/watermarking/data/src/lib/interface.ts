import { ApiResponseData } from '@web-workspace/api-console/common/model';

export interface WtrFiles {
  fileName: string;
  fileType: string;
  fileSize: number;
  wtrOrderFiles: WatermarkFile[];
}

export interface WatermarkFile {
  wtrName: string;
  wtrDescription: string;
}

export interface WatermarkingRequest {
  title: string;
  idempotencyKey: string;
  files: WtrFiles[];
}

export interface WatermarkingResponse extends ApiResponseData {
  data: WatermarkingCreateOrder;
}

export interface WatermarkingCreateOrder {
  id: string;
  accountId: string;
  idempotencyKey: string;
  status: WtrOrderStatus;
  orderFiles: CreateOrderFile[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateOrderFile {
  id: string;
  fileName: string;
  uploadUrl: string;
  status: WtrOrderFileStatus;
}

export const enum WtrOrderStatus {
  AWAITING_PROCESS = 'AWAITING_PROCESS',
  PROCESSED = 'PROCESSED',
  EXPIRED = 'EXPIRED',
}

export const enum WtrOrderFileStatus {
  AWAITING_PROCESS = 'AWAITING_PROCESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export interface WtrDetailData {
  id: string;
  accountId: string;
  idempotencyKey: string;
  status: WtrOrderStatus;
  orderFiles: OrderFile[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
export interface OrderFile {
  id: string;
  fileName: string;
  fileFormat: string;
  fileType: string;
  fileSize?: number;
  status: WtrOrderFileStatus;
  moreInfo: MoreInfo;
  wtrOrderFiles: WtrOrderFiles[];
  origDownloadUrl: string;
}

interface MoreInfo {
  craftedLinks: CraftedLinks;
  estimatedCompletionTime: string;
  actualCompletionTime: string;
  detectedCode: string;
}

interface CraftedLinks {
  small?: string;
  large?: string;
  medium?: string;
  playback?: string;
}
interface WtrOrderFiles {
  id: string;
  wtrName: string;
  wtrDescription: string;
  wtrDownloadUrl: string;
  status: WtrOrderFileStatus;
}

export interface IWtrDetailResponse extends ApiResponseData {
  data: WtrDetailData;
}
