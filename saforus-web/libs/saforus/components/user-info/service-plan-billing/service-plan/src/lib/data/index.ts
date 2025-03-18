import { useSnapshot } from 'valtio';
import { useMutation, useQuery } from 'react-query';
import {
  BILLING_QUERY_KEY,
  BillingStore,
  getSubscriptionsPlan,
  ServicePlanResponse,
  SubscriptionArgs,
} from '@web-workspace/saforus/components/user-info/service-plan-billing/data';
import { useEffect } from 'react';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import CommonStore from '@web-workspace/saforus/common/data';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

export function useBillingPlanViewData() {
  const {
    plans,
    yearlyBilling,
    setPlans,
    setPlanId,
    setTeamId,
    subscription,
    setLoading,
  } = useSnapshot(BillingStore);

  const { t, i18n } = useTranslation();

  const { setTeam } = useSnapshot(UserTeamStore);
  const { userInfo, clearAuthState } = useSnapshot(AuthStore);

  const navigate = useNavigate();
  const { isLoading, isError, data, error, refetch } = useQuery<
    unknown,
    Error,
    ServicePlanResponse
  >({
    queryKey: [
      BILLING_QUERY_KEY.SUBSCRIPTIONS_PLAN,
      yearlyBilling,
      // ...Object.values(plans),
      i18n,
    ],
    queryFn: async () => {
      return getSubscriptionsPlan(
        yearlyBilling ? '?paymentInterval=year' : '?paymentInterval=month'
      );
    },
  });

  const { mutate: subscribePlan } = useMutation(
    ({ teamId, planId }: SubscriptionArgs) => subscription(planId, teamId),
    {
      onSuccess: (data) => {
        if (data?.data) {
          if (data?.data?.link) {
            window.location.href = data.data.link;
          } else {
            showToast.success(t('servicePlan.subscription.subscribe-success'));
            DialogStore.openDialog({
              name: DialogType.LogoutOnSubscribeSuccess,
              props: {
                onLogout: () => {
                  setTeam();
                  clearAuthState();
                  navigate(ROUTES.LOGIN.path, { replace: true });
                },
                planType: data.data.link, // if no link then its free plan
              },
            });
          }
        }
      },
      onError(error) {
        if (
          error?.status &&
          (error?.status === '409010' || error?.status === 409010)
        ) {
          showToast.warning(
            t('servicePlan.subscription.subscription-fail-waiting')
          );
        } else {
          showToast.warning(t('servicePlan.subscription.subscription-fail'));
        }
      },
    }
  );

  const handleSubscription = (planId: number, teamId: number | null) => {
    setPlanId(planId);
    subscribePlan({ teamId, planId });
  };

  useEffect(() => {
    if (!isLoading && data && !isError) {
      if (data?.data) {
        setPlans(data);
      }
    }
    setLoading(isLoading);

    userInfo?.teamDetailList?.length &&
      setTeamId(userInfo?.teamDetailList[0]?.id);
  }, [isLoading, data, isError]);

  return {
    isLoading,
    handleSubscription,
  };
}
