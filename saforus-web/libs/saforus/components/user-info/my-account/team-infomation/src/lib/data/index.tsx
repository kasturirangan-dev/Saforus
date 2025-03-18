import {
  LoginInForValidation,
  TeamInformationName,
  TeamInforValidation,
  ValidationSchema,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import { object, string } from 'yup';

export const formFields: {
  name: any;
  label: string;
  isRequired?: boolean;
  control?: JSX.Element;
}[] = [
  {
    name: 'teamName',
    label: 'myaccount.team-information.team-name',
    isRequired: true,
  },
  {
    name: 'teamOwnerName',
    label: 'myaccount.team-information.team-owner',
    isRequired: true,
  },
  {
    name: 'subscriptionPlanName',
    label: 'myaccount.team-information.team-service-plan',
  },
  {
    name: 'teamDescription',
    label: 'myaccount.team-information.team-description',
  },
];

const teamInforValidationSchema: ValidationSchema<TeamInforValidation> = {
  teamName: string(),
  teamOwner: string(),
  teamServicePlan: string(),
  teamDescription: string(),
};

export const validationSchema = object().shape(teamInforValidationSchema);
