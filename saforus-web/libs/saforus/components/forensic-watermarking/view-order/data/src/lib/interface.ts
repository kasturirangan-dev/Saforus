import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

type formatList = {
  extension: string;
  id: number;
  type: string;
};
export interface WatermarkingOrder {
  id: number;
  serviceType: string;
  orderNo: string;
  userFullName: string;
  summary: string;
  title: string;
  psnStartNum: number;
  psnEndNum: number;
  watermark_code: string;
  orderStatus: string;
  contentType: string;
  format: number;
  requested: string;
  requestedBy?: string;
  updatedDate?: string;
  updatedBy?: string;
  createdDate?: string;
  createdBy?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  fromRow?: number;
  rowCount?: number;
  extension?: string;
  formatList?: [formatList];
}
interface Data {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: WatermarkingOrder[];
}
export interface ResponseWatermarkingViewOrder {
  data: Data;
  transactionId: string | null;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number | null;
  resourceURL: string | null;
}

export interface RequestWatermarkingViewOrder {
  teamId: number | null;
  emailIdOrName: string;
  orderNo: string;
  serviceType: string;
  userId: string | number | null;
  orderRequestStatus: string;
  contentType: string;
  format: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
  includeFile: boolean;
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

export type SearchValidation = Omit<
  RequestWatermarkingViewOrder,
  | 'serviceType'
  | 'userId'
  | 'orderRequestStatus'
  | 'contentType'
  | 'format'
  | 'startDate'
  | 'endDate'
  | 'fromRow'
  | 'rowCount'
  | 'orderNo'
  | 'emailIdOrName'
  | 'includeFile'
>;
