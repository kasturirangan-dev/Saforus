import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  CollapseSection,
  SectionContent,
  StyledAlert,
  TextContent,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import { useTranslation } from 'react-i18next';
import { DescriptionEvents } from './view/description-events';

export function WebhooksApiContainer() {
  const { t, i18n } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.webhooks.title')]}
      description={t('csApi.webhooks.description')}
    >
      {/* Register */}
      <GuideSection id="register" label={t('csApi.webhooks.register.title')}>
        <SectionContent
          contentKey="csApi.webhooks.register.content-1"
          link={`${API_DOCS_ROUTES.WEBHOOKS.path}#events`}
        />
        <StyledAlert severity="warning">
          {t('csApi.webhooks.register.alert-1')}
        </StyledAlert>
        <TextContent>{t('csApi.webhooks.register.content-2')}</TextContent>
        <StyledAlert severity="info">
        <TransContent
            i18nKey="csApi.webhooks.register.alert-2"
            link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#idempotency`}
          />
        </StyledAlert>
        <TextContent>{t('csApi.webhooks.register.content-3')}</TextContent>

        <StyledAlert severity="warning">
          <TransContent
            i18nKey="csApi.webhooks.register.alert-3"
            link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#idempotency`}
          />
        </StyledAlert>
      </GuideSection>

      {/* Securing */}
      <GuideSection id="securing" label={t('csApi.webhooks.securing.title')}>
        <SectionContent contentKey="csApi.webhooks.securing.content-1" />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('csApi.webhooks.securing.event-example') || ''}
            codes={t('codeExamples.eventExample', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
          <CodeView
            title={t('csApi.webhooks.securing.validate-signature') || ''}
            codes={t('codeExamples.validateSignature', {
              returnObjects: true,
            })}
            displayLanguage="java"
          />
        </CollapseSection>
      </GuideSection>

      {/* Event */}
      <GuideSection id="events" label={t('csApi.webhooks.events.title')}>
        <SectionContent
          contentKey="csApi.webhooks.events.content-1"
          link={`#events`}
        />
        <DescriptionEvents keyData="tableData.wmOrderEvents" />
        <DescriptionEvents keyData="tableData.pdOrderEvents" />
      </GuideSection>
    </GuideLayout>
  );
}

export default WebhooksApiContainer;