import { useTranslation } from 'react-i18next';
import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { ApiSpecification } from '@web-workspace/api-docs/components/guides/specification-table';
import flowChartKr from '../assets/pd_files_kr.png';
import flowChartEn from '../assets/pd_files_en.png';
import { DescriptionFlow } from './description-simple';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export const PiracyFiles = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* FLow Chart */}
      <GuideSection
        id="piracy-files-flowchart"
        label={t('csApi.deleteFile.piracy.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.deleteFile.piracy.flowchart.content')}
        </TextContent>
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionFlow keyData="tableData.deletePiracyFiles" />
      </GuideSection>

      {/* Get Api*/}
      <GuideSection
        id="piracy-files-api"
        label={t('csApi.deleteFile.piracy.delete-api.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.deleteFile.piracy.delete-api.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.deletePiracyFilesRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.deletePiracyFiles', {
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
