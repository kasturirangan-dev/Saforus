import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  SectionContent,
  StyledAlert,
  TextContent,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import { Trans, useTranslation } from 'react-i18next';
import Icon from '@web-workspace/shared/components/widgets/icon';
import authenImgKr from './assets/authen_kr.png';
import authenImgEn from './assets/authen_en.png';
import { ResponseInfo } from './view/response-info';
import { WebhookInfo } from './view/webhook-info';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

export function IntegrationBasicConceptsContainer() {
  const { t, i18n } = useTranslation();

  return (
    <GuideLayout
      guide={[t('apiIntegration.title'), t('integrationBasic.title')]}
      description={t('integrationBasic.description')}
    >
      {/* App Authentication */}
      <GuideSection
        id="app-authentication"
        label={t('integrationBasic.app-authentication.title')}
      >
        <TextContent>
          <TransContent
            i18nKey="integrationBasic.app-authentication.content-1"
            link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#application`}
          />
          <br />
          <br />
          <TransContent
            i18nKey="integrationBasic.app-authentication.content-2"
            link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#access-token`}
          />
        </TextContent>
        <img src={i18n.language === 'ko' ? authenImgKr : authenImgEn} alt={'authen'} width={'100%'} />
      </GuideSection>

      {/* API Request Retry */}
      <GuideSection
        id="api-request-retry"
        label={t('integrationBasic.api-request-retry.title')}
      >
        <SectionContent
          contentKey="integrationBasic.api-request-retry.content-1"
          link={i18n.language === 'ko' ? `${API_DOCS_ROUTES.TERM_DEFINITION.path}#api` : `${API_DOCS_ROUTES.TERM_DEFINITION.path}#idempotency`}
        />
      </GuideSection>

      {/* Idempotency Guarantee */}
      <GuideSection
        id="idempotency-guarantee"
        label={t('integrationBasic.idempotency-guarantee.title')}
      >
        <SectionContent
          contentKey="integrationBasic.idempotency-guarantee.content-1"
          link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#idempotency`}
        />
        <StyledAlert severity="warning">
          <Trans i18nKey="integrationBasic.idempotency-guarantee.alert" />
        </StyledAlert>
      </GuideSection>

      {/* Timeout */}
      <GuideSection id="timeout" label={t('integrationBasic.timeout.title')}>
        <SectionContent contentKey="integrationBasic.timeout.content-1" />
      </GuideSection>

      {/* Server Response */}
      <GuideSection
        id="server-response"
        label={t('integrationBasic.server-response.title')}
      >
        <ResponseInfo />
      </GuideSection>

      {/* Webhook */}
      <GuideSection id="webhook" label={t('integrationBasic.webhook.title')}>
        <WebhookInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default IntegrationBasicConceptsContainer;
