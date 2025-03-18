export interface IUserInfoRequest {
  accountName: string;
  email: string;
  password: string;
  description?: string;
  companyName?: string;
  phone: string;
  zoneId: string;
  lang: string;
  receiveMarketingEmail: boolean;
}

export interface UserRegisterApi {
  postRegister: (params: IUserInfoRequest) => Promise<any>;
}

export interface Country {
  countryCode: string | number;
  shortName: string;
  country: string;
  label?: string;
  value?: string;
}
