import React, { useEffect } from 'react';
import { Box, styled, Typography, IconButton, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSnapshot } from 'valtio';
import Input from '@web-workspace/shared/components/widgets/input';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { NewPasswordProps } from '../interface';
import Logo from '../assets/LogoGlyphs.svg';
import { PasswordRequirements } from '@web-workspace/api-console/common/views';
import i18next from 'i18next';

const Text = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '28px',
  letterSpacing: '-0.02em',
}));

const NewPasswordFormView = ({
  handleSubmit,
  onSubmit,
  watch,
  register,
  errors,
  loading,
  email,
}: NewPasswordProps) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const { clearAuthState } = useSnapshot(CsApiAuthStore);
  useEffect(() => {
    clearAuthState();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      height="100vh"
      width="100%"
    >
      <Box
        component="form"
        width="100%"
        maxWidth="450px"
        padding={6}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <Text>{t('page-new-password.reset-account-pass')}</Text>
            {i18next.language === 'ko' ? (
              <Text
                sx={{
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  color: 'var(--gray-50)',
                  letterSpacing: '-0.1px',
                  fontWeight: '400',
                }}
              >
                {email} <br />
                {t('page-new-password.reset-password-email')}
              </Text>
            ) : (
              <Text
                sx={{
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  color: 'var(--gray-50)',
                  letterSpacing: '-0.1px',
                  fontWeight: '400',
                }}
              >
                {`${t('page-new-password.reset-password-email')} ${email}.`}
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column">
            <Input
              label={`${t('page-new-password.new-password')}*`}
              placeholder={t('common.placeholder-pass')}
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              errorMessage={
                errors.password?.message && t(`${errors.password?.message}`)
              }
              icon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility sx={{ color: 'var(--gray-25)' }} />
                  ) : (
                    <VisibilityOff sx={{ color: 'var(--gray-25)' }} />
                  )}
                </IconButton>
              }
            />
            <Input
              label={`${t('page-new-password.confirm-pass')}*`}
              placeholder={t('page-new-password.placeholder-confirm-pass')}
              {...register('confirmPassword')}
              type={showRePassword ? 'text' : 'password'}
              errorMessage={
                errors.confirmPassword?.message &&
                t(`${errors.confirmPassword?.message}`)
              }
              icon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRePassword}
                  onMouseDown={handleMouseDownRePassword}
                  edge="end"
                >
                  {showRePassword ? (
                    <Visibility sx={{ color: 'var(--gray-25)' }} />
                  ) : (
                    <VisibilityOff sx={{ color: 'var(--gray-25)' }} />
                  )}
                </IconButton>
              }
            />
            <PasswordRequirements
              sx={{ mt: '1rem' }}
              password={watch('password')}
              error={Boolean(errors.password?.message)}
            />
          </Box>

          <LoadingButton
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
            }}
            type="submit"
            loading={loading}
          >
            {t('page-new-password.reset-password')}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(NewPasswordFormView);
