import * as yup from 'yup';

export const watermarkingValidationSchema = yup
  .object({
    files: yup.array().required(),
    contentType: yup.string().required(),
    startNum: yup.number().required(),
    watermarkCodes: yup.array().required(),
  })
  .required();

export type WatermarkingCreateOrder = yup.InferType<
  typeof watermarkingValidationSchema
>;
