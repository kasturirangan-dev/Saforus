import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { GetOrderInfo } from './view/get-order-info';
import { CreateOrderInfo } from './view/create-order-info';

export function DetectionApiContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.detection.title')]}
      description={t('csApi.detection.description')}
    >
      {/* Create Piracy Detection Flow */}
      <GuideSection
        id="create-order-flow"
        label={t('csApi.detection.create.title')}
      >
        <CreateOrderInfo />
      </GuideSection>

      {/* Get Piracy Detection FLow*/}
      <GuideSection id="get-order-flow" label={t('csApi.detection.get.title')}>
        <GetOrderInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default DetectionApiContainer;
