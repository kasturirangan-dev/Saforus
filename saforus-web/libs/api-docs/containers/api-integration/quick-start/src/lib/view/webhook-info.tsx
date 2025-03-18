import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { useTranslation } from 'react-i18next';
import {
  CollapseSection,
  GuideCard,
  SectionContent,
} from '@web-workspace/api-docs/components/guides/section';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export const WebhookInfo = () => {
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  return (
    <>
      <SectionContent
        contentKey="quickStart.webhook.content-1"
        link={linkSupport}
      />
      <ApiSpecification
        requestSpec="specifications.webhookCreateRequest"
        responseSpec="specifications.webhookCreateResponse"
      />
      <CollapseSection label={t('apiIntegration.example-code.title')}>
        <CodeView
          title={t('apiIntegration.example-code.request') || ''}
          codes={t('codeExamples.webhookCreate', {
            returnObjects: true,
          })}
        />
        <CodeView
          title={t('apiIntegration.example-code.response') || ''}
          codes={t('codeExamples.webhookCreateResponse', {
            returnObjects: true,
          })}
          displayLanguage="json"
        />
      </CollapseSection>
    </>
  );
};
