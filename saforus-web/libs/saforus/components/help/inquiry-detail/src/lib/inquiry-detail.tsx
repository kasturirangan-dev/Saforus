import InquiryDetailView from './views/inquiry-detail-view';
import { useLocation } from 'react-router-dom';
import { useInquiryDetailData } from './data';

export function InquiryDetail() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const inquiryNo = parts[parts.length - 1];

  const { isLoading } = useInquiryDetailData(inquiryNo);
  return <InquiryDetailView isLoading={isLoading} inquiryId={inquiryNo} />;
}

export default InquiryDetail;
