import {
  ApiResponseData,
  PlanInfo,
  SubscriptionDetail,
} from '@web-workspace/api-console/common/model';

export interface PlansResponse extends ApiResponseData {
  data: PlanInfo[];
}

export interface SubscriptionResponse extends ApiResponseData {
  data: SubscriptionDetail;
}
