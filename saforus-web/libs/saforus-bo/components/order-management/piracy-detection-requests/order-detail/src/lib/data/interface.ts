import { PiracyDetailData } from "@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data";

export const enum StatusName {
  ALL = 'All',
  IN_QUEUE = 'In Queue',
  COMPLETED = 'Completed',
  INPROGRESS = 'In Progress',
  FAILED = 'Failed',
  ERROR = 'Error',
  AUTO_DETECTION = 'Auto detection',
  EXPERT_DETECTION = 'Expert detection',
}
export const StatusOrder: any = {
  all: 'All',
  in_queue: 'In Queue',
  completed: 'Completed',
  in_progress: 'In Progress',
  failed: 'Failed',
  error: 'Error',
};

export const enum fileType {
  AUDIO = 'audio',
  VIDEO = 'video',
  IMG = 'img',
}

export interface IPiracyDetailResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: PiracyDetailData;
}

export enum OrderSearchType {
  // REQUESTER = 'requester',
  SERVICE_TYPE = 'service_type',
  STATUS = 'status',
  CONTENT_TYPE = 'type',
  FORMAT = 'format',
}