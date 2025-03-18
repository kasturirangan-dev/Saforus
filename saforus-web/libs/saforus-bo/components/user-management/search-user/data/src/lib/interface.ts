export const enum UserType {
  Master = 'TEAM_OWNER',
  Member = 'TEAM_EDITOR',
  Viewer = 'TEAM_VIEWER',
  PrivateUser = 'PRIVATE_USER',
}

export const enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export const enum UserSubscription {
  Free = 'FREE',
  Standard = 'STANDARD',
  Enterprise = 'ENTEPRISE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  teamName?: string | null;
  subscription?: string | null;
  status: UserStatus;
  joinedDate: Date | string;
}
export interface ResponseSearchAndList {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: DataSearchAndList;
}

export interface DataSearchAndList {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: UserInformation[];
}
export interface RequestSearchAndList {
  nameOrEmail: string;
  userType: string;
  // teamName: string;
  // teamId: string;
  subscriptionPlanName: string;
  status: string;
  joinedDateStart: Date | string;
  joinedDateEnd: Date | string;
  pageNo: number;
  sortBy: string;
  sortOrder: string;
  elementPerPage: number;
}

export interface UpdateUserInformationRequest {
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
export interface UserInformationResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: UserInformation;
}

export interface UserInformation {
  userId: number;
  avatar: string;
  id: number;
  userName: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  hasSubscribedEmailUpdate: boolean;
  timeZone: string;
  timeZoneName: string;
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
  subscriptionId: number;
  subscriptionPlanName: string;
  joinedDate: string;
}

export interface UserPlanDetail {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: any;
  data: PlanDetailList[];
}

export interface PlanDetailList {
  subscriptionPlanId: number;
  title: string;
  codeName: string;
  description: string;
  subscriptionCostType: string;
  paymentInterval: string;
  price: number;
  currency: string;
  noOfTeams: number;
  noOfMembersPerTeam: number;
  cloudStorageSize: number;
  wtrCapacitySize: number;
  wtrCodeMinValue: number;
  wtrCodeMaxValue: number;
  noOfDownloadsPerOrder: number;
  downloadValidityInDays: number;
  noOfPdAllowed: number;
  cloudStorageAddOnSize: number;
  cloudStorageAddOnPrice: number;
  wtrCapacityAddOnSize: number;
  wtrCapacityAddOnPrice: number;
  userSubscriptionId: number;
  subscribingUserId: number;
  teamId: number;
  subscriptionStatus: string;
  invoiceNumber: string;
  paymentDate: string;
  subscriptionStartedAt: string;
  subscriptionEndsAt: string;
  subscribingAmount: number;
  subscribingAmountUnit: string;
  hostedInvoiceUrl: string;
  invoicePdfUrl: string;
  subscribedAt: string;
  subscriptionUpdatedAt: string;
  uiDisplayOrder: number;
}

export interface Country {
  countryCode: number | string;
  shortName: string;
  country: string;
  label?: string;
  value?: string;
}