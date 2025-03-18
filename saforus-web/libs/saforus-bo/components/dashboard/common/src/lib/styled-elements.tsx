import { Box, Typography, styled } from '@mui/material';

export const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '24px',
  backgroundColor: 'var(--base-white)',
  border: '1px solid var(--neutral-700)',
  borderRadius: '8px',
}));

export const StaticsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '30px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-700)',
}));

// For summary
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
