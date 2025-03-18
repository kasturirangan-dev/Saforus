import { Box, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatSize } from '@web-workspace/saforus/common/utils';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import { MediaUsageData } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { OrderStatus } from '@web-workspace/shared/components/widgets/content-label';

interface StaticsCardProps {
  title: string;
  staticsData?: MediaUsageData;
  className?: string;
  style?: any;
  statsFor: 'WKM' | 'PD';
}

const StaticsResult = styled(Typography)({
  fontWeight: '600',
  color: 'var(--gray-50)',
});

const MediaBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: pxToVw('4px'),
});

const StaticsCard: React.FC<StaticsCardProps> = ({
  title,
  staticsData,
  className,
  style,
  statsFor, //WKM or PD
}) => {
  const {
    totalCount: total = 0,
    inQueueCount: inQueue = 0,
    inProgressCount: inProgress = 0,
    completedCount: completed = 0,
    failedCount: failed = 0,
    totalSizeInMb: size = 0,
    detectedCount: detected = 0,
    unDetectedCount: unDetected = 0,
  } = staticsData || {};

  const { t } = useTranslation();
  const [formatTotalSize, setFormatTotalSize] = useState('0 MB');

  const statsConfig = {
    WKM: {
      values: { inQueue, inProgress, completed, failed } as Record<
        string,
        number
      >,
      orderStatus: ['IN_PROGRESS', 'COMPLETED', 'FAILED'],
      statusKeyMap: {
        IN_QUEUE: 'inQueue',
        IN_PROGRESS: 'inProgress',
        COMPLETED: 'completed',
        FAILED: 'failed',
      } as Record<string, string>,
    },
    PD: {
      orderStatus: ['IN_PROGRESS', 'UNDETECTED', 'DETECTED', 'FAILED'],
      values: { inProgress, unDetected, detected, failed } as Record<
        string,
        number
      >,
      statusKeyMap: {
        IN_PROGRESS: 'inProgress',
        UNDETECTED: 'unDetected',
        DETECTED: 'detected',
        FAILED: 'failed',
      } as Record<string, string>,
    },
  };

  const currentStats = statsConfig[statsFor];

  useEffect(() => {
    if (size) {
      const sizeInBytes = size * 1024 * 1024; // The value received is in MB, so we need to convert it to bytes
      setFormatTotalSize(formatSize(sizeInBytes));
    } else {
      setFormatTotalSize('0 MB');
    }
  }, [size]);

  return (
    <Box
      className={className}
      display="flex"
      flexDirection="column"
      gap={pxToVw('1.25rem')}
      sx={{
        border: `${pxToVw('1px')} solid var(--neutral-750)`,
        borderRadius: pxToVw('8px'),
        padding: { xs: pxToVw('1rem'), md: pxToVw('1.5rem') },
        ...style,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: pxToVw('1.125rem'),
            lineHeight: pxToVw('1.5rem'),
            letterSpacing: '-2%',
            fontWeight: 700,
            color: 'var(--gray-700)',
          }}
        >
          {title}
        </Typography>
      </Box>

      <MediaBox>
        <Box
          className="total-count"
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: pxToVw(1.5),
          }}
        >
          <Typography variant="caption" fontWeight={500} color="var(--gray-50)">
            {t('dashboard.service-usage.total-count')}
          </Typography>
          <Typography variant="h3" color="var(--gray-200)" fontWeight={600}>
            {total}
          </Typography>
          <Typography
            fontSize={pxToVw('0.9375rem')}
            lineHeight={pxToVw('1.125rem')}
            letterSpacing={pxToVw('-0.19px')}
            fontWeight={400}
            color="var(--gray-50)"
          >
            {formatTotalSize}
          </Typography>
        </Box>

        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          gap={pxToVw('0.5rem')}
        >
          {currentStats.orderStatus.map((status) => (
            <MediaBox key={status}>
              <OrderStatus value={status} />
              <StaticsResult variant="body1">
                {currentStats.values[currentStats.statusKeyMap[status]] ?? 0}
              </StaticsResult>
            </MediaBox>
          ))}
        </Box>
      </MediaBox>
    </Box>
  );
};

export default StaticsCard;
