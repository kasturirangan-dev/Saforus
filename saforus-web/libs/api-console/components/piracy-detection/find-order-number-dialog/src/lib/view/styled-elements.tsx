import { Box, Typography, styled } from '@mui/material';

export const Label = styled('label')({
  display: 'block',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  color: 'var(--gray-700)',
});

export const BoxField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
