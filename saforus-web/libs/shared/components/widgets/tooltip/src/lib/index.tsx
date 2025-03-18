import { Box, Typography, styled } from '@mui/material';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

interface CustomTooltipProps extends TooltipProps {
  className?: string;
  titleHeader?: string;
  description?: string;
  titleHeaderStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: 'var(--gray-50)',
    maxWidth: 420,
    fontSize: 14,
    '&::before': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'var(--base-white)'
          : 'var(--gray-900)',
      border:
        theme.palette.mode === 'light'
          ? '1px solid #DAE0E6'
          : '1px solid #2E3545',
    },
  },
  '& .MuiTooltip-tooltipArrow': {
    backgroundColor:
      theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-900)',
    color: 'var(--gray-50)',
    maxWidth: 420,
    fontSize: 14,
    padding: '8px 12px',
    border:
      theme.palette.mode === 'light'
        ? '1px solid #DAE0E6'
        : '1px solid #2E3545',
    borderRadius: 5,
    boxShadow: 'var(--shadow-md)',
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  whiteSpace: 'pre-line',
}));
const TextDesc = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '18px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-50)',
}));

export function Tooltip(props: CustomTooltipProps) {
  const {
    titleHeader,
    description,
    children,
    descriptionStyle,
    titleHeaderStyle,
    ...otherProps
  } = props;

  return (
    <HtmlTooltip
      {...otherProps}
      title={
        <React.Fragment>
          {titleHeader && <Text style={titleHeaderStyle}>{titleHeader}</Text>}
          {description && (
            <TextDesc style={descriptionStyle}>{description}</TextDesc>
          )}
        </React.Fragment>
      }
      arrow
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {children}
      </Box>
    </HtmlTooltip>
  );
}

export default Tooltip;
