import { Box, Typography, styled } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useTranslation } from 'react-i18next';
import UserTrend from '@web-workspace/saforus-bo/components/dashboard/user-trend';
import UserOverView from '@web-workspace/saforus-bo/components/dashboard/user-overview';
import ServiceStatistic from '@web-workspace/saforus-bo/components/dashboard/service-usage';
import { useAdminDashboardData } from '@web-workspace/saforus-bo/components/dashboard/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function ForensicWatermarkingContainer() {
  const { t } = useTranslation();
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const { loadingSummary, loadingUser, loadingTrend } = useAdminDashboardData();

  return (
    <BoxContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="h5" color="var(--gray-700)">
        {t('adminDashboard.title')}
      </Typography>
      {/* <DashboardFilter /> */}

      <ServiceStatistic isLoading={loadingSummary} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 440px',
          gap: '24px',
        }}
      >
        <UserOverView isloading={loadingUser} />
        <UserTrend isloading={loadingTrend} />
      </Box>
    </BoxContainer>
  );
}

export default ForensicWatermarkingContainer;
