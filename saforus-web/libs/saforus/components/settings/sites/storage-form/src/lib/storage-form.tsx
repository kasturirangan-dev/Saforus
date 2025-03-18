import React from 'react';
import {
  getFieldRegisterStorage,
  IoType,
  QUERY_KEY,
  SettingSiteStore,
  SiteStorage,
} from '@web-workspace/saforus/components/settings/sites/data';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';
import {
  formFields,
  useCreateStorage,
  useUpdateStorage,
  validationSchema,
} from './data';

import ActionsButtons from './views/actions-buttons';
import { useQueryClient } from 'react-query';
import { i18n } from '@web-workspace/shared/i18n';
interface StorageFormProps {
  storage: SiteStorage;
  isEditing: boolean;
}

const FormContainer = styled('form')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const StorageForm: React.FC<StorageFormProps> = ({ storage, isEditing }) => {
  const { mutate, isLoading } = useUpdateStorage();
  const { mutate: createStorage, isLoading: isCreating } = useCreateStorage();
  const { openDialog } = useSnapshot(DialogStore);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    editingStorageId,
    turnOffStorageForm,
    setEditingStorageId,
    newStorageForm,
    serviceRegions = [],
  } = useSnapshot(SettingSiteStore);

  const isNewStorageForm = newStorageForm?.storageId === storage.storageId;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SiteStorage>({
    defaultValues: storage,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: SiteStorage) => {
    if (isNewStorageForm) {
      createStorage(
        {
          newStorage: data,
        },
        {
          onSuccess: (response) => {
            if (response.isSuccess) {
              turnOffStorageForm();
              queryClient.invalidateQueries(QUERY_KEY.SITES_LIST);
              showToast.success(t('settings-pages.storage.add-new-success'), {
                position: 'top-center',
              });
            }
          },
        }
      );
    } else {
      const updatedStorage = {
        ...storage,
        ...data,
      };
      mutate(
        {
          storageId: editingStorageId || null,
          updatedStorage,
        },
        {
          onSuccess: () => {
            turnOffStorageForm();
            queryClient.invalidateQueries(QUERY_KEY.SITES_LIST);
          },
        }
      );
    }
  };

  const isAnyFormActive = () => {
    return editingStorageId !== null || isNewStorageForm;
  };

  const handleDelete = () => {
    // Handle delete action here
    setEditingStorageId(storage.id);
    openDialog({ name: DialogType.DeleteStorage });
  };

  const handleCancel = () => {
    if (isNewStorageForm) {
      showToast.error(t('settings-pages.storage.cancel-add-new'), {
        delay: 0,
        position: 'top-center',
      });
    }
    turnOffStorageForm();
  };

  const renderCustomFormControl = (fieldName: string, isEditing: boolean) => {
    switch (fieldName) {
      case 'ioType':
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        field.value === IoType.INPUT ||
                        field.value === IoType.BOTH
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange(
                            field.value === IoType.OUTPUT
                              ? IoType.BOTH
                              : IoType.INPUT
                          );
                        } else {
                          field.onChange(
                            field.value === IoType.BOTH
                              ? IoType.OUTPUT
                              : IoType.NONE
                          );
                        }
                      }}
                      disabled={!isEditing}
                    />
                  }
                  label="Input"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        field.value === IoType.OUTPUT ||
                        field.value === IoType.BOTH
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange(
                            field.value === IoType.INPUT
                              ? IoType.BOTH
                              : IoType.OUTPUT
                          );
                        } else {
                          field.onChange(
                            field.value === IoType.BOTH
                              ? IoType.INPUT
                              : IoType.NONE
                          );
                        }
                      }}
                      disabled={!isEditing}
                    />
                  }
                  label="Output"
                />
              </FormGroup>
            )}
          />
        );

      case 'serviceRegionIdx':
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors[field.name]}>
                <Select
                  labelId="service-region-label"
                  {...field}
                  disabled={!isEditing}
                  sx={{ minWidth: 280, height: 40 }}
                >
                  {serviceRegions?.map((region) => (
                    <MenuItem key={region.id} value={region.id}>
                      {i18n.language === 'en' ? region.descEn : region.descKr} (
                      {region.region})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box position="relative" width="100%">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <ActionsButtons
          isEditing={isEditing}
          isAnyFormActive={isAnyFormActive()}
          onCancel={handleCancel}
          onEdit={() => {
            if (!isNewStorageForm) {
              setEditingStorageId(storage.id);
            }
          }}
          onDelete={handleDelete}
        />

        {formFields.map((field) => {
          const customFormControl = renderCustomFormControl(
            field.name,
            isEditing
          );
          return (
            <InputToggle
              key={field.name}
              {...getFieldRegisterStorage(register, field.name)}
              value={storage[field.name]}
              errorMessage={errors[field.name]?.message}
              label={`${field.label}${field.isRequired ? '*' : ''}`}
              controlCss={{ background: 'var(--base-white)' }}
              disableActions={true}
              editModeFromParent={isEditing && field.canEdit}
              {...(customFormControl ? { formControl: customFormControl } : {})}
            />
          );
        })}
      </FormContainer>
      <Backdrop
        open={isLoading || isCreating}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default React.memo(StorageForm);
