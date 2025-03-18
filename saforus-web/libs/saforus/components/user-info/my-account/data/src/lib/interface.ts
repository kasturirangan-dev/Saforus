import { UseFormRegister } from 'react-hook-form';
import { StringSchema } from 'yup';

export interface IUserDetailResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: Data;
}

export interface Data {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  mobileNumber: any;
  hasSubscribedEmailUpdate: boolean;
  timeZone: any;
  timeZoneName: any;
  status: string;
  currentSessionStartedAt: string;
  countryId: number;
  countryCode: number;
  countryShortName: string;
  countryName: string;
  companyId: number;
  companyName: string;
  companyUrl: string;
  teamName: string;
  teamDescription: string;
  teamOwnerName: string;
  languageCode: string;
  teamId: number;
  teamOwnerEmail: string;
  userRole: string;
  subscriptionId: any;
  subscriptionPlanName: any;
}

export interface LoginInformationType {
  avatar: string;
  fileCloudPath: string;
  userName: string;
  loginId: string;
  mobileNumber: string;
  companyName: string;
  companyUrl: string;
  countryOfIncorporation: string;
  fullName: string;
  timeZone: string;
  languageCode: string;
  countryCode: string | number;
  countryShortName: string;
  countryName: string;
  hasSubscribedEmailUpdate: boolean;
  timeZoneName: string;
  currentSessionStartedAt: string;
  emailSubscriptionOnOffAt: string;
  userRole: string;
}

export interface CompanyInformationType {
  companyName: string;
  countryOfIncorporation: string;
  companyUrl: string;
  zipPostalCode: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
}

export interface TeamInformationType {
  teamName: string;
  teamOwner: string;
  teamServicePlan: string;
  teamDescription: string;
}

export interface EmailSubscriptionType {
  email: string;
  receiveNotification: boolean;
}

export interface LanguageAndRegionType {
  language: string;
  timezone: string;
}

export type ValidationSchema<T> = {
  [K in keyof T]: T[K] extends string ? StringSchema : never;
};

type LoginInformationName = keyof LoginInformationType;

export function getFieldRegisterLoginInfo(
  registerFn: UseFormRegister<LoginInformationType>,
  fieldName: LoginInformationName
) {
  return registerFn(fieldName);
}

export type LoginInForValidation = Omit<LoginInformationType, 'avatar'>;

export type CompanyInformationName = keyof CompanyInformationType;

export type TeamInformationName = keyof TeamInformationType;

export function getFieldRegisterCompanyInfo(
  registerFn: UseFormRegister<CompanyInformationType>,
  fieldName: CompanyInformationName
) {
  return registerFn(fieldName);
}

export function getFieldRegisterTeamInfo(
  registerFn: UseFormRegister<TeamInformationType>,
  fieldName: TeamInformationName
) {
  return registerFn(fieldName);
}

export interface IUpdateUserInfoRequest {
  fullName: string;
  mobileNumber: string;
  hasSubscribedEmailUpdate: boolean;
  timeZone: string;
  timeZoneName: string;
  languageCode: string;
  countryCode: number;
  countryShortName: string;
  countryName: string;
  companyId: number;
  companyName: string;
  companyUrl: string;
}

export interface Country {
  countryCode: string;
  shortName: string;
  country: string;
  label?: string;
  value?: string;
}

export type CompanyInforValidation = CompanyInformationType;

export type TeamInforValidation = TeamInformationType;

export const LIMIT_ENTER_CURRENT_PASSWORD = 5;