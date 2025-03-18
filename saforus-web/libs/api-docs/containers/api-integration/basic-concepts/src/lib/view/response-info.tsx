import codeImgKr from '../assets/code_kr.png';
import codeImgEn from '../assets/code_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { useTranslation } from 'react-i18next';
import GuideSection, {
  CollapseSection,
  SectionContent,
} from '@web-workspace/api-docs/components/guides/section';
import CodeExampleTable from './code-example-table';

import EmptyDataTable from './empty-data-table';

export const ResponseInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <CodeView
        title={t('integrationBasic.server-response.overall-structure')}
        codes={t('codeExamples.overallStructure', { returnObjects: true })}
        displayLanguage="json"
      />
      <img src={i18n.language === 'ko' ? codeImgKr : codeImgEn} alt={'code'} width={'100%'} />

      {/* Code example  */}
      <CollapseSection
        label={t('integrationBasic.server-response.code-example.title')}
      >
        <CodeExampleTable keyData={'tableData.apiResponses'} />
      </CollapseSection>

      {/* Empty data */}
      <GuideSection
        label={t('integrationBasic.server-response.empty-data.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <SectionContent contentKey="integrationBasic.server-response.empty-data.content" />
      </GuideSection>

      {/* Empty data type  */}
      <CollapseSection
        label={t('integrationBasic.server-response.empty-types.title')}
      >
        <EmptyDataTable keyData={'tableData.emptyExamples'} />
      </CollapseSection>
    </>
  );
};
