import { useTranslation } from 'react-i18next';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { DescriptionTable } from '@web-workspace/api-docs/components/guides/specification-table';
import flowChartKr from '../assets/sharefile_kr.png';
import flowChartEn from '../assets/sharefile_en.png';

export const FlowInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <GuideSection
        id="flowchart"
        label={t('csApi.shareFile.share-flow.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
      </GuideSection>
      <GuideSection
        id="description"
        label={t('csApi.shareFile.share-flow.description.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <DescriptionTable keyData="tableData.shareFile" />
      </GuideSection>
    </>
  );
};
