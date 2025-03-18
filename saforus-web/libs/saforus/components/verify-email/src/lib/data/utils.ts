import { PATTERN } from "@web-workspace/saforus/constants/validation";
import * as yup from "yup";

export const reActivationEmailValidationSchema = yup.object({
  email: yup.string()
    .required('error-message.email-required')
    .email('error-message.email-invalid')
    .matches(PATTERN.EMAIL, 'error-message.email-invalid'),
}).required();

export type ReActivationEmail = yup.InferType<typeof reActivationEmailValidationSchema>;