import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { WatermarkingInfo } from './view/watermarking-info';
import { DetectionInfo } from './view/detection-info';
import { WebhookInfo } from './view/webhook-info';
import { StartInfo } from './view/start-info';

export function IntegrationQuickStartContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('apiIntegration.title'), t('quickStart.title')]}
      description={t('quickStart.description')}
    >
      {/* get-start */}
      <GuideSection id="get-start" label={t('quickStart.get-start.title')}>
        <StartInfo />
      </GuideSection>

      {/* Watermarking */}
      <GuideSection
        id="watermarking"
        label={t('quickStart.watermarking.title')}
      >
        <WatermarkingInfo />
      </GuideSection>

      {/* Detection */}
      <GuideSection id="detection" label={t('quickStart.detection.title')}>
        <DetectionInfo />
      </GuideSection>

      <GuideSection id="webhook" label={t('quickStart.webhook.title')}>
        <WebhookInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default IntegrationQuickStartContainer;
