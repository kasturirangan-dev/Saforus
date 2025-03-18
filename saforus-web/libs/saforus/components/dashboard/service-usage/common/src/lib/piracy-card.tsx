import { useEffect, useState } from 'react';
import { Box, InputLabel, Link, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatSize } from '@web-workspace/saforus/common/utils';
import { pxToVw } from '@web-workspace/saforus/common/utils';

interface StaticsCardProps {
  title: string;
  seeMoreLink?: string;
  total: number;
  audio?: number;
  image?: number;
  video?: number;
  failed?: number;
  className?: string;
  size?: number;
  style?: any;
}

const StyledTypography = styled(Typography)({
  fontWeight: '600',
  color: 'var(--gray-200)',
  marginTop: pxToVw(4),
  marginBottom: pxToVw(4),
});

const PiracyCard: React.FC<StaticsCardProps> = ({
  title,
  seeMoreLink,
  total,
  audio,
  video,
  image,
  failed,
  className,
  size,
  style,
}) => {
  const { t } = useTranslation();

  const [formatTotalSize, setFormatTotalSize] = useState('0 GB');

  useEffect(() => {
    if (size) {
      const sizeInBytes = size * 1024 * 1024; //The value received is in MB, so we need to convert it to bytes
      setFormatTotalSize(formatSize(sizeInBytes));
    }
  }, [size]);

  return (
    <Box
      className={className}
      display="flex"
      flexDirection="column"
      gap={pxToVw("1.25rem")}
      sx={{
        border: `${pxToVw('1px')} solid var(--neutral-750)`,
        borderRadius: pxToVw('8px'),
        padding: pxToVw('1.5rem'),
        ...style,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: pxToVw("1.125rem"),
            lineHeight: pxToVw('1.5rem'),
            letterSpacing: '-2%',
            fontWeight: 700,
            color: 'var(--gray-700)',
          }}
        >
          {title}
        </Typography>
        {seeMoreLink && (
          <Link
            href={seeMoreLink}
            underline="always"
            target="_blank"
            sx={{
              fontFamily: 'Inter',
              fontSize: pxToVw('0.875rem'),
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: pxToVw('1.25rem'),
              letterSpacing: '-0.1px',
              textDecorationLine: 'underline',
              color: 'var(--gray-50)',
            }}
          >
            {t('dashboard.service-usage.see-more')}
          </Link>
        )}
      </Box>

      {title !== 'DRM License Issue' ? (
        <Box display="flex" gap={pxToVw("0.688rem")} justifyContent="space-between">
          <Box flex={1} display="flex" flexDirection="column" gap={pxToVw(1.5)}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="var(--gray-50)"
            >
              {t('dashboard.service-usage.total-count')}
            </Typography>
            <Typography variant="h3" color="var(--gray-200)" fontWeight={600}>
              {total}
            </Typography>
            <Typography
              fontSize={pxToVw("0.9375rem")}
              lineHeight={pxToVw("1.125rem")}
              letterSpacing={pxToVw("-0.19px")}
              fontWeight={400}
              color="var(--gray-50)"
            >
              {formatTotalSize}
            </Typography>
          </Box>
          <Box flex={1} display="flex" flexDirection="column" gap={pxToVw("0.625rem")}>
            <Box display="flex" justifyContent="space-between">
              <InputLabel
                color="primary"
                sx={{
                  fontSize: pxToVw('0.8125rem'),
                  lineHeight: pxToVw('1.125rem'),
                  letterSpacing: '-0.1px',
                  fontWeight: '500',
                  borderRadius: pxToVw('5px'),
                  padding: pxToVw(['2px', '8px']),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  bgcolor: 'var(--neutral-300)',
                  color: 'var(--gray-700)',
                }}
              >
                {t(
                  'dashboard.service-usage.forensic-watermarking-usage.pd-image'
                ).toLowerCase()}
              </InputLabel>
              <StyledTypography
                variant="body1"
                fontWeight={600}
                sx={{ color: 'var(--gray-50)' }}
              >
                {image}
              </StyledTypography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <InputLabel
                color="primary"
                sx={{
                  fontSize: pxToVw('0.8125rem'),
                  lineHeight: pxToVw('1.125rem'),
                  letterSpacing: '-0.1px',
                  fontWeight: '500',
                  borderRadius: pxToVw('5px'),
                  padding: pxToVw(['2px', '8px']),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  bgcolor: 'var(--neutral-300)',
                  color: 'var(--gray-700)',
                }}
              >
                {t(
                  'dashboard.service-usage.forensic-watermarking-usage.pd-video'
                ).toLowerCase()}
              </InputLabel>
              <StyledTypography
                variant="body1"
                fontWeight={600}
                sx={{ color: 'var(--gray-50)' }}
              >
                {video}
              </StyledTypography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <InputLabel
                color="primary"
                sx={{
                  fontSize: pxToVw('0.8125rem'),
                  lineHeight: pxToVw('1.125rem'),
                  letterSpacing: '-0.1px',
                  fontWeight: '500',
                  borderRadius: pxToVw('5px'),
                  padding: pxToVw(['2px', '8px']),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  bgcolor: 'var(--neutral-300)',
                  color: 'var(--gray-700)',
                }}
              >
                {t(
                  'dashboard.service-usage.forensic-watermarking-usage.pd-audio'
                ).toLowerCase()}
              </InputLabel>
              <StyledTypography
                variant="body1"
                fontWeight={600}
                sx={{ color: 'var(--gray-50)' }}
              >
                {audio}
              </StyledTypography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <InputLabel
                color="primary"
                sx={{
                  fontSize: pxToVw('0.8125rem'),
                  lineHeight: pxToVw('1.125rem'),
                  letterSpacing: '-0.1px',
                  fontWeight: '500',
                  borderRadius: pxToVw('5px'),
                  padding: pxToVw(['2px', '8px']),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  bgcolor: 'var(--red-100)',
                  color: 'var(--red-600)',
                }}
              >
                {t(
                  'dashboard.service-usage.forensic-watermarking-usage.failed'
                ).toLowerCase()}
              </InputLabel>
              <StyledTypography
                variant="body1"
                fontWeight={600}
                sx={{ color: 'var(--gray-50)' }}
              >
                {failed}
              </StyledTypography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="h5">
          {total.toLocaleString('en-US', { useGrouping: true })}
        </Typography>
      )}
    </Box>
  );
};

export default PiracyCard;
