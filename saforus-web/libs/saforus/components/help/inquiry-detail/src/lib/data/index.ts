import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { BaseResponseInquiries, INQUIRY_QUERY_KEY, MyInquiriesStore, fetchInquiryDetail } from '@web-workspace/saforus/components/help/data';

export function useInquiryDetailData(inquiryNo: any) {
  const { setCurrentInquiry, setCurrentInquiryId } = useSnapshot(MyInquiriesStore);
  const { isLoading, isError, data } = useQuery<
    unknown,
    Error,
    BaseResponseInquiries
  >({
    queryKey: [INQUIRY_QUERY_KEY.INQUIRY_DETAIL, inquiryNo],
    queryFn: async () => {
      if (inquiryNo) {
        return fetchInquiryDetail(inquiryNo);
      }
      return null;
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setCurrentInquiry(data.data);
      setCurrentInquiryId(data.resourceId);
    }
    if (isError) {
      setCurrentInquiry(null);
      setCurrentInquiryId(-1);
    }
  }, [isLoading, data, isError]);

  return { isLoading };
}
