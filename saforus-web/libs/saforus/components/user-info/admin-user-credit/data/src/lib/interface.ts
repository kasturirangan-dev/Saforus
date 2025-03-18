import { TOption } from '@web-workspace/saforus/common/model';
import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export interface ResponseUserCredit {
  data: ResponseUserCreditList;
  httpStatus: string;
  resultCode: string;
}

export interface ResponseUserCreditData {
  elementList: ResponseUserCreditList[];
}

export interface ResponseUserCreditList {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: UserCreditModel[];
}

export interface UserCreditModel {
  id: string;
  userId: string;
  userRole: string;
  email: string;
  userName: string;
  fullName: string;
  wtrUsedCapacitySize: number;
  wtrCapacitySize: number;
}

export interface RequestUserCredit {
  pageNo: number;
  elementPerPage: number;
}

export interface UserCreditFieldValues {
  pageNo: number;
  elementPerPage: number;
}

export interface ResponseUserCredit {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: UserCreditModel[];
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
  UserCreditFieldValues,
  'pageNo' | 'elementPerPage'
>;
