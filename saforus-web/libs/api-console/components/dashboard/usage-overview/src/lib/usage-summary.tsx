import { Box } from '@mui/material';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { useTranslation } from 'react-i18next';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import { StatisticCard } from './views/statistic-card';
import { useSnapshot } from 'valtio';
import { useMemo } from 'react';

interface UserOverViewProps {
  isLoading: boolean;
}

const formatTime = (milliseconds: number): string => {
  if (milliseconds === 0) {
    return '0ms';
  }
  const formattedTime = Math.round(milliseconds).toString();
  return formattedTime + 'ms';
};

const UsageSummary: React.FC<UserOverViewProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { usageSummary } = useSnapshot(ApiDashboardStore);

  const avgProcessingTime = useMemo(
    () => formatTime(usageSummary?.avgProcessingTimeInMillisecond || 0),
    [usageSummary?.avgProcessingTimeInMillisecond]
  );
  return (
    <Box
      sx={{
        borderRadius: '8px',
        position: 'relative',
        height: '100%',
        backgroundColor: 'var(--base-white)',
        padding: '16px',
        display: 'flex', // Flex container
        flexDirection: 'column', // Arrange children in column
        justifyContent: 'center', // Center vertically
      }}
    >
      <LoadingOverLayer loading={isLoading} />
      <Box
        sx={{
          padding: '16px',
          height: '184px',
          background: 'var(--neutral-300)',
          borderRadius: '8px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <StatisticCard
          title={t('apiDashboard.usage-overview.total')}
          value={usageSummary.total}
          description={t('apiDashboard.usage-overview.files')}
        />
        <Box
          sx={{
            paddingTop: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          <StatisticCard
            title={t('apiDashboard.usage-overview.watermarking')}
            value={usageSummary.watermarking}
            tooltip={t('apiDashboard.usage-overview.tooltip-watermarking')}
            description={t('apiDashboard.usage-overview.files')}
          />
          <StatisticCard
            title={t('apiDashboard.usage-overview.detection')}
            value={usageSummary.detection}
            tooltip={t('apiDashboard.usage-overview.tooltip-detection')}
            description={t('apiDashboard.usage-overview.files')}
          />
        </Box>
      </Box>
      <StatisticCard
        title={t('apiDashboard.usage-overview.processing')}
        value={avgProcessingTime}
        description={t('apiDashboard.usage-overview.avg')}
        border="true"
      />
    </Box>
  );
};
export default UsageSummary;
