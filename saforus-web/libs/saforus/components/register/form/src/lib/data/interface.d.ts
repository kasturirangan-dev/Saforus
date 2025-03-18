export interface IUserInfoRequest {
  fullName: string;
  email: string;
  password: string;
  company: string;
  countryCode?: string | number;
  countryName?: string;
  countryShortName?: string;
  mobileNumber: string;
  languageCode: string;
  teamInvitationToken?: string | null | undefined;
  awsToken?: string | null | undefined; // for AWS
  hasSubscribedEmailUpdate?: boolean;
  token?: string | null | undefined; // for Google
  timeZone: string;
  timeZoneName: string;
}

export interface UserRegisterApi {
  postRegister: (
    params: IUserInfoRequest,
    isGoogleRegister: boolean
  ) => Promise<any>;
}

export interface Country {
  countryCode: string | number;
  shortName: string;
  country: string;
  label?: string;
  value?: string;
}
