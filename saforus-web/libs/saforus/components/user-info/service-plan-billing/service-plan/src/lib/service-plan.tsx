import { useBillingPlanViewData } from './data';
import ServicePlanView from './view';

function BillingPLanComponent() {
  const { isLoading, handleSubscription } = useBillingPlanViewData();

  return <ServicePlanView handleSubscription={handleSubscription} />;
}

export default BillingPLanComponent;
