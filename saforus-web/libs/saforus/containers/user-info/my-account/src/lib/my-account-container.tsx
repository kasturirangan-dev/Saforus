import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { Card, Container, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginInformation from '@web-workspace/saforus/components/user-info/my-account/login-info';
import EmailSubscription from '@web-workspace/saforus/components/user-info/my-account/email-subscription';
import LanguageRegion from '@web-workspace/saforus/components/user-info/my-account/language-region';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import DeleteAccount from '@web-workspace/saforus/components/user-info/my-account/delete-account';
import TeamInformation from '@web-workspace/saforus/components/user-info/my-account/team-infomation';
import { useMyAccountData } from '@web-workspace/saforus/components/user-info/my-account/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import {
  getMinuteOffset,
  getTimezone,
} from '@web-workspace/saforus/common/utils';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
const SectionCard = styled(Card)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 1rem;
`;

function MyAccountContainer() {
  const { t } = useTranslation();
  const timezone = getTimezone();
  const tzOffset = getMinuteOffset();
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { onInfoChange } = useMyAccountData();
  const { loginInformation } = useSnapshot(MyAccountStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const dateValue = formatDateWithLanguage({
    date: new Date(loginInformation?.currentSessionStartedAt),
    isDetail: true,
    withSlash: true,
    tzOffset,
  });
  const helpUrl = `${ROUTES.HELP.HELP_CENTER.path}`;
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1.5rem',
      }}
    >
      <Typography variant="h5" sx={{ margin: 0 }}>
        {t('myaccount.title')}
      </Typography>
      <SectionCard>
        <LoginInformation onInfoChange={onInfoChange} />

        <Typography sx={{ color: 'var(--gray-25)' }}>
          {`${t('myaccount.recent-session')} ${dateValue} ${timezone}`}
        </Typography>

        <TeamInformation />
      </SectionCard>
      <SectionCard>
        <EmailSubscription onInfoChange={onInfoChange} />
      </SectionCard>
      <SectionCard>
        <LanguageRegion onInfoChange={onInfoChange} />
      </SectionCard>
      <SectionCard>
        <DeleteAccount />
      </SectionCard>
    </Container>
  );
}

export default MyAccountContainer;
