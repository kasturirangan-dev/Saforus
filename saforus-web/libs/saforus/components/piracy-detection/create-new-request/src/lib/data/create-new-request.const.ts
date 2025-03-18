import * as yup from 'yup';

export const piracyValidationSchema = yup
  .object({
    fileIds: yup.array().required('error-message.required'),
    title: yup.string().required('error-message.required'),
    confirmRequire: yup.boolean().required('error-message.required'),
    watermarkingOrderNo: yup.string().required('error-message.required'),
    watermarkingOrderInfoSq: yup.string().required('error-message.required'),
  })
  .required();

export type PiracyCreateRequest = yup.InferType<typeof piracyValidationSchema>;

export const MEDIA_TYPE = {
  IMG: 'IMG',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
};

export enum SEARCH_TYPE {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
  RETRY = 'RETRY',
}
