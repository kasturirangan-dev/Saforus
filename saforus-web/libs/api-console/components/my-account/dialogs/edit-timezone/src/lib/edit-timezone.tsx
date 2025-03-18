import React from 'react';
import useEditProfileData from './data';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import { TextField, createFilterOptions, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { TimeZones } from '@web-workspace/api-console/components/my-account/data';
import { TOption } from '@web-workspace/api-console/common/model';
import { useMemo } from 'react';
import { formatedTimezone } from '@web-workspace/shared/helpers/dates';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '9px 15px',
}));

const FormContainer = styled('form')``;

type EditProfileDialogProps = {
  onClose: () => void;
};

const EditTimezoneDialog: React.FC<EditProfileDialogProps> = ({ onClose }) => {
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
  } = useEditProfileData({
    onClose,
  });

  const { t } = useTranslation();
  const timeZoneOptions = TimeZones.map((timeZone) => ({
    label: timeZone.label,
    value: timeZone.name,
  }));

  const zoneId = watch('zoneId') || '';

  const currentTimezone = useMemo(() => {
    let timeZoneObject = TimeZones.find((el) => el.name === zoneId);
    if (!timeZoneObject && zoneId) {
      const { timeZone } = formatedTimezone(zoneId);
      timeZoneObject = TimeZones.find((el) => el.value === timeZone);
    }
    return {
      label: timeZoneObject?.label,
      value: timeZoneObject?.name,
    } as TOption;
  }, [zoneId]);

  const filterOptions = createFilterOptions<TOption>({
    matchFrom: 'any',
    ignoreCase: true,
    stringify: (option: TOption) => option.label,
  });

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '360px',
          minWidth: '360px',
          boxShadow: 'var(--shadow-2xl)',
        },
      }}
      title={`${t('apiAccount.edit-timezone.title')}`}
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
        <StyledLoadingButton
          color="primary"
          onClick={handleSubmit(onSubmit)}
          type="submit"
          loading={isSaving}
        >
          {t('button.save')}
        </StyledLoadingButton>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="zoneId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={t('apiAccount.edit-timezone.timezone')}
                options={timeZoneOptions}
                defaultValue={currentTimezone}
                onChange={(event, newValue) => {
                  return field.onChange(newValue?.value);
                }}
                showErrorMsg={false}
                filterOptions={filterOptions}
                ListboxProps={{
                  style: {
                    maxHeight: '240px',
                  },
                }}
                placeholder="Search City"
              />
            )}
          />
        </FormContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default EditTimezoneDialog;
