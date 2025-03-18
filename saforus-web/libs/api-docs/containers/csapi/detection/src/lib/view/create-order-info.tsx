import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import {
  ApiSpecification,
  DescriptionTable,
} from '@web-workspace/api-docs/components/guides/specification-table';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import flowChartKr from '../assets/pd_create_kr.png';
import flowChartEn from '../assets/pd_create_en.png';

export const CreateOrderInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* FLow Chart */}
      <GuideSection
        id="create-flowchart"
        label={t('csApi.detection.create.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.detection.create.flowchart.content')}
        </TextContent>
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionTable keyData="tableData.pdCreate" />
      </GuideSection>

      {/* Create Api*/}
      <GuideSection
        id="create-order-api"
        label={t('csApi.detection.create.create-api.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.detection.create.create-api.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.pdCreateRequest"
          responseSpec="specifications.pdCreateResponse"
        />
      </GuideSection>

      {/* Create Example*/}
      <GuideSection
        id="create-order-example"
        label={t('csApi.detection.create.example.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.detection.create.example.content')}</TextContent>
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
    </>
  );
};
