import { useQuery, useQueryClient } from 'react-query';
import {
  QUERY_KEY,
  cancelPlan,
  getServicePlans,
  getSubscription,
  upgradePlan,
} from './api';
import {
  CardInfo,
  PlanInfo,
  PLAN_TYPE,
  SubscriptionDetail,
} from '@web-workspace/api-console/common/model';
import { useInitializeToss } from '@web-workspace/shared/helpers/payment';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import i18next from 'i18next';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ApiResponseStatus } from '@web-workspace/api-bo/common/model';
import { useTranslation } from 'react-i18next';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { formatBillingDate } from '@web-workspace/shared/helpers/dates';
import { PLAN_RANK } from './utils';
import { getSupportedSize } from '@web-workspace/api-console/components/file-upload';
import { useRefreshTokenData } from '@web-workspace/api-console/components/layouts/main-layout';

export const useServicePlanData = () => {
  // Use local storage to initialize plans
  // Prevent blinking after return from billing auth
  const initializePlans = () => {
    const plans = localStorage.getItem('plans');
    return plans ? JSON.parse(plans) : [];
  };
  const [plans, setPlans] = useState<PlanInfo[]>(initializePlans);

  const { isLoading: isPlanLoading } = useQuery({
    queryKey: QUERY_KEY.SERVICE_PLAN,
    queryFn: async () => {
      return getServicePlans();
    },
    onSuccess: (response) => {
      let plans = response?.data ?? [];
      plans = plans.sort(
        (a, b) => PLAN_RANK[a.planType] - PLAN_RANK[b.planType]
      );

      // SF-4024 For the upcoming official launch, we will update only text on FE side, then after the launch, we will handle on BE side later
      plans = plans.map((plan) => {
        return {
          ...plan,
          moreInfo: {
            ...plan.moreInfo,
            fileSizeLimitInBytes:
              plan.planType === PLAN_TYPE.ENTERPRISE
                ? plan.moreInfo?.fileSizeLimitInBytes
                : getSupportedSize(plan.planType), // Custom supported size limit
          },
        };
      });

      setPlans(plans);
      localStorage.setItem('plans', JSON.stringify(plans));
    },
  });

  return {
    isPlanLoading: isPlanLoading && plans.length === 0,
    plans,
  };
};

