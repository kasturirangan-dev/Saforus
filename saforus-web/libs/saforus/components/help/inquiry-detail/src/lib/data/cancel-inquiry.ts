import { useState } from 'react';
import { INQUIRY_QUERY_KEY, cancelInquiry, MyInquiriesStore } from '@web-workspace/saforus/components/help/data';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useSnapshot } from 'valtio';

export function useCancelInquiryData() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { searchQuery } =
    useSnapshot(MyInquiriesStore);

  const onCancelInquiry = async (inquiryId: number) => {
    setLoading(true);
    try {
      const res = await cancelInquiry(inquiryId);
      if (res.resultCode === 202) {
        queryClient.invalidateQueries([INQUIRY_QUERY_KEY.INQUIRY_LIST, ...Object.values(searchQuery)]);
        queryClient.invalidateQueries(INQUIRY_QUERY_KEY.INQUIRY_DETAIL);
        showToast.error(t('help.inquiry-detail.cancel-inquiry-successful'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, onCancelInquiry };
}
