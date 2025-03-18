import { Box, styled, Typography, useTheme } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import NotFoundIconDark from '../assets/not-found-icon-dark.svg';
import NotFoundIconLight from '../assets/not-found-icon-light.svg';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
}));

const StyledMuiButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 14,
  fontWeight: '600',
  lineHeight: '20px',
  textTransform: 'none',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-700)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 18px',
  fontSize: 15,
  fontWeight: '600',
  marginTop: theme.spacing(8),
}));

const Text = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--main-brand)' : 'var(--purple-300)',
  fontSize: 28,
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '36px',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  marginTop: theme.spacing(12),
}));

export function SaforusPagesNotfound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <StyledBox>
      {theme.palette.mode === 'light' ? (
        <img src={NotFoundIconLight} alt="404" />
      ) : (
        <img src={NotFoundIconDark} alt="404" />
      )}

      <Text>{t('page-not-found.404-not-found')}</Text>
      <Text
        sx={{
          fontSize: 36,
          lineHeight: '44px',
          color:
            theme.palette.mode === 'light'
              ? 'var(--gray-700)'
              : 'var(--neutral-25)',
          marginTop: theme.spacing(2),
        }}
      >
        {t('page-not-found.page-not-exist')}
      </Text>
      <Text
        sx={{
          fontSize: 16,
          lineHeight: '24px',
          color:
            theme.palette.mode === 'light'
              ? 'var(--gray-50)'
              : 'var(--neutral-600)',
          marginTop: theme.spacing(8),
          letterSpacing: '-0.1px',
          fontWeight: '500',
        }}
      >
        {t('page-not-found.page-not-exist-description')}
      </Text>

      <StyledButton
        variant={'contained'}
        onClick={() => {
          navigate('');
        }}
      >
        {t('button.back-to-start')}
      </StyledButton>
    </StyledBox>
  );
}

export default SaforusPagesNotfound;
