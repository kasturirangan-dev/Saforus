import { UseFormRegister } from 'react-hook-form';
import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export const enum IoType {
  NONE = 0,
  INPUT = 1,
  OUTPUT = 2,
  BOTH = 3,
}

export interface ServiceRegion {
  region: string;
  descKr: string;
  descEn: string;
  id: number;
}

export interface SiteStorage {
  id?: number;
  relateId?: number;
  storageName: string;
  bucketName: string;
  storagePath: string;
  accessKey: string;
  secretKey: string;
  storageId: string;
  storageType: string;
  serviceRegionIdx: number;
  serviceRegion: ServiceRegion;
  ioType: IoType;
  description: string;
  methodTpCd?: string;
  createdAt?: string;
}

export interface Site {
  id: number;
  siteId: string;
  isDeleted?: boolean;
  userId?: number;
  relateId?: number;
  siteName: string;
  siteUrl: string;
  siteKey: string;
  accessKey: string;
  storages: SiteStorage[];
  createdAt: string;
  updatedAt: string;
}

type SiteFieldName = keyof Site;

export function getFieldRegisterSite(
  registerFn: UseFormRegister<Site>,
  fieldName: SiteFieldName
) {
  return registerFn(fieldName);
}

export type StorageFieldName = keyof Omit<SiteStorage, 'createdAt'>;

export function getFieldRegisterStorage(
  registerFn: UseFormRegister<SiteStorage>,
  fieldName: StorageFieldName
) {
  return registerFn(fieldName);
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

export type SiteValidation = Pick<Site, 'siteName' | 'siteUrl'>;
export type StorageValidation = Omit<
  SiteStorage,
  'createdAt' | 'id' | 'methodTpCd' | 'relateId'
>;
