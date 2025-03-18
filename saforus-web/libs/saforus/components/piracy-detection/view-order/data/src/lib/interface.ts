import { BaseResponseData, TOption } from '@web-workspace/saforus/common/model';

export const enum PiracyOrderStatus {
  IN_QUEUE = 'IN_QUEUE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DETECTED = 'DETECTED',
  UNDETECTED = 'UNDETECTED',
  FAILED = 'FAILED',
}

interface FormatObj {
  extension: string;
  id: number;
  type: string;
}

export interface PiracyOrder {
  id: string;
  orderId: string;
  orderNo: string;
  psnStartNum: number;
  psnEndNum: number;
  userFullName: string;
  userEmail: string;
  orderStatus: string;
  formatList: FormatObj[];
  type: string;
  contentType: string;
  requestDate: string;
  extension: string;
  // contentTypeStr: string;
  formatStr: string;
  title: string;
  fileName: string;
  url: string;
  userId: number;
  moreInfo: MoreInfo;
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

export interface ResponsePiracyOrder extends BaseResponseData {
  data: Data;
}

interface Data {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: PiracyOrder[];
}

export interface RequestPiracyOrder {
  teamId: string | number | null;
  orderNo?: string;
  serviceType: string;
  userId: string | number | null;
  orderRequestStatus: string;
  contentType: string;
  format: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
}

export interface ServiceFieldValues {
  orderNo?: string;
}
