import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import OrderDetailContainer from '@web-workspace/saforus/containers/forensic-watermarking/order-detail';
import { useTranslation } from 'react-i18next';

export function SaforusPagesForensicWatermarkingOrderDetail() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.watermarking.order-detail.title')}
        desc={t('pageHeader.watermarking.order-detail.desc')}
      />
      <OrderDetailContainer />
    </div>
  );
}

export default SaforusPagesForensicWatermarkingOrderDetail;
