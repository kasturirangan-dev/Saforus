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
  boolean,
} from 'yup';
import { RequestPiracyDetectionRequests } from './interface';
import * as yup from 'yup'

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
  RequestPiracyDetectionRequests,
  'startDate' | 'endDate' | 'pageNo' | 'elementPerPage'
>;

// Yup schema for validation
const searchValidationSchema: ValidationSchema<SearchValidation> = {
  // userId: number().required(),
  emailIdOrName: string().optional(),
  orderNo: string().optional(),
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

export const ExpertDetectionSchema = object({
  code: number()
    .typeError('error-message.required')
    .required('error-message.required')
    .integer('page-watermarking.create.message.between-1-and-2000')
    .min(1, 'page-watermarking.create.message.between-1-and-2000')
    .max(2000, 'page-watermarking.create.message.2000-or-less'),
  type: string().required('error-message.required'),
  status: string().required('error-message.required'),
}).required();

export type ExpertDetectionModel = yup.InferType<
  typeof ExpertDetectionSchema
>;
