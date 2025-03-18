import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';
import flowChartKr from '../assets/wm_files_kr.png';
import flowChartEn from '../assets/wm_files_en.png';
import { DescriptionFlow } from './description-simple';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export const WatermarkFiles = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* FLow Chart */}
      <GuideSection
        id="watermark-files-flowchart"
        label={t('csApi.deleteFile.watermark.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.deleteFile.watermark.flowchart.content')}
        </TextContent>
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionFlow keyData="tableData.deleteWatermarkFiles" />
      </GuideSection>

      {/* Create Api*/}
      <GuideSection
        id="watermark-files-api"
        label={t('csApi.deleteFile.watermark.delete-api.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.deleteFile.watermark.delete-api.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.deleteWatermarkFilesRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.deleteWatermarkFiles', {
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
    </>
  );
};
