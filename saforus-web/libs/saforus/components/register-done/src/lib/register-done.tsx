import React from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@web-workspace/shared/components/widgets/button';
import Logo from './assets/LogoGlyphs.svg';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import i18next from 'i18next';

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

export interface RegisterDoneComponentProps {
  email?: string;
}

const RegisterDoneComponent = (props: RegisterDoneComponentProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            alignItems: 'flex-start',
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
          <Box
            sx={{ alignItems: 'center', textAlign: 'center', width: '100%' }}
          >
            <Text sx={{ marginTop: '24px' }}>
              {t('page-register-done.title')}
            </Text>
            {i18next.language === 'ko' ? (
              <Text
                sx={{
                  marginTop: '8px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color:
                    theme.palette.mode === 'light'
                      ? 'var(--gray-50)'
                      : 'var(--neutral-800)',
                  letterSpacing: '-0.1px',
                  fontWeight: '400',
                }}
              >
                {`'${props?.email || 'abc000@markany.com'}'${t('page-register-done.via')}`} <br />
                {`${t('page-register-done.content-description-1')}`}
              </Text>
            ) : (
              <Text
                sx={{
                  marginTop: '8px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color:
                    theme.palette.mode === 'light'
                      ? 'var(--gray-50)'
                      : 'var(--neutral-800)',
                  letterSpacing: '-0.1px',
                  fontWeight: '400',
                }}
              >
                {`${t('page-register-done.content-description-1')} '${props?.email || 'abc000@markany.com'}'.`}
              </Text>
            )}
            <Text
              sx={{
                marginTop: '20px',
                fontSize: '16px',
                lineHeight: '24px',
                color:
                  theme.palette.mode === 'light'
                    ? 'var(--gray-50)'
                    : 'var(--neutral-800)',
                letterSpacing: '-0.1px',
                fontWeight: '400',
              }}
            >
              {t('page-register-done.content-description-2')}
            </Text>
          </Box>
          <Button
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
              marginTop: '24px',
            }}
            onClick={() => {
              navigate(ROUTES.LOGIN.path);
            }}
            color="primary"
          >
            {t('button.log-in')}
          </Button>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default React.memo(RegisterDoneComponent);
