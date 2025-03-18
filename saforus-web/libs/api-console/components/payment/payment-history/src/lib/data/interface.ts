import {
  ApiResponseData,
  CardInfo,
  PlanInfo,
} from '@web-workspace/api-console/common/model';

export interface PaymentHistoryResponse extends ApiResponseData {
  data: Data;
}

interface Data {
  page: number;
  pageSize: number;
  total: number;
  records: PaymentDetail[];
}

export interface ViewPaymentQuery {
  page: number;
  pageSize: number;
}

export interface PaymentDetail {
  id?: string; //  for display in table
  orderId: string;
  orderName: string;
  totalAmount: number | string;
  currency: string;
  requestedAt?: Date | string;
  approvedAt?: Date | string;
  receipt?: {
    url: string;
  };
  checkout?: string;
  paymentMethod: CardInfo;
  plan: PlanInfo;
  status: string;
  billingStartedAt: Date | string;
  billingEndedAt: Date | string;
}
