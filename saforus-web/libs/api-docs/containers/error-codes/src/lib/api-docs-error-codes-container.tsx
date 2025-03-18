import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  SectionContent,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import codeImgKr from './assets/code_kr.png';
import codeImgEn from './assets/code_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';
import { ErrorCodesView } from './views/error-code-table';

export function ErrorCodesContainer() {
  const { t, i18n } = useTranslation();

  return (
    <GuideLayout
      guide={[t('errorCodes.title')]}
      description={t('errorCodes.description')}
    >
      {/* Error Codes format  */}
      <GuideSection
        id="error-codes-format"
        label={t('errorCodes.format.title')}
        style={{ gap: '8px' }}
      >
        <SectionContent contentKey="errorCodes.format.content-1" />
        <img src={i18n.language === 'ko' ? codeImgKr : codeImgEn} alt={'code'} width={'100%'} />
        <CodeView
          title={t('errorCodes.format.example-error-message') || ''}
          codes={t('codeExamples.overallStructure', { returnObjects: true })}
          displayLanguage="json"
        />
      </GuideSection>

      {/* Main Error Codes  */}
      <GuideSection
        id="main-error-codes"
        label={t('errorCodes.codes.title')}
        style={{ gap: '8px' }}
      >
        <GuideSection
          id="authentication"
          label={t('errorCodes.codes.authentication.title')}
          level={2}
          style={{ gap: '8px' }}
        >
          <ErrorCodesView keyData="errorCodesData.authentication" />
        </GuideSection>
        <GuideSection
          id="watermarking"
          label={t('errorCodes.codes.watermarking.title')}
          level={2}
          style={{ gap: '8px' }}
        >
          <ErrorCodesView keyData="errorCodesData.watermarking" />
        </GuideSection>

        <GuideSection
          id="detection"
          label={t('errorCodes.codes.detection.title')}
          level={2}
          style={{ gap: '8px' }}
        >
          <ErrorCodesView keyData="errorCodesData.detection" />
        </GuideSection>
      </GuideSection>
    </GuideLayout>
  );
}

export default ErrorCodesContainer;
