import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { FlowInfo } from './view/flow-info';

export function ShareFileApiContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.shareFile.title')]}
      description={t('csApi.shareFile.description')}
    >
      {/* Api FLow */}
      <GuideSection
        id="share-flow"
        label={t('csApi.shareFile.share-flow.title')}
      >
        <FlowInfo />
      </GuideSection>

      {/* Share Api */}
      <GuideSection id="share-api" label={t('csApi.shareFile.share-api.title')}>
        <TextContent>{t('csApi.shareFile.share-api.content-1')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.shareFileRequest"
          responseSpec="specifications.noResponse"
          defaultExpand
        />
      </GuideSection>

      {/* Example */}
      <GuideSection id="example" label={t('csApi.shareFile.example.title')}>
        <CodeView
          title={t('apiIntegration.example-code.request') || ''}
          codes={t('codeExamples.sharFileRequest', {
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
      </GuideSection>
    </GuideLayout>
  );
}

export default ShareFileApiContainer;
