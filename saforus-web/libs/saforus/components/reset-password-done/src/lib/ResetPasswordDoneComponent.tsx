import React from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@web-workspace/shared/components/widgets/button';
import Logo from './assets/LogoGlyphs.svg';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

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
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  padding: '24px',
}));

const ResetPasswordDoneComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledBox sx={{ width: '400px' }}>
        <Box display="flex" flexDirection="column" gap={6}>
          <img
            src={Logo}
            alt="SaForus Logo"
            title="Logo Glyphs"
            width="32"
            height="32"
            loading="lazy"
          />
          <Box display="flex" flexDirection="column" gap={2}>
            <Text textAlign="center">{t('page-reset-done.title')}</Text>
            <Text
              textAlign="center"
              sx={{
                fontSize: '1rem',
                lineHeight: '1.5rem',
                color:
                  theme.palette.mode === 'light'
                    ? 'var(--gray-50)'
                    : 'var(--neutral-800)',
                letterSpacing: '-0.1px',
                fontWeight: '400',
              }}
            >
              {t('page-reset-done.description')}
            </Text>
          </Box>
          <Button
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
            }}
            onClick={() => {
              navigate(ROUTES.LOGIN.path);
            }}
            color="primary"
          >
            {t('button.reset-login')}
          </Button>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default React.memo(ResetPasswordDoneComponent);
