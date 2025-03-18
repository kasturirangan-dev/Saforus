import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import OrderDetailContainer from '@web-workspace/saforus/containers/piracy-detection/order-detail';
import { useTranslation } from 'react-i18next';

export function SaforusPagesPiracyOrderDetail() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.piracy-detection.order-detail.title')}
        desc={t('pageHeader.piracy-detection.order-detail.desc')}
      />
      <OrderDetailContainer />
    </div>
  );
}

export default SaforusPagesPiracyOrderDetail;
