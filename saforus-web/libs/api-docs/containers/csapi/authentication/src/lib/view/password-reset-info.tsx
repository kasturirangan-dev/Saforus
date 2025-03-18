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
import flowChartKr from '../assets/password_kr.png';
import flowChartEn from '../assets/password_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export const PasswordResetInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* FLow Chart */}
      <GuideSection
        id="password-reset-flowchart"
        label={t('csApi.authentication.password-reset.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.password-reset.flowchart.content')}
        </TextContent>
        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionTable keyData="tableData.passwordReset" />
      </GuideSection>

      {/* Trigger Password Reset*/}
      <GuideSection
        id="trigger-password-reset"
        label={t('csApi.authentication.password-reset.trigger.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.password-reset.trigger.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.triggerPasswordResetRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.triggerPasswordReset', {
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

      {/* Reset Password*/}
      <GuideSection
        id="reset-password"
        label={t('csApi.authentication.password-reset.reset.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.password-reset.reset.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.resetPasswordRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.resetPassword', {
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
