import { Box, Typography, styled } from '@mui/material';

export const PlainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--base-white)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  gap: '16px',
}));

export const DetailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  borderRadius: '8px',
  gap: '12px',
  backgroundColor: 'var(--neutral-100)',
}));

export const PlanTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '28px',
  letterSpacing: '-0.02em',
  color: 'var(--gray-900)',
}));

export const PlanPrice = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: '32px',
  letterSpacing: '-0.02em',
  color: 'var(--gray-700)',
}));
