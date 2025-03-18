import { PATTERN } from '@web-workspace/api-console/constants/validation';
import * as yup from 'yup';

export const editProfileValidation = yup
  .object({
    accountName: yup
      .string()
      .required('error-message.name-required')
      .matches(PATTERN.NAME, 'error-message.name-invalid')
      .matches(
        PATTERN.NOT_SPACE_START,
        'apiRegister.errors.name-start-no-space'
      )
      .matches(PATTERN.NOT_ONLY_NUMBER, 'error-message.name-not-only-number')
      .max(50, 'error-message.max-length-50'),
    companyName: yup
      .string()
      .optional()
      .max(50, 'error-message.max-length-50')
      .test(
        'name-special-allowed',
        'error-message.name-special-allowed',
        (value) => {
          // Skip validation if value is null or empty
          if (!value) return true;
          // Validate against the pattern if there's a value
          return PATTERN.COMPANY_NAME.test(value);
        }
      ),
    phone: yup
      .string()
      .required('apiRegister.errors.phone') // Handles the error for empty input
      .min(7, 'apiRegister.errors.phone-invalid') // Handles the error for less than 7 digits
      .matches(PATTERN.PHONE, 'apiRegister.errors.phone-invalid'), // Ensures number has 7-15 digits and allows optional '+' at the start
  })
  .required();

export type Register = yup.InferType<typeof editProfileValidation>;
