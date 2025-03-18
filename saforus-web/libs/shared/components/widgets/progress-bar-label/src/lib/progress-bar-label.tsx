import React from 'react';
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps, Theme, styled } from '@mui/material';

const StyleLinearProgress = styled(LinearProgress)(({ theme }) => ({
  color: 'primary',
  height: '8px',
  borderRadius: '4px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--purple-50)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '4px',
    backgroundColor: 'var(--purple-600)',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  variant: 'body2',
  color: 'var(--gray-25)',
}));

interface ProgressBarLabelProps extends LinearProgressProps {
  sxContainer?: SxProps<Theme>;
  sxLabel?: SxProps<Theme>;
  notionlabel?: string;
}

const ProgressBarLabel: React.FC<ProgressBarLabelProps> = (
  props: ProgressBarLabelProps
) => {
  const { value, sxContainer, sxLabel } = props;
  const newValue = value ? (value > 100 ? 100 : value) : 0;
  const newProps = { ...props, value: newValue };
  return (
    <StyledBox sx={sxContainer}>
      <Box sx={{ width: '100%', mr: 1, position: 'relative' }}>
        <StyleLinearProgress variant="determinate" {...newProps} />
        {props?.notionlabel && (
          <Box
            sx={{
              minWidth: 50,
              fontSize: '0.875rem',
              fontWeight: '500',
              position: 'absolute',
              left: `calc(${newValue}% - 25px)`,
              top: '10px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: 'var(--gray-50)' }}
            >
              {props.notionlabel ?? '--'}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <StyledTypography sx={sxLabel}>{`${value}%`}</StyledTypography>
      </Box>
    </StyledBox>
  );
};

export default ProgressBarLabel;
