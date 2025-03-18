import { proxy, subscribe } from 'valtio';
import { devtools } from 'valtio/utils';
import { SubscriptionPlanDetail } from './interface';
import { differenceDays } from '@web-workspace/shared/helpers/dates';

export const enum SubscriptionStatus {
  ACTIVE = 'active',
  NO_ACTIVE = 'no-active',
  EXPIRED = 'expired',
}
interface SubscriptionState {
  status: SubscriptionStatus;
  setStatus: (status: SubscriptionStatus) => void;
  subscriptionPlanDetail: SubscriptionPlanDetail | null;
  setSubscriptionPlanDetail: (
    subscription: SubscriptionPlanDetail | null
  ) => void;
  setSubscriptionData: (
    planDetail: SubscriptionPlanDetail,
    subscriptionPlanStatus: string
  ) => void;
}

const localSubscription = localStorage.getItem('subscription');
const UseSubscription = proxy<SubscriptionState>({
  status: localSubscription ? JSON.parse(localSubscription)?.status : SubscriptionStatus.ACTIVE,
  setStatus: (status) => {
    UseSubscription.status = status;
  },
  subscriptionPlanDetail: localSubscription
    ? JSON.parse(localSubscription)?.subscriptionPlanDetail
    : null,
  setSubscriptionPlanDetail: (subscription: SubscriptionPlanDetail | null) => {
    UseSubscription.subscriptionPlanDetail = subscription;
  },
  setSubscriptionData: (
    planDetail: SubscriptionPlanDetail,
    subscriptionPlanStatus: string
  ) => {
    if (planDetail) {
      const numberOfDay = differenceDays(
        new Date(),
        planDetail?.subscriptionEndsAt
      );
      if (numberOfDay >= 0) {
        UseSubscription.setStatus(SubscriptionStatus.ACTIVE);
      }
      UseSubscription.setSubscriptionPlanDetail(
        planDetail as SubscriptionPlanDetail
      );
    } else {
      UseSubscription.setStatus(SubscriptionStatus.NO_ACTIVE);
      UseSubscription.setSubscriptionPlanDetail(null);
    }
    if (subscriptionPlanStatus === 'expired') {
      UseSubscription.setStatus(SubscriptionStatus.EXPIRED);
    }
  },
});

subscribe(UseSubscription, () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('subscription', JSON.stringify(UseSubscription));
  }
});
devtools(UseSubscription, { name: 'SubscriptionStore' });
export default UseSubscription;
