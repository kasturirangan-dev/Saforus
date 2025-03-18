import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import webhookImgKr from './assets/webhook_kr.png';
import webhookImgEn from './assets/webhook_en.png';
import { ApiDomain } from './view/api-domain';

export function TermDefinitionContainer() {
  const { t, i18n } = useTranslation();

  return (
    <GuideLayout
      guide={[t('termDefiniton.title')]}
      description={t('termDefiniton.description')}
    >
      {/* Application */}
      <GuideSection
        id="application"
        label={t('termDefiniton.application.title')}
      >
        {t('termDefiniton.application.content-1')}
      </GuideSection>

      {/* Access Token */}
      <GuideSection
        id="access-token"
        label={t('termDefiniton.access-token.title')}
      >
        {t('termDefiniton.access-token.content-1')}
      </GuideSection>

      {/* API */}
      <GuideSection id="api" label={t('termDefiniton.api.title')}>
        {t('termDefiniton.api.content-1')}
      </GuideSection>

      {/* API Domain */}
      <GuideSection id="api-domain" label={t('termDefiniton.api-domain.title')}>
        <TextContent>{t('termDefiniton.api-domain.content-1')}</TextContent>
        <ApiDomain label="{{STAGING API_DOMAIN}}" value="https://stag-cs.saforus.com" />
        <TextContent>{t('termDefiniton.api-domain.content-2')}</TextContent>
        <ApiDomain label="{{PRODUCTION API_DOMAIN}}" value="https://cs.saforus.com" />
      </GuideSection>

      {/* Webhook */}
      <GuideSection id="webhook" label={t('termDefiniton.webhook.title')}>
        <TextContent>{t('termDefiniton.webhook.content-1')}</TextContent>
        <img src={i18n.language === 'ko' ? webhookImgKr : webhookImgEn} alt={'webhook'} width={'100%'} />
      </GuideSection>

      {/* Idempotency */}
      <GuideSection
        id="idempotency"
        label={t('termDefiniton.idempotency.title')}
      >
        {t('termDefiniton.idempotency.content-1')}
      </GuideSection>
    </GuideLayout>
  );
}

export default TermDefinitionContainer;
