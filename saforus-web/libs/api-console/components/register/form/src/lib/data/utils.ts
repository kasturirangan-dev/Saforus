import { PATTERN } from '@web-workspace/api-console/constants/validation';
import * as yup from 'yup';

export const registerValidationSchema = yup
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
    email: yup
      .string()
      .required('error-message.email-required')
      .matches(PATTERN.EMAIL, 'error-message.email-invalid')
      .max(254, 'error-message.max-length-254'),
    password: yup
      .string()
      .required('error-message.password-required')
      .min(8, 'error-message.password-format-incorrect')
      .matches(PATTERN.NUMBER_LEAST, 'error-message.password-format-incorrect')
      .matches(
        PATTERN.LOWERCASE_LEAST,
        'error-message.password-format-incorrect'
      )
      .matches(
        PATTERN.UPPERCASE_LEAST,
        'error-message.password-format-incorrect'
      )
      .matches(PATTERN.SYMBOL_LEAST, 'apiRegister.errors.pass-incorrect-format')
      .matches(/^\S*$/, 'error-message.password-no-spaces'),
    confirmPassword: yup
      .string()
      .required('apiRegister.errors.confirm-pass-req')
      .test(
        'passwords-match',
        'apiRegister.errors.confirm-pass-match',
        function (value) {
          return !value || value === this.resolve(yup.ref('password'));
        }
      ),
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
    isMore14: yup
      .boolean()
      .required()
      .oneOf([true], 'error-message.checkbox-required'),
    agreementCondition: yup
      .boolean()
      .required()
      .oneOf([true], 'error-message.checkbox-required'),
    hasSubscribedEmailUpdate: yup.boolean().optional(),
    lang: yup.string().optional(),
    teamInvitationToken: yup.string().optional(),
    awsToken: yup.string().optional(),
    token: yup.string().optional(), //Google Token
    timeZone: yup.string().optional(),
  })
  .required();

export type Register = yup.InferType<typeof registerValidationSchema>;
