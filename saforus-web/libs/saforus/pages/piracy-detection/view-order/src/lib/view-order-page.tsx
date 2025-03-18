import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import PiracyViewOrderContainer from '@web-workspace/saforus/containers/piracy-detection/view-order';
import { useTranslation } from 'react-i18next';

export function PiracyViewOrderPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.piracy-detection.view-orders.title')}
        desc={t('pageHeader.piracy-detection.view-orders.desc')}
      />
      <PiracyViewOrderContainer />
    </div>
  );
}

export default PiracyViewOrderPage;
