import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
  date,
  string,
  number,
  object,
  ref,
} from 'yup';
import { RequestSearchAndList } from './interface';
import { PATTERN } from '@web-workspace/saforus-bo/constants/validation';
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
  RequestSearchAndList,
  | 'nameOrEmail'
  | 'subscriptionPlanName'
  | 'userType'
  | 'subscription'
  | 'status'
  | 'joinedDateStart'
  | 'joinedDateEnd'
  | 'sortBy'
  | 'sortOrder'
  | 'pageNo'
  | 'elementPerPage'
>;

const searchValidationSchema: ValidationSchema<RequestSearchAndList> = {
  nameOrEmail: string().optional(),
  elementPerPage: number().optional(),
  page: number().optional(),
  userType: string().optional(),
  subscriptionPlanName: string().optional(),
  status: string().optional(),
  sortBy: string().optional(),
  sortOrder: string().optional(),
  joinedDateStart: date()
    .nullable()
    .optional()
    .transform((v) =>
      v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
    ),
  joinedDateEnd: date()
    .nullable()
    .optional()
    .transform((v) =>
      v instanceof Date && !isNaN(v?.getMilliseconds()) ? v : null
    )
    .when('joinedDateStart', (joinedDateStart, yup) =>
      joinedDateStart instanceof Date && !isNaN(joinedDateStart?.getMilliseconds())
        ? yup.min(joinedDateStart, 'To date should be later than from date')
        : yup
    ),
};
export const validationSchema = object().shape(searchValidationSchema);

export const ResetPasswordValidationSchema = object({
  userName: string(),
  email: string(),
  password: string()
    .required('userManagement.search-user.user-detail.dialogs.reset-pass.required')
    .min(8, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-required-length')
    .matches(PATTERN.NUMBER_LEAST, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-number')
    .matches(
      PATTERN.LOWERCASE_LEAST,
      'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-lowercase'
    )
    .matches(
      PATTERN.UPPERCASE_LEAST,
      'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-uppercase'
    )
    .matches(PATTERN.SYMBOL_LEAST, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-required-symbol')
    .notOneOf(
      [ref('currentPassword')],
      'userManagement.search-user.user-detail.dialogs.reset-pass.password-must-different'
    ),
  confirmPassword: string()
    .required('userManagement.search-user.user-detail.dialogs.reset-pass.confirm-password-required')
    .min(8, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-required-length')
    .matches(PATTERN.NUMBER_LEAST, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-number')
    .matches(
      PATTERN.LOWERCASE_LEAST,
      'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-lowercase'
    )
    .matches(
      PATTERN.UPPERCASE_LEAST,
      'userManagement.search-user.user-detail.dialogs.reset-pass.password-requires-uppercase'
    )
    .matches(PATTERN.SYMBOL_LEAST, 'userManagement.search-user.user-detail.dialogs.reset-pass.password-required-symbol')
    .oneOf([ref('password')], 'userManagement.search-user.user-detail.dialogs.reset-pass.password-must-match'),
}).required();

export type ResetPassword = yup.InferType<
  typeof ResetPasswordValidationSchema
>;
