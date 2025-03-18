import { Box, Typography, styled } from '@mui/material';

export const GuideContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
}));

export const GuideTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-50)',
  '& span:last-child': {
    color: 'var(--purple-500)',
  },
}));

export const MenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}));

export const MenuTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-200)',
}));

export const MenuItem = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-50)',
  '&:hover': {
    color: 'var(--purple-400)',
  },

  '&.active': {
    color: 'var(--purple-400)',
  },

  '& a': {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));
