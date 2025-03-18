import {
  StaticsTitle,
  BoxContent,
} from '@web-workspace/saforus-bo/components/dashboard/common';
import { useTranslation } from 'react-i18next';
import DashboardFilter from '@web-workspace/saforus-bo/components/dashboard/filter';
import { Box } from '@mui/material';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { StatisticCard } from './statistic-card';
import { useSnapshot } from 'valtio';
import { AdminDashboardStore } from '@web-workspace/saforus-bo/components/dashboard/data';
import { formatSize } from '@web-workspace/saforus/common/utils';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';

interface ServiceStatisticsProps {
  isLoading: boolean;
}

const ServiceStatistic: React.FC<ServiceStatisticsProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { usageData } = useSnapshot(AdminDashboardStore);

  return (
    <BoxContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <StaticsTitle>{t('adminDashboard.summary.title')}</StaticsTitle>
        <DashboardFilter />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <LoadingOverLayer loading={isLoading} />
        <StatisticCard
          title={t('adminDashboard.summary.users')}
          data={[
            {
              key: 'PENDING_ACTIVATION',
              value: usageData?.userCount.pendingActivation,
            },
            { key: 'ACTIVE', value: usageData?.userCount.active },
            { key: 'LOCKED', value: usageData?.userCount.locked },
            { key: 'SUSPENDED', value: usageData?.userCount.suspended },
          ]}
          totalInfo={t('adminDashboard.summary.users')}
          seeMoreLink={BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path}
        />
        <StatisticCard
          title={t('adminDashboard.summary.wtr')}
          data={[
            {
              key: 'IN_PROGRESS',
              value: usageData?.wtrInfo?.wtrOrderCount.inProgress,
            },
            {
              key: 'COMPLETED',
              value: usageData?.wtrInfo?.wtrOrderCount.completed,
            },

            { key: 'FAILED', value: usageData?.wtrInfo?.wtrOrderCount.failed },
          ]}
          totalInfo={formatSize(usageData?.wtrInfo?.totalSize)}
          seeMoreLink={BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.path}
        />
        <StatisticCard
          title={t('adminDashboard.summary.pd')}
          // data={usageData?.pdInfo?.pdOrderCount}
          data={[
            {
              key: 'IN_PROGRESS',
              value: usageData?.pdInfo?.pdOrderCount.inProgress,
            },
            {
              key: 'DETECTED',
              value: usageData?.pdInfo?.pdOrderCount.detected,
            },
            {
              key: 'UNDETECTED',
              value: usageData?.pdInfo?.pdOrderCount.undetected,
            },
            { key: 'FAILED', value: usageData?.pdInfo?.pdOrderCount.failed },
          ]}
          totalInfo={formatSize(usageData?.pdInfo?.totalSize)}
          seeMoreLink={
            BO_ROUTES.ORDER_MANAGEMENT.PIRACY_DETECTION_REQUESTS.path
          }
        />
        <StatisticCard
          title={t('adminDashboard.summary.notice')}
          data={[
            { key: 'PUBLISHED', value: usageData?.noticeCount.published },
            { key: 'HIDDEN', value: usageData?.noticeCount.hidden },
          ]}
          seeMoreLink={
            BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path
          }
        />
      </Box>
    </BoxContent>
  );
};

export default ServiceStatistic;
