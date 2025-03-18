import { PATTERN } from '@web-workspace/api-bo/constants/validation';
import * as yup from 'yup';

export const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .email('error-message.email-invalid')
      .required('error-message.email-required')
      .matches(PATTERN.EMAIL, 'error-message.email-invalid'),
    password: yup
      .string()
      .required('error-message.password-required')
      .min(8, 'error-message.password-required-length')
      .matches(PATTERN.NUMBER_LEAST, 'error-message.password-requires-number')
      .matches(
        PATTERN.LOWERCASE_LEAST,
        'error-message.password-requires-lowercase'
      )
      .matches(
        PATTERN.UPPERCASE_LEAST,
        'error-message.password-requires-uppercase'
      ),
    // .matches(PATTERN.SYMBOL_LEAST, 'error-message.password-required-symbol'),
  })
  .required();

export type Login = yup.InferType<typeof loginValidationSchema>;
