import { Box } from '@mui/material';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { useTranslation } from 'react-i18next';
import { ApiDashboardStore } from '@web-workspace/api-bo/components/dashboard/data';
import { formatSize } from '@web-workspace/saforus/common/utils';
import { StatisticCard } from './views/statistic-card';
import { useSnapshot } from 'valtio';
import { useMemo } from 'react';

interface UserOverViewProps {
  isLoading: boolean;
}

const formatTime = (milliseconds: number): string => {
  return `${Math.floor(milliseconds || 0)}ms`;
};
const UsageSummary: React.FC<UserOverViewProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { usageSummary } = useSnapshot(ApiDashboardStore);

  const [storageUsage, storageUsageUnit] = useMemo(() => {
    const formatedSize = formatSize(usageSummary?.storageUsageInByte || 0);
    return formatedSize.split(' ');
  }, [usageSummary?.storageUsageInByte]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <LoadingOverLayer loading={isLoading} />

      <StatisticCard
        title={t('apiDashboard.usage-overview.total')}
        value={usageSummary?.total}
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.watermarking')}
        value={usageSummary?.watermarking}
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.detection')}
        value={usageSummary?.detection}
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.download')}
        value={usageSummary?.download}
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.api-requests')}
        value={usageSummary?.apiRequestCount}
        description= {usageSummary?.apiRequestCount > 1 ? 'Times' : 'Time'}
      />

      <StatisticCard
        title={t('apiDashboard.usage-overview.processing')}
        value={formatTime(usageSummary?.avgProcessingTimeInMillisecond)}
        description="Avg"
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.failed')}
        value={usageSummary?.failed}
      />
      <StatisticCard
        title={t('apiDashboard.usage-overview.storage-usage')}
        value={storageUsage}
        description={storageUsageUnit}
      />
    </Box>
  );
};
export default UsageSummary;
