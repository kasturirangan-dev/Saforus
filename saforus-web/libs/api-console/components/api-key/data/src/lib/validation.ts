import { object, string, date, boolean } from 'yup';

export const CreateApiKeySchema = object({
  name: string()
    .required('error-message.required')
    .max(30, 'apiKeyManagement.errmsg.names-max-length'),
  expiredAt: date().required('error-message.required'),
  neverExpire: boolean(),
}).required();

export const EditApiKeySchema = object({
  name: string()
    .required('error-message.required')
    .max(30, 'apiKeyManagement.errmsg.names-max-length'),
  expiredAt: date().required('error-message.required'),
  neverExpire: boolean(),
  status: string().required('error-message.required'),
}).required();
