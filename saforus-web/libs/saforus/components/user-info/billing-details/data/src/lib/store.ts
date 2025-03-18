import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { Address, Country, ResponseInvoices, SubscriptionPlan } from './type';
import { cloneDeep } from 'lodash-es';

type StoreState = {
  billingAddress: Address | null;
  paymentHistories: ResponseInvoices | null;
  subscriptionDetail: SubscriptionPlan | null;
  countries: Country[];
};

type Actions = {
  setBillingAddress: (address: Address) => void;
  setPaymentHistories: (invoices: ResponseInvoices) => void;
  setSubscriptionDetail: (subscription: SubscriptionPlan) => void;
  setCountry: (countries: Country[]) => void;
  resetStore: () => void;
};

const initialState: StoreState = {
  billingAddress: null,
  paymentHistories: null,
  subscriptionDetail: null,
  countries: [],
};

function createStore() {
  const store: StoreState = {
    ...initialState,
  };
  return store;
}

const BillingDetailStore = proxy<StoreState>(createStore());

export const BillingDetailStoreActions: Actions = {
  setBillingAddress: (address: Address) => {
    BillingDetailStore.billingAddress = address;
  },
  setPaymentHistories: (invoices: ResponseInvoices) => {
    BillingDetailStore.paymentHistories = invoices;
  },
  setSubscriptionDetail: (subscription: SubscriptionPlan) => {
    BillingDetailStore.subscriptionDetail = subscription;
  },
  setCountry: (countries: Country[]) => {
    BillingDetailStore.countries = countries;
  },
  resetStore: () => {
    const resetState = cloneDeep(initialState);
    Object.assign(BillingDetailStore, resetState);
  },
};

devtools(BillingDetailStore, { name: 'BILLING_DETAIL' });

export default BillingDetailStore;
