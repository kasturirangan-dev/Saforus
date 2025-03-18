import { Box, Typography } from '@mui/material';
import ServicePlanView from '@web-workspace/saforus/components/user-info/service-plan-billing/service-plan';
import { useTranslation } from 'react-i18next';

export function ServicePlanContainer() {
  const { t } = useTranslation();

  return (
    <Box fontFamily="Inter">
      <Typography variant="h4">{t('servicePlan.header-title')}</Typography>
      <Typography sx={{ margin: '1rem 0 1.5rem 0', color: 'var(--gray-50)' }}>
        {t('servicePlan.title')}
      </Typography>
      <ServicePlanView />
      <Box height={'2rem'} />
    </Box>
  );
}

export default ServicePlanContainer;
