import React, { useEffect } from 'react';
import useAddAdminUsersData from './data';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import UserIcon from './assets/user-circle.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { Box, Checkbox, Typography, styled } from '@mui/material';
import { useSnapshot } from 'valtio';
import CommonStore from '@web-workspace/saforus-bo/common/data';
import { Controller } from 'react-hook-form';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import Input from '@web-workspace/shared/components/widgets/input';
import { AdminUserManagementStore } from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

const FormContainer = styled('form')``;

type DeleteAdminUsersDialogProps = {
  onClose: () => void;
};

const AddAdminUserDialog: React.FC<DeleteAdminUsersDialogProps> = ({
  onClose,
}) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useAddAdminUsersData({
    onClose,
  });

  const { markAnyUsers, users, types } = useSnapshot(AdminUserManagementStore);
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '1.5rem',
        },
      }}
      icon={
        <img src={UserIcon} alt="User" width="32" height="32" loading="lazy" />
      }
      title={`${t('boSettings.admin-user-management.dialogs.add-admin-user')}`}
      subtitle={t(
        'boSettings.admin-user-management.dialogs.add-admin-user-des'
      )}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.cancel')}
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {t('button.add')}
          </LoadingButton>
        </>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t(
                      'boSettings.admin-user-management.dialogs.email'
                    )}*`}
                    placeholder="Select email"
                    options={markAnyUsers}
                    value={field.value}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    inputStyle={{
                      width: '100%',
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue?.value || '');
                      const userName = users.find(
                        (el) => el.label === newValue?.value
                      );
                      setValue('name', userName?.value?.toString() || '');
                    }}
                    errorMessage={
                      errors.email?.message && `${t(errors.email?.message)}`
                    }
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled
                    fullWidth
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    label={`${t(
                      'boSettings.admin-user-management.dialogs.name'
                    )}*`}
                    {...field}
                    errorMessage={
                      errors.name?.message && `${t(errors.name?.message)}`
                    }
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t(
                      'boSettings.admin-user-management.dialogs.type'
                    )}*`}
                    options={types.filter((el) => el.value !== '')}
                    placeholder="Select type"
                    value={field.value}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    inputStyle={{
                      width: '100%',
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue?.value || '');
                    }}
                    errorMessage={
                      errors.type?.message && `${t(errors.type?.message)}`
                    }
                  />
                )}
              />
            </Box>
          </FormContainer>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default AddAdminUserDialog;
