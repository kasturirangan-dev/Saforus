import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import ViewOrderContainer from '@web-workspace/saforus/containers/forensic-watermarking/view-order';
import { useTranslation } from 'react-i18next';

export function ForensicWatermarkingViewOrderPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.watermarking.search-order.title')}
        desc={t('pageHeader.watermarking.search-order.desc')}
      />
      <ViewOrderContainer />
    </div>
  );
}

export default ForensicWatermarkingViewOrderPage;
