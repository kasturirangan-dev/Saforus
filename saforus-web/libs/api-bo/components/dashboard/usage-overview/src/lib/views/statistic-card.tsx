import { Box, Typography } from '@mui/material';
import { StaticsBox } from './styled-elements';

interface StatisticCardProps {
  key?: string | number;
  className?: string;
  title: string;
  value?: string | number;
  description?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  key,
  className,
  title,
  value = 0,
  description,
}) => {
  return (
    <StaticsBox key={key} className={className}>
      <Typography
        variant="body2"
        fontWeight={600}
        textTransform={'uppercase'}
        color="var(--neutral-950)"
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Typography
          fontSize="20px"
          fontWeight={700}
          lineHeight="28px"
          color="var(--gray-700)"
        >
          {value}
        </Typography>
        <Typography variant="caption" fontWeight={500} color="var(--gray-50)">
          {description}
        </Typography>
      </Box>
    </StaticsBox>
  );
};
