import flowChartKr from '../assets/watermark_kr.png';
import flowChartEn from '../assets/watermark_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { useTranslation } from 'react-i18next';
import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';

export const WatermarkingInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Empty data */}
      <GuideSection
        id="watermarking-flow"
        label={t('quickStart.watermarking.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <img src={i18n.language === 'ko' ? flowChartKr : flowChartEn} alt={'flowchart'} width={'100%'} />
      </GuideSection>

      {/* Create  */}
      <GuideSection
        id="watermarking-create"
        label={t('quickStart.watermarking.create.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('quickStart.watermarking.create.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.wmCreateRequest"
          responseSpec="specifications.wmCreateResponse"
          defaultExpand
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.wmCreate', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.wmCreateResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* File Upload  */}
      <GuideSection
        id="watermarking-upload"
        label={t('quickStart.watermarking.file-upload.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('quickStart.watermarking.file-upload.content')}
        </TextContent>
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.overall') || ''}
            codes={t('codeExamples.wmUpload', {
              returnObjects: true,
            })}
          />
        </CollapseSection>
      </GuideSection>

      {/* Get  */}
      <GuideSection
        id="watermarking-order"
        label={t('quickStart.watermarking.get.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('quickStart.watermarking.get.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.wmGetRequest"
          responseSpec="specifications.wmGetResponse"
          defaultExpand
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.wmGet', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.wmGetResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>
    </>
  );
};
