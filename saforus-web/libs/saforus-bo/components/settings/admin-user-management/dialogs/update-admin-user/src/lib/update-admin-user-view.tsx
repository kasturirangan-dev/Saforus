import React, { useEffect } from 'react';
import useUpdateAdminUsersData from './data';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import NoteIcon from './assets/note.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { Box, Checkbox, Typography, styled } from '@mui/material';
import { useSnapshot } from 'valtio';
import { Controller } from 'react-hook-form';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import Input from '@web-workspace/shared/components/widgets/input';
import {
  AdminUserManagementStore,
  AdminUserModel,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';
import Icon from '@web-workspace/shared/components/widgets/icon';

const FormContainer = styled('form')``;

type DeleteAdminUsersDialogProps = {
  onClose: () => void;
  adminUser: AdminUserModel;
};

const AddAdminUserDialog: React.FC<DeleteAdminUsersDialogProps> = ({
  onClose,
  adminUser,
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
  } = useUpdateAdminUsersData({
    onClose,
    adminUser,
  });
  const { status, types } = useSnapshot(AdminUserManagementStore);
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
        <img src={NoteIcon} alt="User" width="32" height="32" loading="lazy" />
      }
      title={`${t(
        'boSettings.admin-user-management.dialogs.update-admin-user'
      )}`}
      subtitle={t(
        'boSettings.admin-user-management.dialogs.update-admin-user-des'
      )}
      subtitleCss={{ marginBottom: '1rem' }}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            Update
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
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    style={{ width: '100%' }}
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
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled
                    fullWidth
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    label={`${t(
                      'boSettings.admin-user-management.dialogs.email'
                    )}*`}
                    {...field}
                    errorMessage={
                      errors.email?.message && `${t(errors.email?.message)}`
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
                    defaultValue={
                      types.find((el) => `${el.value}` === adminUser.role) ||
                      null
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

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t(
                      'boSettings.admin-user-management.dialogs.status'
                    )}*`}
                    options={status.filter((el) => el.value !== '')}
                    placeholder="Select status"
                    value={field.value}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    defaultValue={
                      status.find((el) => el.value === adminUser.status) || null
                    }
                    inputStyle={{
                      width: '100%',
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue?.value || '');
                    }}
                    errorMessage={
                      errors.status?.message && `${t(errors.status?.message)}`
                    }
                  />
                )}
              />

              <Controller
                name="resetPassword"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Checkbox
                      onClick={() => {
                        setValue('resetPassword', !field.value);
                      }}
                      icon={<Icon name="square_uncheck" size={20} />}
                      checkedIcon={<Icon name="square_checked" size={20} />}
                      sx={{
                        pl: 0,
                        ml: 0,
                        color: 'var(--neutral-700)',
                        '&.Mui-checked': {
                          color: 'var(--blue-500)',
                        },
                      }}
                      {...field}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color={'var(--gray-700)'}
                      >
                        {t(
                          'boSettings.admin-user-management.dialogs.reset-password'
                        )}
                      </Typography>
                    </Box>
                  </Box>
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
