import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import { MediaUsage } from '@web-workspace/api-console/components/dashboard/data';
import { StaticsBox, MediaBox, StaticsResult } from './styled-elements';

interface StaticsCardProps {
  type: 'watermarking' | 'detection';
  title: string;
  staticsData?: MediaUsage;
  className?: string;
  style?: any;
}

export const MediaCard: React.FC<StaticsCardProps> = ({
  type,
  title,
  staticsData,
  className,
  style,
}) => {
  const total = staticsData?.total || 0;

  const { t } = useTranslation();

  const mediaData =
    type === 'watermarking'
      ? [
          { status: 'IN_PROGRESS', value: staticsData?.data?.inProgress || 0 },
          { status: 'COMPLETED', value: staticsData?.data?.completed || 0 },
          { status: 'FAILED', value: staticsData?.data?.failed || 0 },
        ]
      : [
          { status: 'IN_PROGRESS', value: staticsData?.data?.inProgress || 0 },
          { status: 'DETECTED', value: staticsData?.data?.detected || 0 },
          { status: 'UNDETECTED', value: staticsData?.data?.undetected || 0 },
          { status: 'FAILED', value: staticsData?.data?.failed || 0 },
        ];

  return (
    <StaticsBox
      className={className}
      sx={{
        gap: '1.25rem',
        padding: '1.5rem',
        height: '200px',
        ...style,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: '1.125rem',
            lineHeight: '1.5rem',
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
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="caption"
            fontWeight={500}
            color="var(--gray-50)"
            textTransform={'uppercase'}
          >
            {t('apiDashboard.service-usage.total')}
          </Typography>
          <Typography variant="h5" color="var(--gray-200)">
            {total}
          </Typography>
        </Box>

        <Box display="flex" flex={1} flexDirection="column" gap="0.5rem">
          {mediaData.map((data, index) => (
            <MediaBox key={index}>
              <DetectionStatus value={data.status} />
              <StaticsResult variant="body1">{data.value}</StaticsResult>
            </MediaBox>
          ))}
        </Box>
      </MediaBox>
    </StaticsBox>
  );
};
