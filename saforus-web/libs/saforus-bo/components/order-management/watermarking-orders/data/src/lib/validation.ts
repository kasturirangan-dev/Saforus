import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
  date,
  number,
  object,
  string,
} from 'yup';
import { RequestWaterExpiration, RequestWatermarkingOrders } from './interface';

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
  RequestWatermarkingOrders,
  'endDate' | 'pageNo' | 'elementPerPage'
>;

// Yup schema for validation
const searchValidationSchema: ValidationSchema<SearchValidation> = {
  // userId: number().required(),
  orderNo: string().optional(),
  emailIdOrName: string().optional(),
  serviceType: string().optional(),
  format: string().optional(),
  orderRequestStatus: string().optional(),
  contentType: string().optional(),
  startDate: date()
    .nullable()
    .optional()
    .transform((v) =>
      v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
    ),
  endDate: date()
    .nullable()
    .optional()
    .transform((v) =>
      v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
    )
    .when('startDate', (startDate, yup) =>
      startDate instanceof Date && !isNaN(startDate.getMilliseconds())
        ? yup.min(startDate, 'To date should be later than from date')
        : yup
    ),
};
export const validationSchema = object().shape(searchValidationSchema);

// Yup schema for ExpirationValidation
export type ExpirationValidation = Omit<
  RequestWaterExpiration,
  'expiredDate'
>;
// Yup schema for validation
const ExpirationValidationSchema: ValidationSchema<ExpirationValidation> = {
  expiredDate: date()
    .nullable()
    .optional()
    .transform((v) =>
      v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
    ),
};
export const ExpirationSchema = object().shape(ExpirationValidationSchema);
