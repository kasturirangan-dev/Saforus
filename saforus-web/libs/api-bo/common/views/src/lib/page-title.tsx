import { Box, Typography, styled } from '@mui/material';
import { CSSProperties } from 'react';

export interface PageTitleProps {
  title: string;
  sx?: CSSProperties;
  children?: React.ReactNode;
}

const BoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--neutral-700)',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '2rem',
  letterSpacing: '-0.02em',
  color: 'var(--gray-700)',
}));

const PageTitle = ({ title, sx, children }: PageTitleProps) => {
  return (
    <BoxTitle sx={{ ...sx }}>
      <Title>{title}</Title>
      {children}
    </BoxTitle>
  );
};

export default PageTitle;
