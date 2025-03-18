import flowChartKr from '../assets/detection_kr.png';
import flowChartEn from '../assets/detection_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { useTranslation } from 'react-i18next';
import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';

export const DetectionInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Empty data */}
      <GuideSection
        id="detection-flow"
        label={t('quickStart.detection.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
      </GuideSection>

      {/* Create  */}
      <GuideSection
        id="detection-create"
        label={t('quickStart.detection.create.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('quickStart.detection.create.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.pdCreateRequest"
          responseSpec="specifications.pdCreateResponse"
          defaultExpand
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.pdCreate', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.pdCreateResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* File Upload  */}
      <GuideSection
        id="detection-upload"
        label={t('quickStart.detection.file-upload.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('quickStart.detection.file-upload.content')}
        </TextContent>
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.overall') || ''}
            codes={t('codeExamples.pdUpload', {
              returnObjects: true,
            })}
          />
        </CollapseSection>
      </GuideSection>

      {/* Get  */}
      <GuideSection
        id="detection-order"
        label={t('quickStart.detection.get.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('quickStart.detection.get.content')}</TextContent>{' '}
        <ApiSpecification
          requestSpec="specifications.pdGetRequest"
          responseSpec="specifications.pdGetResponse"
          defaultExpand
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.pdGet', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.pdGetResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>
    </>
  );
};
