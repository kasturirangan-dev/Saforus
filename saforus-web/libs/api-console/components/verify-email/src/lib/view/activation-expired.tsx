import React from 'react';
import { Box, IconButton, styled, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../assets/LogoGlyphs.svg';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { ActivationExpiredViewProps } from '../interface';

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: 'var(--shadow-xsm)',
  borderRadius: '5px',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  padding: '24px',
}));

const ActivationExpiredView = ({
  loading,
  resend,
  email,
}: ActivationExpiredViewProps) => {
  const { t, i18n } = useTranslation();
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
      <StyledBox component={'form'} sx={{ width: '440px' }}>
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
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
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
          </Box>
          <Box
            sx={{ alignItems: 'center', textAlign: 'center', width: '100%' }}
          >
            <Typography
              variant="h6"
              color={'var(--gray-700)'}
              fontWeight={500}
              sx={{ marginTop: '1.5rem' }}
            >
              {t('apiRegister.page-register-completed.title-expired')}
            </Typography>
            {i18n.language === 'ko' ? (
              <Typography
                variant="subtitle2"
                color={'var(--gray-50)'}
                sx={{
                  marginTop: '8px',
                  whiteSpace: 'pre-line',
                }}
              >
                {`${t(
                  'apiRegister.page-register-completed.expired-description1'
                )} '${email}'${t(
                  'apiRegister.page-register-completed.expired-description2'
                )}`}
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                color={'var(--gray-50)'}
                sx={{
                  marginTop: '8px',
                }}
              >
                {`${t(
                  'apiRegister.page-register-completed.expired-description'
                )} '${email}'.`}
              </Typography>
            )}
          </Box>
          <LoadingButton
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
              marginTop: '24px',
            }}
            onClick={() => resend(email)}
            loading={loading}
            color="primary"
          >
            {t('apiRegister.button.resend')}
          </LoadingButton>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default React.memo(ActivationExpiredView);
