import { Box, styled } from '@mui/material';

export const StaticsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-700)',
  borderRadius: '8px',
  padding: '12px 24px',
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  // Use Grid for responsive width
  gridTemplateRows: '1fr',
  // Fix the height of the chart to equal usage summary block
  height: '100%',
  [theme.breakpoints.up(1680)]: {
    padding: '0 1rem',
  },
}));
