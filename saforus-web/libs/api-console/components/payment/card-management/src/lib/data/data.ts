import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  QUERY_KEY,
  getPaymentCards,
  addCard,
  markDefault,
  deleteCard,
} from './api';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { useInitializeToss } from '@web-workspace/shared/helpers/payment';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ApiResponseStatus,
  CardInfo,
} from '@web-workspace/api-console/common/model';

export const usePaymentCardsData = () => {
  const { t } = useTranslation();
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const subscriptionId = userInfo?.subscription?.id || '';
  const queryClient = useQueryClient();
  const { payment } = useInitializeToss(userInfo?.id);
  const PaymentCardPath = window.location.origin + window.location.pathname;

  // Fetch payment card data
  const [cards, setCards] = useState<CardInfo[]>([]);
  const { isFetching } = useQuery({
    queryKey: QUERY_KEY.PAYMENT_CARD,
    queryFn: () => getPaymentCards(subscriptionId),
    onSuccess: (response) => {
      setCards(response?.data || []);
    },
  });

  // Add new payment card: create a billing auth
  const requestBillingAuth = async () => {
    if (!payment) {
      showToast.error('TossPayments setup failed');
      return;
    }

    await payment.requestBillingAuth({
      method: 'CARD',
      successUrl: `${PaymentCardPath}?billing=success`, // Handle in the same path
      failUrl: `${PaymentCardPath}?billing=fail`, // Handle in the same path
      customerEmail: userInfo?.email,
      customerName: userInfo?.accountName,
    });
  };

  // Add payment card after billing auth
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const billing = paramsAsObject.billing;

  useEffect(() => {
    if (billing === 'success') {
      addCardMutation(paramsAsObject.authKey);
    }
    if (billing === 'fail') {
      showToast.error(t('apiPaymentManagement.msg.card-added-failed'));
    }
    setSearchParams({});
  }, [billing]);

  // Add card mutation
  const { mutate: addCardMutation, isLoading: isAdding } = useMutation(
    (authKey: string) => {
      const reqData = { authKey, isDefault: false };
      return addCard(subscriptionId, reqData);
    },
    {
      onSuccess: (response) => {
        if (response?.code.endsWith(ApiResponseStatus.SUCCESS)) {
          showToast.success(t('apiPaymentManagement.msg.card-added'));
          refetchPaymentCards();
        } else {
          showToast.error(t('apiPaymentManagement.msg.card-added-failed'));
        }
      },
    }
  );

  // Mark default card mutation
  const { mutate: markDefaultMutation, isLoading: isMarking } = useMutation(
    (cardId: string) => markDefault(subscriptionId, cardId),
    {
      onSuccess: (response, cardId) => {
        if (response?.code.endsWith(ApiResponseStatus.SUCCESS)) {
          const updateData = cards.map((card) => ({
            ...card,
            isDefault: card.id === cardId,
          }));
          setCards(updateData);
        } else {
          showToast.error(response?.msg || 'Error marking default card');
        }
      },
    }
  );

  // Delete card mutation
  const { mutate: deleteCardMutation, isLoading: isDeleting } = useMutation(
    (cardId: string) => deleteCard(subscriptionId, cardId),
    {
      onSuccess: (response, cardId) => {
        if (response?.code.endsWith(ApiResponseStatus.SUCCESS)) {
          const updateData = cards.filter((card) => card.id !== cardId);
          setCards(updateData);
          showToast.success(t('apiPaymentManagement.msg.card-remove'));
        } else {
          showToast.error(t('apiPaymentManagement.msg.card-remove-failed'));
        }
      },
    }
  );

  // Refetch payment Cards
  const refetchPaymentCards = () => {
    queryClient.invalidateQueries(QUERY_KEY.PAYMENT_CARD);
  };

  return {
    cards,
    addCard: requestBillingAuth,
    markDefaultCard: markDefaultMutation,
    deleteCard: deleteCardMutation,
    loading: isFetching || isAdding || isMarking || isDeleting,
  };
};
