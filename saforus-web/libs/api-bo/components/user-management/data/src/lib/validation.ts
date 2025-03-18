import { object, string } from 'yup';

export const CreateUserSchema = object({
  accountName: string()
    .required('Required.')
    .max(30, 'Please keep names under 30 characters.'),
    email: string()
    .required('Required.')
    .email('Please enter a valid email'),
    subscriptionTier: string().required('Required.'),
    zoneId: string().required('Required.'),
}).required();

export const EditUserSchema = object({
  accountName: string()
}).required();
