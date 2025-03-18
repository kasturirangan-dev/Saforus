import { PATTERN } from '@web-workspace/saforus/constants/validation';
import * as yup from 'yup';

// Show error on PasswordRequirements
export const newPasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .required('error-message.password-required')
      .min(8, ' ')
      .matches(PATTERN.NUMBER_LEAST, ' ')
      .matches(PATTERN.UP_LOWER_CASE_LEAST, ' ')
      .matches(PATTERN.SYMBOL_LEAST, ' ')
      .matches(
        PATTERN.NOT_CONTAIN_SPACE,
        'error-message.password-not-contain-space'
      ),
    confirmPassword: yup
      .string()
      .required('error-message.password-required')
      .min(8, ' ')
      .matches(PATTERN.NUMBER_LEAST, ' ')
      .matches(PATTERN.LOWERCASE_LEAST, ' ')
      .matches(PATTERN.UPPERCASE_LEAST, ' ')
      .matches(PATTERN.SYMBOL_LEAST, ' ')
      .oneOf([yup.ref('password')], 'error-message.new-password-must-match'),
  })
  .required();

export type NewPassword = yup.InferType<typeof newPasswordValidationSchema>;
