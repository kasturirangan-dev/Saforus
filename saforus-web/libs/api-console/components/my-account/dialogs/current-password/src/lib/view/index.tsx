import React, { useEffect } from 'react';
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
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { Box, IconButton, styled, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangePassword } from '../data';
import { useSnapshot } from 'valtio';
import MyAccountStore, {
  LIMIT_ENTER_CURRENT_PASSWORD,
} from '@web-workspace/api-console/components/my-account/data';

type ChangePasswordDialogViewProps = {
  onClose: () => void;
  register: UseFormRegister<Partial<ChangePassword>>;
  handleSubmit: UseFormHandleSubmit<Partial<ChangePassword>>;
  errors: FieldErrors<Partial<ChangePassword>>;
  onSubmit: (data: Partial<ChangePassword>) => void;
  watch: UseFormWatch<Partial<ChangePassword>>;
  loading: boolean;
  onResetPassword: () => void;
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
  onResetPassword,
}) => {
  const { t } = useTranslation();
  const { incorrectPasswordCount } = useSnapshot(MyAccountStore);

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);

  const handleMouseDownCurrentPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickResetPass = () => {
    onResetPassword();
    onClose();
  };

  useEffect(() => {
    if (errors.currentPassword?.message) {
      if (
        errors.currentPassword?.message ===
        'error-message.enter-current-password-count'
      ) {
        setErrorMessage(
          `${t('error-message.enter-current-password-count', {
            time: incorrectPasswordCount,
            total: LIMIT_ENTER_CURRENT_PASSWORD,
          })}`
        );
      } else {
        setErrorMessage(`${t(`${errors.currentPassword?.message}`)}`);
      }
    } else {
      setErrorMessage('');
    }
  }, [errors.currentPassword?.message, incorrectPasswordCount]);

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
            disabled={watch('currentPassword') === ''}
          >
            {t('myaccount.change-password.continue')}
          </LoadingButton>
        </>
      }
      title={`${t('myaccount.change-password.title')}`}
      titleCss={{ fontWeight: 500 }}
      subtitle={t('myaccount.change-password.dialogs.verify-description')}
      subtitleCss={{ fontSize: '16px' }}
      dialogContent={
        <Box sx={{ width: '100%' }}>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
              style={{ width: '100%' }}
              label={`${t('myaccount.change-password.current-password')}`}
              placeholder={`${t(
                'myaccount.change-password.current-password-placeholder'
              )}`}
              {...register('currentPassword')}
              type={showCurrentPassword ? 'text' : 'password'}
              errorMessage={errorMessage}
              icon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownCurrentPassword}
                  edge="end"
                >
                  {showCurrentPassword ? (
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
                width: '100%',
              }}
            >
              <Link
                onClick={handleClickResetPass}
                underline="hover"
                target="_self"
                rel="noopener"
                sx={{
                  fontSize: '15px',
                  color: 'var(--purple-400)',
                  fontWeight: '600',
                  lineHeight: '22px',
                  letterSpacing: '-0.1px',
                  textUnderlineOffset: '4px',
                  cursor: 'pointer',
                }}
              >
                {t('page-login.forgot-pass')}
              </Link>
            </Box>
          </FormContainer>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default ChangePasswordDialogView;
