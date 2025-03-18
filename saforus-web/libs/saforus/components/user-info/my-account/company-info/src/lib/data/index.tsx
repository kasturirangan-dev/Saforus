import {
  CompanyInformationName,
  CompanyInforValidation,
  ValidationSchema,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import { object, string } from 'yup';

export const formFields: {
  name: CompanyInformationName;
  label: string;
  isRequired?: boolean;
  control?: JSX.Element;
}[] = [
  {
    name: 'companyName',
    label: 'myaccount.company-information.company-name',
    isRequired: true,
  },
  {
    name: 'countryOfIncorporation',
    label: 'myaccount.company-information.country-incorporation',
    isRequired: true,
  },
  {
    name: 'companyUrl',
    label: 'myaccount.company-information.company-url',
  },
  {
    name: 'zipPostalCode',
    label: 'myaccount.company-information.zip-code',
  },
  {
    name: 'streetAddress',
    label: 'myaccount.company-information.street-address',
  },
  {
    name: 'city',
    label: 'myaccount.company-information.city',
  },
  {
    name: 'stateProvince',
    label: 'myaccount.company-information.state-province',
  },
];

const companyInfoValidationSchema: ValidationSchema<CompanyInforValidation> = {
  companyName: string().required('Storage name is required'),
  countryOfIncorporation: string().required('Package name is required'),
  companyUrl: string(),
  zipPostalCode: string(),
  streetAddress: string(),
  city: string(),
  stateProvince: string(),
};

export const validationSchema = object().shape(companyInfoValidationSchema);
