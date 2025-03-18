import { PATTERN } from '@web-workspace/saforus-bo/constants/validation';
import {
  object,
  string,
  boolean,
} from 'yup';
import * as yup from 'yup'

export const AddAdminUserSchema = object({
  email: string()
    .required('error-message.email-required')
    .matches(PATTERN.EMAIL, 'error-message.email-invalid')
    .max(254, 'error-message.max-length-254'),
  type: string().required('error-message.required'),
  name: string().required('error-message.required'),
}).required();

export type AddAdminUserModel = yup.InferType<
  typeof AddAdminUserSchema
>;



export const UpdateAdminUserSchema = object({
  email: string()
    .required('error-message.email-required')
    .matches(PATTERN.EMAIL, 'error-message.email-invalid')
    .max(254, 'error-message.max-length-254'),
  type: string().required('error-message.required'),
  name: string().required('error-message.required'),
  status: string().required('error-message.required'),
  resetPassword: boolean().optional(),
}).required();

export type UpdateAdminUserModel = yup.InferType<
  typeof UpdateAdminUserSchema
>;

