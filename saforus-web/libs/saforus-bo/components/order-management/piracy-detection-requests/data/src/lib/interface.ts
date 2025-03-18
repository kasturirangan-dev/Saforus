type contentType = {
  value: string;
};

type formatList = {
  extension: string;
  id: number;
  type: string;
};

export interface PiracyDetectionRequest {
  id: number;
  orderNo: string;
  title: string;
  psnStartNum: number;
  psnEndNum: number;
  orderStatus: string;
  contentType: contentType;
  fileName: string;
  extension?: string;
  url: string;
  requestDate?: Date | string;
  userId: number;
  userEmail: string;
  userFullName: string;
  formatList?: [formatList];
}

interface Data {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: PiracyDetectionRequest[];
}
export interface ResponsePiracyDetectionRequests {
  data: Data;
  transactionId: string | null;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number | null;
  resourceURL: string | null;
}

export interface RequestPiracyDetectionRequests {
  // teamId: number | null;
  // userId: number | null;
  emailIdOrName: string;
  orderNo: string;
  serviceType: string;
  orderRequestStatus: string;
  contentType: string;
  format: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
}

export interface HelpTexts {
  img: LocalHelpText[];
  video: LocalHelpText[];
  audio: LocalHelpText[];
}

export interface LocalHelpText {
  keyLabel: string;
  child: string[];
}

export const enum DetectionType {
  AUTO_DETECTION = 'AUTO_DETECTION',
  EXPERT_DETECTION = 'EXPERT_DETECTION',
}

export const enum Status {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'IN_PROGRESS',
  INQUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
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

export interface FileList {
  id: number;
  pdOrderId: number;
  fileName: string;
  fileSize: number;
  status: string;
  detectedCode: string;
  imageURL: string | null;
  createdAt: string;
}