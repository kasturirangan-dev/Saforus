import { ApiResponseData } from '@web-workspace/api-console/common/model';

export interface PiracyCreateRequest {
  title: string;
  idempotencyKey: string;
  files: PiracyFile[];
}

export interface PiracyFile {
  fileName: string;
  fileType: string;
  fileSize: number;
  refFileName?: string;
}

export interface PiracyCreateResponse extends ApiResponseData {
  data: PiracyCreateOrder;
}

export interface PiracyCreateOrder {
  id: string;
  accountId: string;
  idempotencyKey: string;
  status: PiracyOrderStatus;
  orderFiles: CreateOrderFile[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateOrderFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadUrl: string;
  refFileName?: string;
  refUploadUrl?: string;
  status: PiracyOrderFileStatus;
}

export const enum PiracyOrderStatus {
  AWAITING_PROCESS = 'AWAITING_PROCESS',
  PROCESSED = 'PROCESSED',
}

export const enum PiracyOrderFileStatus {
  AWAITING_PROCESS = 'AWAITING_PROCESS',
  DETECTED = 'DETECTED',
  UNDETECTED = 'UNDETECTED',
  FAILED = 'FAILED',
}

export interface PiracyDetailData {
  id: string;
  accountId: string;
  idempotencyKey: string;
  status: PiracyOrderStatus;
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
  status: PiracyOrderFileStatus;
  moreInfo: MoreInfo;
  origDownloadUrl: string;
  retryAttempts?: number;
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

export interface IPiracyDetailResponse extends ApiResponseData {
  data: PiracyDetailData;
}
