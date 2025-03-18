// Request to get Billings and Invoices
export interface StripePagination {
  afterCursor?: string;
  beforeCursor?: string;
  limit: number;
}

export interface RequestInvoices extends StripePagination {
  userSubscriptionId: number | string;
}

// RESPONSE OF BILLINGS AND INVOICES
interface InvoiceItem {
  amount: number;
  currency: string;
  dateIssued: number;
  id: string;
  interval: string;
  intervalCount: number;
  invoiceNumber: string;
  invoiceUrl: string;
  servicePlan: string;
}

export interface Address {
  id: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
  email: string;
  name: string;
  phone: string;
}

interface Response<T> {
  hasMore: boolean;
  startCursor: string;
  endCursor: string;
  elementList: T[];
}

export type ResponseInvoices = Response<InvoiceItem>;

export type ResponseBilling = Response<Address>;

// REQUEST AND RESPONSE UPDATE BILLING ADDRESS
export interface UpdateBillingBody {
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
}

export interface StripeCallResponse {
  transactionId: string;
  httpStatus: '100 CONTINUE';
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: string;
}

// RESPONSE OF SUBSCRIPTION DETAIL
export interface SubscriptionDetailResponse extends StripeCallResponse {
  data: SubscriptionPlan;
}

export interface SubscriptionPlan {
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
  paymentServiceProvider: string;
}

export interface Country {
  countryCode: string;
  shortName: string;
  country: string;
  label: string;
  value: string;
}
