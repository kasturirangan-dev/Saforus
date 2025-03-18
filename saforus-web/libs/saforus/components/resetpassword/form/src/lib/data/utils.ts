import { PATTERN } from "@web-workspace/saforus/constants/validation";
import * as yup from "yup";

export const resetPasswordValidationSchema = yup.object({
  // fullName: yup.string()
  //   .required('error-message.name-required')
  //   .matches(PATTERN.NAME, 'error-message.name-invalid'),
  email: yup.string()
    .email('error-message.email-invalid')
    .required('error-message.email-required')
    .matches(PATTERN.EMAIL, 'error-message.email-invalid'),
}).required();

export type ResetPassword = yup.InferType<typeof resetPasswordValidationSchema>;