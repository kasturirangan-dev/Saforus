import { Box, Typography } from '@mui/material';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { useTranslation } from 'react-i18next';
import { ChartBox, StaticsBox } from './views/styled-elements';
import { AreaChartCard } from './views/area-chart';
import { ApiDashboardStore } from '@web-workspace/api-bo/components/dashboard/data';
import { useSnapshot } from 'valtio';
import { useMemo } from 'react';
import { parseISO } from 'date-fns';
import dataIcon from './assets/stats.svg';

interface UserOverViewProps {
  isLoading: boolean;
}

const UsageChart: React.FC<UserOverViewProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { fileUsages } = useSnapshot(ApiDashboardStore);
  const hasData = fileUsages?.total && fileUsages?.total > 0;
  const chartData = useMemo(() => {
    return fileUsages?.usages?.map((item) => {
      const parsedDate =
        typeof item.date === 'string' ? parseISO(item.date) : item.date;
      const stringDate = parsedDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return {
        name: stringDate,
        value: item.count,
      };
    });
  }, [fileUsages]);

  return hasData ? (
    <StaticsBox sx={{ padding: '28px', gap: '16px', position: 'relative' }}>
      <LoadingOverLayer loading={isLoading} />
      <Box>
        <Typography
          variant="body2"
          fontWeight={500}
          textTransform={'uppercase'}
          color="var(--gray-50)"
        >
          {t('apiDashboard.usage-overview.file-processsed')}
        </Typography>
        <Typography
          fontFamily="Inter"
          fontSize="36px"
          fontWeight={700}
          lineHeight="44px"
          color="var(--gray-700)"
        >
          {fileUsages?.total}
        </Typography>
      </Box>

      <ChartBox>
        <AreaChartCard data={chartData} />
      </ChartBox>
    </StaticsBox>
  ) : (
    <StaticsBox
      sx={{
        padding: '28px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <LoadingOverLayer loading={isLoading} />

      <Box
        sx={{
          display: 'flex',
          padding: '40px',
          borderRadius: '50%',
          background: 'var(--neutral-200)',
        }}
      >
        <img src={dataIcon} alt="data icon" height={40} width={40} />
      </Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        lineHeight="29px"
        color="var(--gray-700)"
      >
        {t('apiDashboard.usage-overview.no-data')}
      </Typography>
      <Typography color="var(--gray-700)">
        {t('apiDashboard.usage-overview.no-data-des')}
      </Typography>
    </StaticsBox>
  );
};
export default UsageChart;
