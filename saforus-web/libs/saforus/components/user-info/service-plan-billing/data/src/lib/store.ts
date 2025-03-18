import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { Plan, ServicePlanResponse, SubscriptionResponse } from './interface';
import { subscribePlan, updateSubscription } from './api';

interface BillingPlanStoreType {
  plans: Plan[];
  yearlyBilling: boolean;
  subscriptionInformation: {
    subscriptionPlanId: number;
    teamId: number | null;
  };
  plansLoading: boolean;
  subscription: (
    planId: number,
    teamId: number | null
  ) => Promise<SubscriptionResponse>;
  updateSubscription: ({
    oldPlanId,
    newPlanId,
    teamId,
  }: {
    oldPlanId: number;
    newPlanId: number;
    teamId: number | null;
  }) => Promise<SubscriptionResponse>;
  setLoading: (loading: boolean) => void;
  setPlans: (data: ServicePlanResponse) => Promise<void>;
  setYearlyBilling: (yearlyBilling: boolean) => void;
  setPlanId: (planId: number) => void;
  setTeamId: (teamId: number | null) => void;
}

const BillingStore = proxy<BillingPlanStoreType>(createStore());

function createStore() {
  const store: BillingPlanStoreType = {
    plans: [] as Plan[],
    yearlyBilling: false,
    plansLoading: false,
    subscriptionInformation: {
      subscriptionPlanId: 0,
      teamId: 0,
    },
    subscription: async (planId, teamId) => {
      const response = await subscribePlan({ planId, teamId });
      return response;
    },
    updateSubscription: async ({ oldPlanId, newPlanId, teamId }) => {
      const response = await updateSubscription({
        oldPlanId,
        newPlanId,
        teamId,
      });
      return response;
    },
    setLoading: (loading: boolean) => {
      BillingStore.plansLoading = loading;
    },
    setPlans: async (response: ServicePlanResponse) => {
      BillingStore.plans = response.data;
    },
    setYearlyBilling: (yearlyBilling: boolean) => {
      BillingStore.yearlyBilling = yearlyBilling;
    },
    setPlanId: (planId: number) => {
      BillingStore.subscriptionInformation.subscriptionPlanId = planId;
    },
    setTeamId: (teamId: number | null) => {
      BillingStore.subscriptionInformation.teamId = teamId;
    },
  };
  return store;
}

devtools(BillingStore, { name: 'BILLING_PLAN' });

export default BillingStore;
