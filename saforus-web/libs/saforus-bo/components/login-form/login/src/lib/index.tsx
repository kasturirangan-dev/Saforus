import { styled, Box, Link, IconButton } from '@mui/material';
import {
  Login,
  ILoginInfoRequest,
} from '@web-workspace/saforus-bo/components/login-form/data';
import Input from '@web-workspace/shared/components/widgets/input';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: pxToVw('283px'),
}));

/* eslint-disable-next-line */
export interface LoginFormProps {
  register: UseFormRegister<Login>;
  handleSubmit: UseFormHandleSubmit<Login>;
  errors: FieldErrors<Login>;
  onSubmit(data: ILoginInfoRequest): void;
}

export function LoginForm(props: LoginFormProps) {
  // hooks declaration area
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  /////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  /////////////////////////////////////////////////////////////////

  return (
    <Container>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Input
          style={{ width: '100%', marginTop: pxToVw('1.5rem') }}
          // replace with these comment when korean for text available
          // label={`${t('common.email-address')}`}
          // placeholder={`${t('common.placeholder-email')}`}
          label={`Email Address`}
          placeholder={`Enter your email`}
          className={style.input}
          {...props.register('email')}
          errorMessage={
            props.errors.email?.message &&
            (t(`${props.errors.email?.message}`) as string)
          }
        />

        <Input
          style={{ marginTop: pxToVw('8px'), width: '100%' }}
          // replace with these comment when korean for text available
          // label={`${t('common.password')}`}
          // placeholder={`${t('common.placeholder-pass')}`}
          label={`Password`}
          placeholder={`Enter your password`}
          className={style.input}
          {...props.register('password')}
          type={showPassword ? 'text' : 'password'}
          errorMessage={
            props.errors.password?.message &&
            (t(`${props.errors.password?.message}`) as string)
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
            marginTop: pxToVw('0.2rem'),
          }}
        >
          <Link
            onClick={() => {
              navigate('/resetpassword');
            }}
            underline="hover"
            target="_self"
            rel="noopener"
            sx={{
              fontSize: pxToVw('15px'),
              color: 'var(--purple-500)',
              fontWeight: '600',
              lineHeight: pxToVw('22px'),
              letterSpacing: '-0.1px',
              textUnderlineOffset: pxToVw('4px'),
              cursor: 'pointer',
            }}
          >
            Forgot password?
          </Link>
        </Box>
        <LoadingButton
          fullWidth
          sx={{
            height: pxToVw(46),
            width: '100%',
            paddingTop: pxToVw('0.75rem'),
            paddingBottom: pxToVw('0.75rem'),
            marginTop: pxToVw('2rem'),
          }}
          loading={false}
          type="submit"
        >
          Log in
        </LoadingButton>
      </form>
    </Container>
  );
}

export default LoginForm;
