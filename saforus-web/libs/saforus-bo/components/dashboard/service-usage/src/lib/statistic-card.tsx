import { Box, Typography } from '@mui/material';
import {
  MediaBox,
  StaticsBox,
  StaticsResult,
} from '@web-workspace/saforus-bo/components/dashboard/common';
import { useTranslation } from 'react-i18next';
import { CustomLabel } from '@web-workspace/saforus-bo/common/view';
import { Link } from 'react-router-dom';

interface StatisticData {
  key: string;
  value: number;
}

interface StaticsCardProps {
  title: string;
  totalInfo?: string | null;
  data: StatisticData[];
  seeMoreLink?: string;
  className?: string;
  style?: any;
}

const normalizeStatus = (value: string): string => {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert underscores between camelCase words
    .toUpperCase();
};

export const StatisticCard: React.FC<StaticsCardProps> = ({
  title,
  totalInfo,
  data,
  seeMoreLink,
  className,
  style,
}) => {
  const { t } = useTranslation();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <StaticsBox
      className={className}
      sx={{
        gap: '1.25rem',
        padding: '1.5rem',
        ...style,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="subtitle1"
          fontWeight={500}
          color="var(--gray-700)"
        >
          {title}
        </Typography>
        {seeMoreLink && (
          <Link
            to={seeMoreLink}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              textDecorationLine: 'underline',
              textUnderlineOffset: '2px',
              color: 'var(--gray-100)',
            }}
          >
            {t('adminDashboard.see-more')}
          </Link>
        )}
      </Box>
      <MediaBox>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Typography variant="body1" color="var(--gray-700)">
            {t('adminDashboard.summary.total')}
          </Typography>
          <Typography variant="h3" color="var(--gray-200)">
            {total}
          </Typography>
          <Typography variant="body1" color="var(--gray-700)">
            {totalInfo}
          </Typography>
        </Box>

        <Box display="flex" flex={1} flexDirection="column" gap="0.5rem">
          {data.map(({ key, value }) => (
            <MediaBox key={key}>
              <CustomLabel value={normalizeStatus(key)} />
              <StaticsResult variant="body1">{value}</StaticsResult>
            </MediaBox>
          ))}
        </Box>
      </MediaBox>
    </StaticsBox>
  );
};
