import AdminUserCreditList from '@web-workspace/saforus/components/user-info/admin-user-credit/user-credit-list';
import VersionView from '@web-workspace/saforus/components/user-info/admin-user-credit/versions';
import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useTranslation } from 'react-i18next';

export function AdminUserCreditsContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t } = useTranslation();

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Typography variant="h5">{t('userCredit.versions')}</Typography>
      <VersionView />

      {/* <Typography variant="h5" sx={{ mt: '1.5rem' }}>
        {t('userCredit.title')}
      </Typography>
      <AdminUserCreditList /> */}
    </Container>
  );
}

export default AdminUserCreditsContainer;
