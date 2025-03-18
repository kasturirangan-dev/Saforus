import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { GetOrderInfo } from './view/get-order-info';
import { CreateOrderInfo } from './view/create-order-info';

export function DetectionApiContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.watermarking.title')]}
      description={t('csApi.watermarking.description')}
    >
      {/* Create Watermarking Order Flow */}
      <GuideSection
        id="create-order-flow"
        label={t('csApi.watermarking.create.title')}
      >
        <CreateOrderInfo />
      </GuideSection>

      {/* Get Watermarking Order FLow*/}
      <GuideSection
        id="get-order-flow"
        label={t('csApi.watermarking.get.title')}
      >
        <GetOrderInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default DetectionApiContainer;