export const usePaymentData = () => {
  const { t } = useTranslation();
  const { userInfo, tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const { refreshToken } = useRefreshTokenData();
  const subscriptionId = userInfo?.subscription?.id || '';
  const { openDialog, closeDialog } = useSnapshot(DialogStore);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { payment } = useInitializeToss(userInfo?.id);
  const PaymentPath = window.location.origin + window.location.pathname;

  // Get current user's plan
  const [currentPlan, setCurrentPlan] = useState<SubscriptionDetail | null>(
    userInfo?.subscription
  );
  const [card, setCard] = useState<CardInfo | null>(null);
  const { isLoading } = useQuery({
    queryKey: QUERY_KEY.SUBSCRIPTION,
    queryFn: async () => {
      return getSubscription(subscriptionId);
    },
    onSuccess: (response) => {
      const currentPlan = response?.data;
      const card =
        currentPlan?.paymentCards?.find((card) => card.isDefault) ?? null;
      setCurrentPlan(currentPlan);
      setCard(card);
    },
  });

  // Subscribe to a plan
  const onSubscribe = async (plan: PlanInfo) => {
    if (!card) {
      // With no CardInfo, create a billing auth
      if (!payment) {
        showToast.error('TossPayments setup failed');
        return;
      }
      await payment.requestBillingAuth({
        method: 'CARD',
        successUrl: `${PaymentPath}?billing=success&planId=${plan.id}&amount=${plan.price}&currency=${plan.currency}`, // handel in same path
        failUrl: PaymentPath + '?billing=fail', // handel in same path
        customerEmail: userInfo?.email,
        customerName: userInfo?.accountName,
      });
    } else {
      upgrade(plan, card);
    }
  };

  const upgrade = async (plan: PlanInfo, card: CardInfo) => {
    // Loading state
    openDialog({
      name: DialogType.CsApiPlanInfo,
      props: {
        plan: plan,
        currentPlan: currentPlan,
        isLoading: true,
      },
    });

    const reqData = {
      planId: plan.id,
      amount: parseInt(plan.price),
      currency: plan.currency,
      cardId: card.id,
      accountId: userInfo?.id,
    };

    let response;
    try {
      response = await upgradePlan(subscriptionId as string, reqData);
    } catch (e) {
      response = null;
    }

    if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
      refetchData();
      closeDialog();
    } else {
      openDialog({
        name: DialogType.SubscriptionResult,
        props: {
          status: 'failed',
          subscriptionType: 'upgrade',
          code: response?.code,
        },
      });
    }
  };

  // Subscribe to a plan after billing auth
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const billing = paramsAsObject.billing;
  useEffect(() => {
    if (billing === 'success') {
      upgradeWithBillinki();
    }
    if (billing === 'fail') {
      const code = paramsAsObject.code;
      const message = paramsAsObject.message;

      const match = message?.match(/^(.*)\(([^)]+)\)$/);
      const koreanText = match ? match[1] : message;
      const englishText = match ? match[2] : message;

      openDialog({
        name: DialogType.PaymentFail,
        props: {
          code,
          message: i18next.language === 'en' ? englishText : koreanText,
          onClose: () => {
            closeDialog();
            setSearchParams({});
          },
        },
      });
    }
  }, [billing]);

  const upgradeWithBillinki = async () => {
    // Loading state
    openDialog({
      name: DialogType.SubscriptionResult,
      props: {
        status: 'loading',
      },
    });

    const reqData = {
      authKey: paramsAsObject.authKey,
      planId: paramsAsObject.planId,
      amount: paramsAsObject.amount,
      currency: paramsAsObject.currency,
      accountId: userInfo?.id,
    };
    let response;
    try {
      response = await upgradePlan(subscriptionId, reqData);
    } catch (e) {
      response = null;
    }
    setSearchParams({});

    if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
      // Update user plan
      refetchData();
      openDialog({
        name: DialogType.SubscriptionResult,
        props: {
          status: 'success',
          onSuccess: () => {
            navigate(API_ROUTES.INSERT_WATERMARK.path);
          },
        },
      });
    } else {
      openDialog({
        name: DialogType.SubscriptionResult,
        props: {
          status: 'failed',
          subscriptionType: 'subscribe',
          code: response?.code,
        },
      });
    }
  };

  // Cancel a plan
  const onCancel = () => {
    openDialog({
      name: DialogType.Cancel,
      props: {
        title: t('apiServicePlan.planDetail.cancelTitle'),
        description: t('apiServicePlan.planDetail.cancelDescription', {
          plan: t(`apiServicePlan.plan.${currentPlan?.plan?.planType}`),
          endDate: formatBillingDate(
            currentPlan?.nextPayDate,
            tzOffset
          ).replace(/\//g, '--'),
        }).replace(/--/g, '/'), // Workaround for display '/'
        leaveTitle: t('apiServicePlan.planDetail.cancelSubscription'),
        stayTitle: t('apiServicePlan.planDetail.keepPlan'),
        onLeave: cancel,
        onStay: closeDialog,
      },
    });
  };

  const cancel = async () => {
    let response;
    try {
      response = await cancelPlan(subscriptionId);
    } catch (e) {
      response = null;
    }

    if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
      refetchData();
      openDialog({
        name: DialogType.CsApiPlanInfo,
        props: {
          plan: currentPlan?.plan,
          currentPlan: currentPlan,
          cancelledAt: new Date(),
        },
      });
    } else {
      showToast.error(response?.msg || 'Error');
    }
  };

  // View plan info
  const openPlanInfo = (plan: PlanInfo) => {
    if (plan.planType === PLAN_TYPE.ENTERPRISE)
      plan = currentPlan?.plan ?? plan;

    openDialog({
      name: DialogType.CsApiPlanInfo,
      props: {
        plan: plan,
        currentPlan: currentPlan,
        onSubscribe: onSubscribe,
        onCancel: onCancel,
        isLoading: false,
        cancelledAt: currentPlan?.cancelledAt,
      },
    });
  };

  const refetchData = () => {
    queryClient.invalidateQueries(QUERY_KEY.SUBSCRIPTION);
    refreshToken();
  };

  return {
    currentPlan,
    openPlanInfo,
    disabledAction: Boolean(currentPlan?.cancelledAt),
  };
};
