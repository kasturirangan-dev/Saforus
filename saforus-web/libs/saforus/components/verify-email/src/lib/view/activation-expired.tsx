import React from 'react';
import { Box, IconButton, styled, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import Logo from '../assets/LogoGlyphs.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { ActivationExpiredViewProps } from '../interface';
import Input from '@web-workspace/shared/components/widgets/input';

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: 'var(--shadow-xsm)',
  borderRadius: '5px',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  padding: '24px',
}));

const ActivationExpiredView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
  onClose,
}: ActivationExpiredViewProps) => {
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
      <StyledBox
        onSubmit={handleSubmit(onSubmit)}
        component={'form'}
        sx={{ width: '400px' }}
      >
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
              justifyContent: 'space-between',
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
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
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
              {t('page-verify-email.expired-title')}
            </Typography>
            <Typography
              variant="subtitle2"
              color={'var(--gray-50)'}
              sx={{
                marginTop: '8px',
              }}
            >
              {t('page-verify-email.expired-description')}
            </Typography>
            <Input
              style={{
                width: '100%',
                marginTop: '1.5rem',
                justifyContent: 'flex-start',
                textAlign: 'left',
              }}
              label={`${t('common.email-address')}*`}
              placeholder={t('common.placeholder-email3')}
              {...register('email')}
              errorMessage={
                errors.email?.message && t(`${errors.email?.message}`)
              }
            />
          </Box>
          <LoadingButton
            type="submit"
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
              marginTop: '24px',
            }}
            loading={loading}
            color="primary"
          >
            {t('page-verify-email.expired-button')}
          </LoadingButton>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default React.memo(ActivationExpiredView);
