import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { postRequestPiracyDetection } from './api';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useTranslation } from 'react-i18next';

export function useRequestExpertDetectionData(orderId: any) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const onRequestExpertDetection = async () => {
    setLoading(true);
    try {
      const res = await postRequestPiracyDetection(orderId);
      if (res.resultCode === 200 || res.status === 200) {
        queryClient.invalidateQueries('PIRACY_ORDER_DETAIL');
      } else if (res.resultCode === 402012 || res.status === 402012) {
        showToast.error(`${t('piracy-order-view.order-detail.failed-to-request-expert')}`,
          {
            delay: 0,
          });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, onRequestExpertDetection };
}
