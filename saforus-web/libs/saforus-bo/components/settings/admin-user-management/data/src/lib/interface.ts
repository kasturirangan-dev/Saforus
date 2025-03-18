import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export enum AdminSearchType {
  STATUS = 'status',
  ROLE = 'role',
}

export enum AdminStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AdminType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_CS = 'ADMIN_CS',
  ADMIN = 'ADMIN',
}

export interface BaseResponseAdminUser {
  data: ResponseAdminUser;
  httpStatus: string | number;
  resultCode: string;
}

export interface ResponseUserCreditData {
  elementList: ResponseAdminUser[];
}

export interface ResponseAdminUser {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: AdminUserModel[];
}

export interface AdminUserModel {
  id: string;
  userId: string;
  role: string;
  email: string;
  userName?: string | null | undefined;
  fullName: string;
  isAdmin?: boolean | undefined;
  status: string;
  createdDate: string;
}

export interface RequestAdminUser {
  nameOrEmail: string;
  status: string;
  role: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
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
  RequestAdminUser,
  'nameOrEmail' | 'status' | 'role' | 'startDate' | 'endDate' | 'pageNo' | 'elementPerPage'
>;
