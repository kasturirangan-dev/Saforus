export enum PLAN_TYPE {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export interface PlanInfo {
  id: string;
  productCode: string;
  planType: string;
  price: string;
  currency: string;
  billingType: string;
  status: string;
  moreInfo: {
    fileQtyLimit?: number;
    storageInBytes?: number;
    fileSizeLimitInBytes?: number;
    detectablePeriodInMonths?: number;
    detectionApiPriceKRW?: number;
    watermarkApiPriceKRW?: number;
  };
}

export interface CardInfo {
  id: string;
  cardCompany: string;
  cardNumber: string;
  authenticatedAt: string;
  isDefault: boolean;
}

export interface SubscriptionDetail {
  id: string;
  productCode: string;
  status: string;
  billingStartDate: Date | string;
  nextPayDate: Date | string;
  amount: number | string;
  plan: PlanInfo;
  cancelledAt?: Date | string;
  paymentCards?: CardInfo[];
  moreInfo?: {
    paymentFailedCount?: number;
    isFreeUpgradeBillingCycle?: boolean;
  };
}
