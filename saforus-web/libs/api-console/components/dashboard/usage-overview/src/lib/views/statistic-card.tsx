import { Box, Typography, LinearProgress } from '@mui/material';
import { StaticsBox } from './styled-elements';
import InfoIcon from '../assets/info.svg';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
interface StatisticCardProps {
  key?: string | number;
  className?: string;
  title: string;
  value?: string | number;
  description?: string;
  height?: string;
  tooltip?: string;
  border?: boolean;
}
interface StatisticCardProps {
  key?: string | number;
  className?: string;
  title: string;
  value?: string | number;
  description?: string;
  height?: string;
  tooltip?: string;
  border?: boolean;
  progress?: number;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  key,
  className,
  title,
  value = 0,
  description,
  height = '70px',
  tooltip,
  border,
  progress,
}) => {
  return (
    <StaticsBox
      sx={{
        height: height,
        border: border ? '1px solid var(--neutral-500)' : 'none',
      }}
      key={key}
      className={className}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
        {tooltip && (
          <Tooltip
            title={null}
            titleHeader={tooltip ?? ''}
            titleHeaderStyle={{ textAlign: 'center' }}
            placement="top"
          >
            <img src={InfoIcon} alt="info" loading="lazy" />
          </Tooltip>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Typography
            fontSize="22px"
            fontWeight={500}
            lineHeight="28px"
            color="var(--gray-700)"
          >
            {value}
          </Typography>
          <Typography variant="body2" color="var(--gray-700)">
            {description}
          </Typography>
        </Box>
        {typeof progress === 'number' && (
          <Box
            sx={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}
          >
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--purple-50)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor:
                      progress >= 80 ? 'var(--red-500)' : 'var(--purple-500)',
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              fontWeight={500}
              color="var(--gray-700)"
            >
              {progress}%
            </Typography>
          </Box>
        )}
      </Box>
    </StaticsBox>
  );
};
