import { Box, Chip, Typography, styled } from '@mui/material';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './index.module.scss';

import { pxToVw } from '@web-workspace/saforus/common/utils';

interface CustomTooltipProps extends TooltipProps {
  className?: string;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: 'var(--gray-900)',
    maxWidth: 285,
    fontSize: pxToVw(14),
    '&::before': {
      backgroundColor: 'var(--base-white)',
      border: '1px solid var(--neutral-700, #DAE0E6)',
    },
  },
  '& .MuiTooltip-tooltipArrow': {
    backgroundColor: 'var(--base-white)',
    color: 'var(--neutral-200)',
    maxWidth: 285,
    fontSize: pxToVw(14),
    fontWeight: 500,
    padding: '8px 12px',
    border: '1px solid var(--neutral-700, #DAE0E6)',
    borderRadius: 5,
  },
}));

export function TooltipUserRole(props: CustomTooltipProps) {
  const { children, ...otherProps } = props;
  const { t } = useTranslation();

  return (
    <HtmlTooltip
      {...otherProps}
      title={
        <Box
          sx={{
            width: '100%',
            flexDirection: 'column',
            textAlign: 'left',
            padding: '12px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              textAlign: 'left',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Chip
                label={`${t('team-member.role.owner')}`}
                sx={{
                  color: 'var(--purple-600)',
                  backgroundColor: 'var(--purple-50)',
                  borderRadius: '5px',
                  fontWeight: '500',
                  fontSize: '14px',
                }}
              />
              <Box sx={{ width: '250px' }}>
                <ul className={style.list}>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.master.content1')}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.master.content2')}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.master.content3')}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.master.content4')}
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
            <Box sx={{ mt: '0.5rem' }}>
              <Chip
                label={`${t('team-member.role.member')}`}
                sx={{
                  borderRadius: '5px',
                  fontWeight: '500',
                  fontSize: '14px',
                  color: 'var(--gray-700)',
                  backgroundColor: 'var(--neutral-300)',
                }}
              />
              <Box sx={{ width: '200px' }}>
                <ul className={style.list}>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.member.content1')}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.member.content2')}
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
            <Box sx={{ mt: '0.5rem' }}>
              <Chip
                label={`${t('team-member.role.viewer')}`}
                sx={{
                  color: 'var(--gray-700)',
                  backgroundColor: 'var(--neutral-300)',
                  borderRadius: '5px',
                  fontWeight: '500',
                  fontSize: '14px',
                }}
              />
              <Box sx={{ width: '200px' }}>
                <ul className={style.list}>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.viewer.content1')}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption" color="var(--gray-50)">
                      {t('team-member.tooltip.viewer.content2')}
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
      }
      arrow
    >
      <Box
        sx={{
          paddingTop: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </HtmlTooltip>
  );
}

export default React.memo(TooltipUserRole);
