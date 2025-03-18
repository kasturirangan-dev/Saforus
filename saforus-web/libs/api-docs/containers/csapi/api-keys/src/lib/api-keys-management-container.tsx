import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export function ApiKeysManagementContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.apiKeys.title')]}
      description={t('csApi.apiKeys.description')}
    >
      {/* Create  */}
      <GuideSection
        id="create-api-key"
        label={t('csApi.apiKeys.create.title')}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.apiKeys.create.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.createApiKeyRequest"
          responseSpec="specifications.createApiKeyResponse"
          defaultExpand
        />
        <CollapseSection
          label={t('apiIntegration.example-code.title')}
          defaultExpand
        >
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.createApiKey', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.createApiKeyResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* Get  */}
      <GuideSection
        id="get-api-keys"
        label={t('csApi.apiKeys.search.title')}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.apiKeys.search.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.getApiKeysRequest"
          responseSpec="specifications.getApiKeysResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.getApiKeys', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.getApiKeysResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* Update  */}
      <GuideSection
        id="update-api-key"
        label={t('csApi.apiKeys.update.title')}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.apiKeys.update.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.updateApiKeyRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.updateApiKey', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.noResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* Delete  */}
      <GuideSection
        id="delete-api-key"
        label={t('csApi.apiKeys.delete.title')}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.apiKeys.delete.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.deleteApiKeyRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.deleteApiKey', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.noResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>
    </GuideLayout>
  );
}

export default ApiKeysManagementContainer;
