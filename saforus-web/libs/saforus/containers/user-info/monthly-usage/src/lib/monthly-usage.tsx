import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import MonthlyUsage from '@web-workspace/saforus/components/user-info/monthly-usage';
import { Box, Container, Typography, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';
import BreadcrumbComponent from '@web-workspace/saforus/components/forensic-watermarking/breadcrumb';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function MonthlyUsageContainer() {
  const { t } = useTranslation();
  const BreadcrumbBillDetail = [
    {
      title: 'billDetail.service-plan-bill',
      path: `${ROUTES.USER_INFO.SERVICE_PLAN.path}`,
    },
    {
      title: 'servicePlan.subscription.monthly-usage',
      path: '',
    },
  ];

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            onClick={() => {
              window.history.back();
            }}
            variant={'text'}
          >
            <Icon
              iconStyle={{ marginRight: '6px' }}
              name="arrow_left"
              size={45}
              color="#5F6D7E"
            />
          </StyledButton>
          <Typography variant="h4">{t('servicePlan.subscription.monthly-usage')}</Typography>
        </Box>
        <BreadcrumbComponent
          BreadcrumbData={BreadcrumbBillDetail}
        ></BreadcrumbComponent>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          mt: '1.5rem',
        }}
      >
        <Box sx={{ backgroundColor: 'var(--base-white)', padding: '1.5rem' }}>
          <MonthlyUsage />
        </Box>
      </Box>
    </Container>
  );
}

export default MonthlyUsageContainer;
