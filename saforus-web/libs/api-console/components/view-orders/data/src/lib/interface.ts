import {
  ApiResponseData,
  OrderType,
} from '@web-workspace/api-console/common/model';

export interface ViewOrderQuery {
  orderType: string;
  startDate: Date | string;
  endDate: Date | string;
  format: string;
  status: string;
  keyword: string;
  channel: string;
  page: number;
  pageSize: number;
}

export interface ViewOrderResponse extends ApiResponseData {
  data: Data;
}

interface Data {
  page: number;
  pageSize: number;
  total: number;
  records: OrderDetail[];
}

export interface OrderDetail {
  id: string;
  orderType: OrderType;
  status: OrderStatus;
  orderFiles: OrderFile[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface OrderFile {
  id: string;
  fileName: string;
  fileFormat: string;
  fileType: string;
  fileSize?: number;
  moreInfo: MoreInfo;
  origDownloadUrl: string;
}

interface MoreInfo {
  craftedLinks: CraftedLinks;
  estimatedCompletionTime: string;
  actualCompletionTime: string;
}

interface CraftedLinks {
  small?: string;
  large?: string;
  medium?: string;
  playback?: string;
}

export const enum OrderStatus {
  AWAITING_PROCESS = 'AWAITING_PROCESS',
  PROCESSED = 'PROCESSED',
  EXPIRED = 'EXPIRED',
}
