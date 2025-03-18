import { PATTERN } from '@web-workspace/saforus/constants/validation';
import * as yup from 'yup';

export const registerValidationSchema = yup
  .object({
    name: yup
      .string()
      .required('error-message.name-required')
      .matches(PATTERN.NAME, 'error-message.name-invalid')
      .matches(PATTERN.NOT_SPACE_START, 'error-message.name-not-start-space')
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
      .min(8, 'error-message.password-required-length')
      .matches(PATTERN.NUMBER_LEAST, 'error-message.password-requires-number')
      .matches(PATTERN.LOWERCASE_LEAST, 'error-message.password-requires-lowercase')
      .matches(PATTERN.UPPERCASE_LEAST, 'error-message.password-requires-uppercase')
      .matches(PATTERN.SYMBOL_LEAST, 'error-message.password-required-symbol'),
    confirmPassword: yup
      .string()
      .required('error-message.password-required')
      .min(8, 'error-message.password-required-length')
      .matches(PATTERN.NUMBER_LEAST, 'error-message.password-requires-number')
      .matches(PATTERN.LOWERCASE_LEAST, 'error-message.password-requires-lowercase')
      .matches(PATTERN.UPPERCASE_LEAST, 'error-message.password-requires-uppercase')
      .matches(PATTERN.SYMBOL_LEAST, 'error-message.password-required-symbol')
      .oneOf([yup.ref('password')], 'error-message.password-must-match'),
    company: yup
      .string()
      .required('error-message.company-name-required')
      .max(50, 'error-message.max-length-50')
      .matches(PATTERN.COMPANY_NAME, 'error-message.name-special-allowed'),
    // country: yup
    //   .string()
    //   .required('error-message.country-incorporation-required'),
    // countryCode: yup.string(),
    // shortName: yup.string(),
    mobileNumber: yup
      .string()
      .required('error-message.mobile-number-required')
      .max(50, 'error-message.max-length-50'),
    isMore14: yup
      .boolean()
      .required()
      .oneOf([true], 'error-message.checkbox-required'),
    agreementCondition: yup
      .boolean()
      .required()
      .oneOf([true], 'error-message.checkbox-required'),
    hasSubscribedEmailUpdate: yup.boolean().optional(),
    languageCode: yup.string().optional(),
    teamInvitationToken: yup.string().optional(),
    awsToken: yup.string().optional(),
    token: yup.string().optional(), //Google Token
  })
  .required();

export type Register = yup.InferType<typeof registerValidationSchema>;
