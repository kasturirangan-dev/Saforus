import { Box, ButtonBase, Typography, styled } from '@mui/material';
import { CSSProperties } from 'react';
import ArrowLeftIcon from './assets/arrow-left.svg';

export interface PageTitleProps {
  title: string;
  sx?: CSSProperties;
  children?: React.ReactNode;
  onBack?: () => void;
}

const BoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--neutral-700)',
  gap: '2px',
}));

const BoxTitleAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '2rem',
  letterSpacing: '-0.02em',
  color: 'var(--gray-700)',
}));

const PageTitle = ({ title, sx, children, onBack }: PageTitleProps) => {
  return (
    <BoxTitle sx={{ ...sx }}>
      <BoxTitleAction>
        {onBack && (
          <ButtonBase onClick={onBack}>
            <img src={ArrowLeftIcon} alt="back" />{' '}
          </ButtonBase>
        )}
        <Title>{title}</Title>
      </BoxTitleAction>
      {children}
    </BoxTitle>
  );
};

export default PageTitle;
