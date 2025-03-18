import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import ForensicWatermarkingCreateContainer from '@web-workspace/saforus/containers/forensic-watermarking/create';
import { useTranslation } from 'react-i18next';

export function ForensicWatermarkingCreatePage() {
  const { t } = useTranslation();
  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.watermarking.create-order.title')}
        desc={t('pageHeader.watermarking.create-order.desc')}
      />
      <ForensicWatermarkingCreateContainer />
    </div>
  );
}

export default ForensicWatermarkingCreatePage;
