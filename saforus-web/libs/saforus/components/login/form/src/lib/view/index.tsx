import React from 'react';
import { Box, Link, Typography, IconButton, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@web-workspace/shared/components/widgets/input';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import style from './index.module.scss';
import { LoginProps } from '../interface';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import { GoogleIcon } from '../assets/google-icon';

const LoginFormView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
  disabled,
}: LoginProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickResetPass = () => {
    navigate(ROUTES.RESET.path);
  };

  const handleCredentialResponse = (response: CredentialResponse) => {
    if (response.credential) {
      onSubmit({ email: 'null', password: 'null', isGoogleLogin: true, googleToken: response.credential });
    }
    else {
      console.error('No credential received');
    }
  };

  return (
    <Box margin="auto" minWidth={pxToVw("424px")} maxWidth={pxToVw("424px")}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            sx={{
              color:
                theme.palette.mode === 'light'
                  ? 'var(--gray-700)'
                  : 'var(--neutral-200)',
            }}
          >
            {t('page-login.welcome')}
          </Typography>
          <Input
            style={{ width: '100%', marginTop: `${pxToVw('1.5rem')}` }}
            label={t('common.email-address')}
            placeholder={t('common.placeholder-email')}
            className={style.input}
            {...register('email')}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
          />
          <Input
            style={{ marginTop: `${pxToVw('8px')}`, width: '100%', fontSize: `${pxToVw('14px')}` }}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'flex-end',
              marginTop: `${pxToVw('0.2rem')}`,
            }}
          >
            <Link
              onClick={handleClickResetPass}
              underline="hover"
              target="_self"
              rel="noopener"
              sx={{
                fontSize: `${pxToVw('0.9375rem')}`,
                color: 'var(--purple-400)',
                fontWeight: '600',
                lineHeight: `${pxToVw('1.375rem')}`,
                letterSpacing: '-0.1px',
                textUnderlineOffset: `${pxToVw('4px')}`,
                cursor: 'pointer',
              }}
            >
              {t('page-login.forgot-pass')}
            </Link>
          </Box>

          <LoadingButton
            fullWidth
            sx={{
              height: pxToVw(46),
              width: '100%',
              paddingTop: `${pxToVw(' 0.75rem')}`,
              paddingBottom: `${pxToVw('0.75rem')}`,
              marginTop: `${pxToVw('2rem')}`,
            }}
            loading={loading}
            disabled={disabled}
            type="submit"
          >
            {t('button.log-in')}
          </LoadingButton>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'self-start',
              width: '100%',
              my: `${pxToVw('2rem')}`,
            }}
          >
            <Typography
              sx={{
                color: 'var(--gray-50)',
              }}
              variant="subtitle2"
            >
              {t('page-login.don-have-account')}
            </Typography>
            <Link
              onClick={() => {
                navigate(ROUTES.REGISTER.path);
              }}
              underline="hover"
              target="_self"
              rel="noopener"
              sx={{
                fontSize: `${pxToVw('0.9375rem')}`,
                color: 'var(--purple-400)',
                fontWeight: '600',
                lineHeight: `${pxToVw('1.375rem')}`,
                letterSpacing: '-0.1px',
                marginLeft: `${pxToVw('1rem')}`,
                textUnderlineOffset: `${pxToVw('4px')}`,
                cursor: 'pointer',
              }}
            >
              {t('button.sign-up')}
            </Link>
          </Box>
        </Box>
      </Box>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => {
            console.error('Login Failed');
          }}
          context='signin'
          auto_select={false}
          width={424}
          useOneTap={true}
          size='large'
          text='continue_with'
          logo_alignment='center'
          render={(renderProps) => (
            <LoadingButton
              fullWidth
              color="secondary"
              sx={{
                height: pxToVw(46),
                width: '200px',
                paddingTop: `${pxToVw('0.75rem')}`,
                paddingBottom: `${pxToVw('0.75rem')}`,
                marginTop: `${pxToVw('2rem')}`,
                gap: `${pxToVw('1rem')}`,
              }}
              loading={loading}
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcon />
              {t('page-login.google-login')}
            </LoadingButton>
          )}
        />
    </Box>
  );
};

export default React.memo(LoginFormView);
