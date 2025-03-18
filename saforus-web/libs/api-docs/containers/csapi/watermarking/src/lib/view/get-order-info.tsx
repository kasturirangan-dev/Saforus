import { useTranslation } from 'react-i18next';
import GuideSection, {
  CollapseSection,
  GuideCard,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import {
  ApiSpecification,
  DescriptionTable,
} from '@web-workspace/api-docs/components/guides/specification-table';
import flowChartKr from '../assets/wm_get_kr.png';
import flowChartEn from '../assets/wm_get_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export const GetOrderInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Get Api*/}
      <GuideSection
        id="get-order-api"
        label={t('csApi.watermarking.get.get-api.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.watermarking.get.get-api.content')}</TextContent>
        <ApiSpecification
          requestSpec="specifications.wmGetRequest"
          responseSpec="specifications.wmGetResponse"
        />
      </GuideSection>

      {/* Get Example*/}
      <GuideSection
        id="get-order-example"
        label={t('csApi.watermarking.get.example.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>{t('csApi.watermarking.get.example.content')}</TextContent>
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

      {/* FLow Chart */}
      <GuideSection
        id="get-order-flowchart"
        label={t('csApi.watermarking.get.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.watermarking.get.flowchart.content')}
        </TextContent>
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionTable keyData="tableData.wmGetOrder" />
      </GuideSection>
    </>
  );
};
