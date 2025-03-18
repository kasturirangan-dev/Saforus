import React, { useState } from 'react';
import useEditProfileData from './data';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import { Box, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import DeacivateAccontDialog from './deactivate-account';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@web-workspace/shared/components/widgets/input';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '9px 15px',
}));

const FormContainer = styled('form')``;

type EditProfileDialogProps = {
  onClose: () => void;
  handleLogout: () => void;
};

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  onClose,
  handleLogout,
}) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
    watch,
    isSaving,
    onDeactivate,
    isDeactivating,
  } = useEditProfileData({
    onClose,
    handleLogout,
  });

  const { t } = useTranslation();
  const [openDeactiveDialog, setOpenDeactiveDialog] = useState(false);

  return (
    <>
      <Dialog
        open={!openDeactiveDialog}
        PaperProps={{
          style: {
            width: '480px',
            boxShadow: 'var(--shadow-2xl)',
            borderRadius: '8px',
          },
        }}
        title={`${t('apiAccount.edit-profile.title')}`}
        titleCss={{
          fontSize: '22px',
          fontWeight: 600,
          lineHeight: '30px',
          letterSpacing: '-0.02em',
          color: 'var(--gray-700)',
          padding: '1.5rem',
        }}
        onClose={onClose}
        rightIcon={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        rightIconCss={{
          marginRight: '1rem',
          marginTop: '1rem',
        }}
        footer={
          <>
            <StyledLoadingButton
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenDeactiveDialog(true);
              }}
              sx={{
                mr: 1,
              }}
              disabled={isSaving}
              loading={isDeactivating}
            >
              {t('apiAccount.button.deactivate')}
            </StyledLoadingButton>

            <StyledLoadingButton
              color="primary"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isDeactivating}
              loading={isSaving}
            >
              {t('apiAccount.button.save-changes')}
            </StyledLoadingButton>
          </>
        }
        dialogCss={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
        dialogContent={
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Account Name */}
              <Controller
                name="accountName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    style={{
                      color: 'var(--gray-700)',
                    }}
                    label={`${t('apiAccount.edit-profile.user-name')}`}
                    defaultValue={field.value}
                    showErrorMsg={true}
                    errorMessage={
                      errors.accountName?.message &&
                      String(t(`${errors.accountName?.message}`))
                    }
                  />
                )}
              />

              {/* Company Name */}
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    style={{
                      color: 'var(--gray-700)',
                    }}
                    label={`${t('apiAccount.edit-profile.company-name')}`}
                    defaultValue={field.value}
                    showErrorMsg={true}
                    errorMessage={
                      errors.companyName?.message &&
                      String(t(`${errors.companyName?.message}`))
                    }
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    style={{
                      color: 'var(--gray-700)',
                    }}
                    label={`${t('apiAccount.edit-profile.phone-number')}`}
                    defaultValue={field.value}
                    showErrorMsg={true}
                    errorMessage={
                      errors.phone?.message &&
                      String(t(`${errors.phone?.message}`))
                    }
                    onInput={(e) => {
                      let value = (e.target as HTMLInputElement).value.replace(
                        /[^0-9+]/g,
                        ''
                      );

                      if (value.startsWith('+')) {
                        value = '+' + value.slice(1, 16); // Keep '+' and limit digits to 15
                      } else {
                        value = value.slice(0, 15);
                      }
                      (e.target as HTMLInputElement).value = value;
                    }}
                  />
                )}
              />
            </Box>
          </FormContainer>
        }
        contentCss={{ paddingBottom: '1.5rem' }}
      />
      <DeacivateAccontDialog
        open={openDeactiveDialog}
        onCancel={() => {
          setOpenDeactiveDialog(false);
          onClose();
        }}
        onComfirm={onDeactivate}
      />
    </>
  );
};

export default EditProfileDialog;
