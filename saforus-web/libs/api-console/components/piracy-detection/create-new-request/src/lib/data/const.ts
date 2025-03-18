import { object, InferType } from 'yup';

export const piracyValidationSchema = object({
  file: object().required(),
}).required();
export type PiracyCreateForm = InferType<typeof piracyValidationSchema>;
