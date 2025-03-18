import { Box, Typography, Divider, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { addMinutes, differenceInDays } from 'date-fns';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { UsageContainer, UsageTitle } from './styled-elements';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import {
  ApiDashboardStore,
  ApiRequestCount,
} from '@web-workspace/api-console/components/dashboard/data';
import { formatDate } from '@web-workspace/shared/helpers/dates';
import { PlanInfo } from '@web-workspace/api-console/components/model';
import { isGuestUser } from '@web-workspace/api-console/components/layouts/main-layout';

export const SummaryInfo = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  const { t } = useTranslation();
  const isGuest = isGuestUser();
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '18px',
          color: 'var(--gray-200)',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Typography
        fontSize="16px"
        fontWeight={500}
        lineHeight="22px"
        color="var(--gray-790)"
      >
        {!isGuest ? value : '-'}
      </Typography>
    </Box>
  );
};

const getRequestCost = (apiRequestCount: ApiRequestCount, plan: PlanInfo) => {
  const wtrPrice = plan?.moreInfo?.watermarkApiPriceKRW || 0;
  const pdPrice = plan?.moreInfo?.detectionApiPriceKRW || 0;
  return (
    (apiRequestCount?.wtrApiRequestCount || 0) * wtrPrice +
    (apiRequestCount?.pdApiRequestCount || 0) * pdPrice
  );
};

const formatPeriodDate = (date: Date, language: string) => {
  if (language === 'en') {
    return formatDate(date, 'MMM d, yyyy');
  } else {
    return formatDate(date, 'yyyy/MM/dd');
  }
};

function Summary({ loading }: { loading: boolean }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { userInfo, tzDisplayOffset } = useSnapshot(CsApiAuthStore);
  const { apiRequestCount } = useSnapshot(ApiDashboardStore);

  const planType = userInfo?.subscription?.plan?.planType || 'N/A';
  const planCost = Number(userInfo?.subscription?.amount).toLocaleString() || 0;
  const reqCost = getRequestCost(apiRequestCount, userInfo?.subscription?.plan);
  const additionCharge = 0;

  // Billing period
  const now = new Date();
  const startDate = addMinutes(
    new Date(userInfo?.subscription?.billingStartDate ?? now),
    tzDisplayOffset
  );
  const endDate = addMinutes(
    new Date(userInfo?.subscription?.nextPayDate ?? now),
    tzDisplayOffset
  );
  const remainingDays = differenceInDays(endDate, now);
  const billingType = userInfo?.subscription?.plan?.billingType;

  return (
    <UsageContainer
      sx={{
        backgroundColor: 'var(--base-white)',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <LoadingOverLayer loading={loading} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
        }}
      >
        <UsageTitle>{t('apiDashboard.usageStatistics.currentPlan')}</UsageTitle>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Link
          onClick={() => {
            navigate(API_ROUTES.USER_INFO.CURRENT_PLAN.path);
          }}
          underline="none"
          display="flex"
          gap="4px"
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            component="span"
            whiteSpace="nowrap"
          >
            {t('apiDashboard.usageStatistics.view-more-plan')}
          </Typography>
          <ChevronRightIcon
            sx={{
              fontSize: '16px',
              color: 'var(--purple-600)',
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px 60px',
        }}
      >
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.planName')}
          value={planType}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.planCost')}
          value={`${planCost} ${t('apiDashboard.usageStatistics.won')}`}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.billingCycle')}
          value={t(`apiDashboard.usageStatistics.${billingType}`)}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.reqCost')}
          value={`${reqCost.toString()} ${t(
            'apiDashboard.usageStatistics.won'
          )}`}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.remainingDays')}
          value={`${remainingDays.toString()} ${t(
            'apiDashboard.usageStatistics.days'
          )}`}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.nextPayment')}
          value={formatPeriodDate(endDate, i18n.language)}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.servicePeriod')}
          value={`${formatPeriodDate(
            startDate,
            i18n.language
          )} - ${formatPeriodDate(endDate, i18n.language)}`}
        />
        <SummaryInfo
          title={t('apiDashboard.usageStatistics.storageCost')}
          value={`${additionCharge} ${t('apiDashboard.usageStatistics.won')}`}
        />
      </Box>
    </UsageContainer>
  );
}

export default memo(Summary);
