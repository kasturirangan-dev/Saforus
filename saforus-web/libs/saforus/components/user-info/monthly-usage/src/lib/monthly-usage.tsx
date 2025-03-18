import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@web-workspace/shared/components/widgets/button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';
import {
  DashboardServiceUsageStore,
  useDashboardData,
} from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';

export function MonthlyUsage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleViewOther = () => {
    navigate(ROUTES.USER_INFO.SERVICE_PLAN.path);
  };
  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);
  useDashboardData();

  const { forensicWatermarkingData, serviceUsageDate } = useSnapshot(
    DashboardServiceUsageStore
  );

  const total = forensicWatermarkingData?.wtrCapacitySize * 1000;
  const used = (forensicWatermarkingData?.wtrUsedCapacitySize * 1000).toFixed(
    1
  );
  const balance = (
    (forensicWatermarkingData?.wtrCapacitySize -
      forensicWatermarkingData?.wtrUsedCapacitySize) *
    1000
  ).toFixed(1);

  const startDate = formatDateWithLanguage(
    serviceUsageDate.startDate,
    i18next.language,
    undefined,
    undefined,
    undefined,
    true
  );

  const endDate = formatDateWithLanguage(
    serviceUsageDate.endDate,
    i18next.language,
    undefined,
    undefined,
    undefined,
    true
  );

  const CardStyled = styled(Box)(() => ({
    borderRadius: '5px',
    border: '1px solid var(--neutral-750)',
    padding: '1.5rem',
  }));

  const HeaderStyled = styled(Box)(() => ({
    fontSize: '1.375rem',
    fontWeight: 700,
    lineHeight: '30px',
  }));

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      <CardStyled>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              component={'span'}
              sx={{
                color: '#574EFA',
                padding: '2px 8px',
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: '20px',
                backgroundColor: '#ECEBFF',
                borderRadius: '5px',
              }}
            >
              {t('servicePlan.subscription.active-subscription')}
            </Typography>
          </Box>
          <HeaderStyled>{subscriptionPlanDetail?.title}</HeaderStyled>
          <Typography
            component={'span'}
            sx={{
              color: 'var(--gray-25)',
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: '24px',
              marginBottom: '1.5rem',
            }}
          >
            {t('billDetail.monthly')}
          </Typography>

          <Box>
            <Button
              color="secondary"
              sx={{ height: '36px' }}
              onClick={handleViewOther}
            >
              {t('billDetail.view-other-service-plans')}
            </Button>
          </Box>
        </Box>
      </CardStyled>
      <CardStyled>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            justifyContent: 'space-between',
          }}
        >
          <HeaderStyled>
            {t('servicePlan.subscription.credit-usage')}
          </HeaderStyled>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'var(--gray-25)',
              fontSize: '0.90rem',
              fontWeight: 400,
              lineHeight: '24px',
            }}
          >
            {startDate} ~ {endDate}
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '0.90rem',
                fontWeight: 400,
                lineHeight: '24px',
              }}
            >
              {t('servicePlan.subscription.total')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '0.90rem',
                fontWeight: 400,
                lineHeight: '24px',
              }}
            >
              {total} pt
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '0.90rem',
                fontWeight: 400,
                lineHeight: '24px',
              }}
            >
              {t('servicePlan.subscription.used')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '0.90rem',
                fontWeight: 400,
                lineHeight: '24px',
              }}
            >
              {used} pt
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '1.2rem',
                fontWeight: 600,
                lineHeight: '24px',
              }}
            >
              {t('servicePlan.subscription.balance')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--gray-50)',
                fontSize: '1.2rem',
                fontWeight: 600,
                lineHeight: '24px',
              }}
            >
              {balance} pt
            </Typography>
          </Box>
        </Box>
      </CardStyled>
    </Box>
  );
}

export default MonthlyUsage;
