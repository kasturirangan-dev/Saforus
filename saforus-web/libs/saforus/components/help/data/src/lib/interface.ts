import { TOption } from '@web-workspace/saforus/common/model';
import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export enum InquirySearchType {
  CATEGORY = 'category',
  STATUS = 'status',
}

export interface InquiriesSearchViewProps {
  error: Error | null;
  status: TOption[];
  categories: TOption[];
  formats: TOption[];
  fromRequestedDate: Date | null;
  setFromRequestedDate: (date: Date | null) => void;
  toRequestedDate: Date | null;
  setToRequestedDate: (date: Date | null) => void;
}

export interface Inquiry {
  id: string;
  title: string;
  content?: string;
  qaNo?: string;
  qaCategory: string;
  teamId?: number;
  userId: number;
  attachedFileList?: FileAttachment[];
  questionAnswer: string;
  status: string;
  isMaster?: boolean;
  conversationThreadId?: string;
  isOpenToTeam?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FileAttachment {
  id: string;
  qaId: string;
  cloudStorageType: string;
  fileName: string;
  filePathLocal: string;
  filePathCloud: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

type SchemaOfType<T> = T extends string
  ? StringSchema
  : T extends number
  ? NumberSchema
  : T extends boolean
  ? BooleanSchema
  : T extends Array<infer U>
  ? ArraySchema<U, any>
  : T extends object
  ? ObjectSchema<T>
  : T extends Date
  ? DateSchema
  : never;

export type ValidationSchema<T> = {
  [K in keyof T]: SchemaOfType<T[K]>;
};

export interface RequestMyInquiries {
  teamId: number;
  qaCategory: string;
  qaStatus: string;
  adminId: number;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
}

export interface BaseResponseInquiries {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: any;
  data: ResponseInquiries;
}

export interface ResponseInquiries {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: Inquiry[];
}

export type SearchValidation = Omit<
  RequestMyInquiries,
  | 'qaCategory'
  | 'qaStatus'
  | 'startDate'
  | 'endDate'
  | 'pageNo'
  | 'elementPerPage'
>;

export const InquiryStatus = {
  ANSWERED: 'ANSWERED',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_QUEUE: 'IN_QUEUE',
  CANCELED: 'CANCELED',
};

export const InquiryCategory = {
  USE_OF_SERVICE: 'USE_OF_SERVICE',
  SERVICE_TECHNOLOGY: 'SERVICE_TECHNOLOGY',
  SERVICE_BUG_AND_REPORT: 'SERVICE_BUG_AND_REPORT',
  SERVICE_PLAN_PAYMENT_RELATED: 'SERVICE_PLAN_PAYMENT_RELATED',
  TEAM_AND_PERSONAL_ACCOUNT: 'TEAM_AND_PERSONAL_ACCOUNT',
  OTHERS: 'OTHERS',
};
