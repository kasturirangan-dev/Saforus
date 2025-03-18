import {
  ApiResponseData,
  CardInfo,
} from '@web-workspace/api-console/common/model';

export interface PaymentCardsResponse extends ApiResponseData {
  data: CardInfo[];
}
