import { UseFormRegister } from 'react-hook-form';

export interface CompanyInfo {
  id: string;
  name: string;
  selectedLanguageIndex: 0,
  selectedLanguage: 'KO',
  countryCode: string;
  country: string;
  shortName: string;
  companyUrl: string;
  zipCodeOrPostCode: string;
  streetAddress: string;
  city: string;
  stateOrProvince: string;
  createdAt: string | Date;
}


export interface UserInfo {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  companyInfo: CompanyInfo;
  emailSubscriptionEnable: boolean;
  subscriptionAt: string | Date;
  createdAt: string | Date;
}

type UserInfoFieldName = keyof UserInfo;

export function getFieldRegister(
  registerFn: UseFormRegister<UserInfo>,
  fieldName: UserInfoFieldName
) {
  return registerFn(fieldName);
}
