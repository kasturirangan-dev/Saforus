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
import flowChartKr from '../assets/account_kr.png';
import flowChartEn from '../assets/account_en.png';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

export const AccountFlowInfo = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* FLow Chart */}
      <GuideSection
        id="account-flowchart"
        label={t('csApi.authentication.account-flow.flowchart.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.account-flow.flowchart.content')}
        </TextContent>

        <img
          src={i18n.language === 'ko' ? flowChartKr : flowChartEn}
          alt={'flowchart'}
          width={'100%'}
        />
        <DescriptionTable keyData="tableData.accountFlow" />
      </GuideSection>
      {/* Login*/}
      <GuideSection
        id="login"
        label={t('csApi.authentication.account-flow.login.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.account-flow.login.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.loginRequest"
          responseSpec="specifications.loginResponse"
          defaultExpand
        />
        <CollapseSection
          label={t('apiIntegration.example-code.title')}
          defaultExpand
        >
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.login', {
              returnObjects: true,
            })}
          />
          <CodeView
            title={t('apiIntegration.example-code.response') || ''}
            codes={t('codeExamples.loginResponse', {
              returnObjects: true,
            })}
            displayLanguage="json"
          />
        </CollapseSection>
      </GuideSection>

      {/* Change Password*/}
      <GuideSection
        id="change-password"
        label={t('csApi.authentication.account-flow.change-password.title')}
        level={2}
        style={{ gap: '8px' }}
      >
        <TextContent>
          {t('csApi.authentication.account-flow.change-password.content')}
        </TextContent>
        <ApiSpecification
          requestSpec="specifications.changePasswordRequest"
          responseSpec="specifications.noResponse"
        />
        <CollapseSection label={t('apiIntegration.example-code.title')}>
          <CodeView
            title={t('apiIntegration.example-code.request') || ''}
            codes={t('codeExamples.changePassword', {
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
