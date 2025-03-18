import React, { useMemo } from 'react';
import { Box, Link, Typography, IconButton, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@web-workspace/shared/components/widgets/input';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import style from './index.module.scss';
import { LoginProps } from '../interface';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.25rem',
  fontWeight: 500,
  lineHeight: '2.75rem',
  letterSpacing: '-0.02em',
  color: 'var(--gray-700)',
}));

const LoginFormView = ({
  handleSubmit,
  onSubmit,
  register,
  watch,
  errors,
  loading,
}: LoginProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { email, password } = watch();
  const isLoginDisabled = useMemo(() => !email || !password, [email, password]);

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  return (
    <Box margin="auto" minWidth="424px">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Title textAlign="center">{'CS API BACK OFFICE'}</Title>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            marginTop: '2rem',
          }}
        >
          <Input
            fullWidth
            sx={{
              height: '46px',
            }}
            label={t('common.email')}
            placeholder={t('common.placeholder-email')}
            className={style.input}
            {...register('email')}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
          />
          <Input
            fullWidth
            sx={{
              height: '46px',
            }}
            label={t('common.password')}
            placeholder={t('common.placeholder-pass')}
            className={style.input}
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
          <LoadingButton
            fullWidth
            sx={{
              marginTop: '0.5rem',
              height: '46px',
            }}
            disabled={isLoginDisabled}
            loading={loading}
            type="submit"
          >
            {t('button.log-in')}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(LoginFormView);
