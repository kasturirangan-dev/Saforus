import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/LogoGlyphs.svg';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

const Text = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '28px',
  letterSpacing: '-0.02em',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: 'var(--shadow-xsm)',
  borderRadius: '5px',
  border: '1px solid #DAE0E6',
  padding: '24px',
}));

export function RegisterCompletedComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledBox sx={{ width: '400px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={Logo}
            alt="SaForus Logo"
            title="Logo Glyphs"
            width="32"
            height="32"
            loading="lazy"
          />
          <>
            <Box
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Text sx={{ marginTop: '24px' }}>
                {t('apiRegister.page-register-completed.title')}
              </Text>
              <Text
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: 'var(--gray-50)',
                  marginTop: '8px',
                  letterSpacing: '-0.1px',
                  fontWeight: '400',
                }}
              >
                {t('apiRegister.page-register-completed.description1')} <br />
                {t('apiRegister.page-register-completed.description2')}
              </Text>
            </Box>
            <Button
              sx={{
                width: '100%',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                marginTop: '24px',
              }}
              onClick={() => navigate(API_ROUTES.LOGIN.path)}
              color="primary"
            >
              {t('apiRegister.button.login')}
            </Button>
          </>
        </Box>
      </StyledBox>
    </Box>
  );
}

export default RegisterCompletedComponent;
