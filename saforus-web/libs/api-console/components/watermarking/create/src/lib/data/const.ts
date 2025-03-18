import { object, InferType, array } from 'yup';

export const WatermarkingValidationSchema = object({
  file: object().required(),
  wtrOrderFiles: array().required(),
}).required();
export type WatermarkingForm = InferType<typeof WatermarkingValidationSchema>;
