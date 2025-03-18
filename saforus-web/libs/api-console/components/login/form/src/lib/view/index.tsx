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
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import Logo from '../assets/Logo.svg';

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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickResetPass = () => {
    navigate(API_ROUTES.RESET.path);
  };

  const { email, password } = watch();
  const isLoginDisabled = useMemo(() => !email || !password, [email, password]);

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const hideSignup = getEnvVar('VITE_HIDE_SIGNUP') === 'true';

  return (
    <Box margin="auto" minWidth="360px">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            width="203"
            height="64"
            loading="lazy"
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%', marginTop: '36px' }}
        >
          <Input
            fullWidth
            label={t('common.email')}
            placeholder={t('common.login-email-placeholder')}
            className={style.input}
            {...register('email')}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
          />
          <Input
            fullWidth
            label={t('common.password')}
            placeholder={t('common.login-pass-placeholder')}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Link
              onClick={handleClickResetPass}
              underline="hover"
              target="_self"
              rel="noopener"
              sx={{
                fontSize: '0.9375rem',
                color: 'var(--purple-400)',
                fontWeight: '600',
                lineHeight: '1.375rem',
                letterSpacing: '-0.1px',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              {t('page-login.api-forgot-pass')}
            </Link>
          </Box>
          <LoadingButton
            fullWidth
            sx={{
              height: 40,
            }}
            disabled={isLoginDisabled}
            loading={loading}
            type="submit"
          >
            {t('button.log-in')}
          </LoadingButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            gap: '1rem',
            marginY: '32px',
          }}
        >
          <Typography
            sx={{
              color: 'var(--gray-50)',
            }}
            variant="subtitle2"
          >
            {t('apiRegister.form.donthaveaccount')}
          </Typography>

          {hideSignup ? (
            <Link
              href={linkSupport}
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'var(--purple-400)',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '20px',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
              }}
            >
              {t('page-login.contact-us')}
            </Link>
          ) : (
            <Link
              onClick={() => {
                navigate(API_ROUTES.REGISTER.path);
              }}
              underline="hover"
              target="_self"
              rel="noopener"
              sx={{
                color: 'var(--purple-400)',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '20px',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
              }}
            >
              {t('page-login.sign-up')}
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(LoginFormView);
