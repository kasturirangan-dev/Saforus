import React, { useEffect, useState } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import KeyholeCircle from './assets/keyhole-circle.svg';
import { useTranslation } from 'react-i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HandleEvenResetPassword from './data';
import Icon from '@web-workspace/shared/components/widgets/icon';

const StyledResetButton = styled(LoadingButton)`
  background: var(--red-600);
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;

  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
    background: var(--red-400);
    color: var(--base-white);
  }
`;

type ResetPasswordDialogViewProps = {
  onClose: () => void;
  fullName: string;
  email: string;
};

const ResetPasswordDialogView: React.FC<ResetPasswordDialogViewProps> = ({
  onClose,
  fullName,
  email,
}) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  const { register, handleSubmit, errors, onSubmit, watch } =
    HandleEvenResetPassword({ onClose, fullName, email });

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

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '450px',
        },
      }}
      icon={
        <img
          src={KeyholeCircle}
          alt="password"
          title="Change password"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('userManagement.search-user.user-detail.dialogs.cancel')}
          </Button>
          <StyledResetButton
            onClick={handleSubmit(onSubmit)}
            disabled={!checkboxValue}
            fullWidth
            color="error"
            sx={{ height: 46 }}
            type="submit"
          >
            {t('userManagement.search-user.user-detail.dialogs.reset-password')}
          </StyledResetButton>
        </>
      }
      dialogContent={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <Typography variant="body2" fontSize={'20px'} fontWeight={500}>
                {t(
                  'userManagement.search-user.user-detail.dialogs.reset-pass.title'
                )}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Input
                  {...register('userName')}
                  style={{ width: '100%' }}
                  label={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.user-name'
                  )}`}
                  placeholder={watch('userName')}
                  readOnly
                  disabled
                />
                <Input
                  {...register('email')}
                  style={{ width: '100%' }}
                  label={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.email-account'
                  )}`}
                  placeholder={watch('email')}
                  readOnly
                  disabled
                />
                <Input
                  {...register('password')}
                  style={{ width: '100%' }}
                  label={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.new-password'
                  )}`}
                  value={watch('password')}
                  placeholder={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.new-password-placeholder'
                  )}`}
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
                  label={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.confirm-password'
                  )}`}
                  value={watch('confirmPassword')}
                  placeholder={`${t(
                    'userManagement.search-user.user-detail.dialogs.reset-pass.confirm-password-placeholder'
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
                <FormControlLabel
                  label={
                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 500,
                        color: 'var(--gray-700)',
                      }}
                    >
                      {t(
                        'userManagement.search-user.user-detail.dialogs.reset-pass.confirm'
                      )}
                    </Typography>
                  }
                  sx={{
                    alignItems: 'flex-start',
                  }}
                  control={
                    <Checkbox
                      checked={checkboxValue}
                      onChange={handleCheckboxChange}
                      icon={<Icon name="square_uncheck" size={20} />}
                      checkedIcon={<Icon name="square_checked" size={20} />}
                    />
                  }
                />
              </Box>
            </Box>
            {/* <PasswordRequirements
              sx={{ mt: '1rem' }}
              password={watch('password')}
              error={Boolean(errors.password?.message)}
            /> */}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'flex-end',
                marginTop: '0.2rem',
              }}
            ></Box>
          </form>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default ResetPasswordDialogView;
