import { Box, Typography, styled } from '@mui/material';

export const StaticsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-700)',
  borderRadius: '8px',
  padding: '12px 24px',
}));

export const StaticsResult = styled(Typography)({
  fontWeight: '600',
  color: 'var(--gray-50)',
});

export const MediaBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
});
