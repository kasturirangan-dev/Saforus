import { object, string, date, boolean } from 'yup';

export const UserProfileSchema = object({
  accountName: string(),
  companyName: string(),
  phoneNumber: string(),
  zoneId: string(),
}).required();
