import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { AccountFlowInfo } from './view/account-flow-info';
import { PasswordResetInfo } from './view/password-reset-info';

export function AuthenticationApiContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.authentication.title')]}
      description={t('csApi.authentication.description')}
    >
      {/* Account FLow */}
      <GuideSection
        id="account-flow"
        label={t('csApi.authentication.account-flow.title')}
      >
        <AccountFlowInfo />
      </GuideSection>

      {/* Password Reset*/}
      <GuideSection
        id="password-reset"
        label={t('csApi.authentication.password-reset.title')}
      >
        <PasswordResetInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default AuthenticationApiContainer;
