export interface Plan {
  transactionId: string | null;
  id: number;
  title: string;
  codeName: string;
  description: string;
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
  paymentPlanId: string;
  paymentPriceId: string;
  createdBy: Date | null | number;
  createdAt: Date | null;
  updatedBy: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  isNewSubscriptionAllowed: boolean;
  isItCurrentPlanOfUser: boolean;
  subscriptionCostType: string;
  isDraft: boolean;
}

export interface ServicePlanResponse {
  data: Plan[];
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
}

export interface SubscriptionResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: null;
  data: {
    subscriptionId: number;
    subscriptionPlanId: number;
    subscriptionStatus: string;
    link: any;
  };
}

export interface SubscriptionArgs {
  planId: number;
  teamId: number | null;
}

export interface UpdateSubscriptionArgs {
  oldPlanId: number;
  newPlanId: number;
  teamId: number | null;
}
