import { Box, Link, Typography } from '@mui/material';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import ProgressBarLabel from '@web-workspace/shared/components/widgets/progress-bar-label';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import { differenceDays } from '@web-workspace/shared/helpers/dates';
import exp from 'constants';
import { useTranslation } from 'react-i18next';

interface ProgressCardProps {
  title: string;
  className?: string;
  seeMoreLink?: string;
  expiryPeriod?: string;
  totalNumber: number;
  unit: string;
  percent: number;
  notionlabel?: string;
  tooltip?: string; // tooltip appreance on hover title
  available?: boolean;
  //   add more below
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  className,
  seeMoreLink,
  expiryPeriod,
  totalNumber,
  unit,
  percent,
  notionlabel,
  tooltip,
  available = true,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      className={className}
      display="flex"
      flexDirection="column"
      sx={{
        background: 'var(--base-white)',
        border: `${pxToVw('1px')} solid var(--neutral-750)`,
        borderRadius: pxToVw('8px'),
        padding: pxToVw(['12px', '24px']),
      }}
    >
      {available ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip title={null} description={tooltip}>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              color="var(--gray-700)"
            >
              {title}
            </Typography>
          </Tooltip>

          {seeMoreLink && (
            <Link
              href={seeMoreLink}
              underline="always"
              target="_blank"
              sx={{
                fontFamily: 'Inter',
                fontSize: pxToVw('0.8125rem'),
                lineHeight: pxToVw('1rem'),
                color: 'var(--gray-50)',
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: '-0.1px',
                textDecorationLine: 'underline',
              }}
            >
              {t('dashboard.service-usage.see-more')}
            </Link>
          )}
          {expiryPeriod && (
            <Typography
              fontSize={pxToVw('13px')}
              lineHeight={pxToVw('16px')}
              fontWeight={500}
              color="var(--gray-50)"
            >
              {t('dashboard.service-usage.watermarking-capacity.days-left', {
                numberOfDay: differenceDays(new Date(), expiryPeriod),
              })}
            </Typography>
          )}
        </Box>
      ) : (
        <Typography
          variant="subtitle2"
          fontWeight="600"
          color="var(--gray-700)"
          paddingTop={pxToVw('8px')}
        >
          {title}
        </Typography>
      )}
      {available ? (
        <Box display="flex" alignItems="center" gap={pxToVw('0.5rem')}>
          <Typography variant="h5" color="var(--gray-200)">
            {totalNumber ? totalNumber : '--'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: '500',
              color: 'var(--gray-900)',
            }}
          >
            {unit}
          </Typography>
          <ProgressBarLabel
            value={percent}
            notionlabel={notionlabel}
            sx={{
              fontSize: pxToVw('0.9375rem'),
              lineHeight: pxToVw('1.375rem'),
              fontWeight: 500,
              letterSpacing: '-0.1px',
              color: 'var(--gray-50)',
            }}
          />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" flex="1">
          <Typography variant="body1" fontWeight={500} color="var(--gray-25)">
            {t('dashboard.service-usage.cloud-storage.disabled')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProgressCard;
