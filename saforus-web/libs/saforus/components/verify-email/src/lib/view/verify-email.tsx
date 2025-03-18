import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Logo from '../assets/LogoGlyphs.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { VerifyEmailViewProps } from '../interface';
import i18next from 'i18next';

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: 'var(--shadow-xsm)',
  borderRadius: '5px',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  padding: '24px',
}));

const VerifyEmailView = ({
  onSubmit,
  loading,
  email,
  completed,
}: VerifyEmailViewProps) => {
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
            <Typography
              variant="h6"
              color={'var(--gray-700)'}
              fontWeight={500}
              sx={{ marginTop: '1.5rem' }}
            >
              {completed
                ? t('page-verify-email.activation-title')
                : t('page-verify-email.title')}
            </Typography>
            {completed ? (
              <Box>
                {i18next.language === 'ko' ? (
                  <Typography
                    variant="subtitle2"
                    color={'var(--gray-50)'}
                    sx={{
                      marginTop: '8px',
                    }}
                  >
                    {`'${email}'`} <br />
                    {t('page-verify-email.activation-description-1')}
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
                      'page-verify-email.activation-description-1'
                    )} '${email}'.`}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box>
                {i18next.language === 'ko' ? (
                  <Typography
                    variant="subtitle2"
                    color={'var(--gray-50)'}
                    sx={{
                      marginTop: '8px',
                    }}
                  >
                    {`'${email}' ${t('page-verify-email.via')}`} <br />
                    {t('page-verify-email.content-description-1')}
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
                      'page-verify-email.content-description-1'
                    )} '${email}'.`}
                  </Typography>
                )}
              </Box>
            )}
            <Typography
              variant="subtitle2"
              color={'var(--gray-50)'}
              sx={{
                marginTop: '1.5rem',
              }}
            >
              {completed
                ? t('page-verify-email.activation-description-2')
                : t('page-verify-email.content-description-2')}
            </Typography>
          </Box>
          <LoadingButton
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
              marginTop: '24px',
            }}
            onClick={onSubmit}
            loading={loading}
            color="primary"
          >
            {completed ? t('button.log-in') : t('button.activate')}
          </LoadingButton>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default React.memo(VerifyEmailView);
