import { useParams } from 'react-router-dom';
import { useInquiryDetailData } from './data';
import InquiryDetailView from './inquiry-detail-view';

export function InquiryDetail() {
  const { id: inquiryId } = useParams();

  const { isLoading, refetch } = useInquiryDetailData(inquiryId);
  return (
    <InquiryDetailView
      isLoading={isLoading}
      inquiryId={inquiryId!}
      refetch={refetch}
    />
  );
}

export default InquiryDetail;
