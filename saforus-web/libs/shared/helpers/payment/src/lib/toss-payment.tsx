import { useEffect, useState } from 'react';
import {
  loadTossPayments,
  TossPaymentsPayment,
} from '@tosspayments/tosspayments-sdk';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const useInitializeToss = (customerKey: string | undefined) => {
  const clientKey = getEnvVar('VITE_TOSS_CLIENT_KEY');
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    if (!clientKey || !customerKey) return;

    const fetchPayment = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const paymentInstance = tossPayments.payment({ customerKey });
        setPayment(paymentInstance);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };

    fetchPayment();
  }, [clientKey, customerKey]);

  return { payment };
};

export default useInitializeToss;
