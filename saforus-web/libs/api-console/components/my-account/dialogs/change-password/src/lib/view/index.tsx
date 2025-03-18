import React, { useMemo } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import KeyholeCircle from '../assets/keyhole-circle.svg';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import { Box, IconButton, styled } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangePassword } from '../data';
import { PasswordRequirements } from '@web-workspace/api-console/common/views';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { PATTERN } from '@web-workspace/api-console/constants/validation';

type ChangePasswordDialogViewProps = {
  onClose: () => void;
  register: UseFormRegister<Partial<ChangePassword>>;
  handleSubmit: UseFormHandleSubmit<Partial<ChangePassword>>;
  errors: FieldErrors<Partial<ChangePassword>>;
  onSubmit: (data: Partial<ChangePassword>) => void;
  watch: UseFormWatch<Partial<ChangePassword>>;
  loading: boolean;
  onResult: (result: boolean) => void;
};

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
`;

const ChangePasswordDialogView: React.FC<ChangePasswordDialogViewProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  onClose,
  watch,
  loading,
  onResult,
}) => {
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

  const password = watch('password') ?? '';
  const confirmPassword = watch('confirmPassword') ?? '';
  const isValidInput = useMemo(() => {
    const passwordValid =
      password.length >= 8 &&
      PATTERN.NUMBER_LEAST.test(password) &&
      PATTERN.UP_LOWER_CASE_LEAST.test(password) &&
      PATTERN.SYMBOL_LEAST.test(password);
    const confirmValid = Boolean(confirmPassword);
    return passwordValid && confirmValid;
  }, [password, confirmPassword]);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '414px',
          boxShadow: 'var(--shadow-2xl)',
        },
      }}
      icon={
        <img
          src={KeyholeCircle}
          alt="warning"
          width={32}
          height={32}
          loading="lazy"
        />
      }
      iconCss={{ justifyContent: 'start' }}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('myaccount.change-password.cancel')}
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            loading={loading}
            type="submit"
            disabled={!isValidInput}
          >
            {t('myaccount.change-password.change')}
          </LoadingButton>
        </>
      }
      title={`${t('myaccount.change-password.title')}`}
      titleCss={{ fontWeight: 500 }}
      subtitle={t('myaccount.change-password.dialogs.change-description')}
      subtitleCss={{ fontSize: '16px' }}
      dialogContent={
        <Box sx={{ width: '100%' }}>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
              style={{ width: '100%' }}
              label={`${t('myaccount.change-password.new-password')}*`}
              placeholder={`${t(
                'myaccount.change-password.new-password-placeholder'
              )}`}
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              errorMessage={
                errors.password?.message
                  ? `${t(`${errors.password?.message}`)}`
                  : ''
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
              style={{ width: '100%' }}
              label={`${t('myaccount.change-password.confirm-password')}*`}
              placeholder={`${t(
                'myaccount.change-password.confirm-password-placeholder'
              )}`}
              {...register('confirmPassword')}
              type={showRePassword ? 'text' : 'password'}
              errorMessage={
                errors.confirmPassword?.message
                  ? `${t(`${errors.confirmPassword?.message}`)}`
                  : ''
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
            />
          </FormContainer>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default ChangePasswordDialogView;
