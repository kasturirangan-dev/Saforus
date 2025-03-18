/* 
Note
(1) 2 condition use here is:
+ form: form is not undefined to avoid case when option for autocomplete exist but no default value supply
so the autocomplete will empty
+ typeOption: typeOption must loaded option for look up which one is selected when default value supply
(2) same as number (1)
(3) this condition is add to make Autocomplete show when formState is Create
*/
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import Input from '@web-workspace/shared/components/widgets/input';
import { useSnapshot } from 'valtio';
import { useEffect, useMemo, useState } from 'react';
import CreateNotificationStore, {
  FormMode,
  NotificationStatus,
  NotificationType,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useCreateNotificationFormData } from '../data/useNotificationFormData';
import { Controller } from 'react-hook-form';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import { PeriodView } from './view/period';
import { ImageUploadView } from './view/imageUpload';
import TextEditor from '@web-workspace/shared/components/widgets/text-editor';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';

export function CreateNotificationForm() {
  const { t } = useTranslation();
  const [periodSettable, setPeriodSettable] = useState(true);
  const [show, setShow] = useState(false);

  const {
    isOptionLoading,
    handleSubmit,
    register,
    control,
    errors,
    setValue,
    onSubmit,
    isValid,
    clearErrors,
    getValues,
    resetField,
    isLoading,
    form,
  } = useCreateNotificationFormData(periodSettable);

  const { pageOption, typeOption, formState, notificationForm } = useSnapshot(
    CreateNotificationStore
  );

  const [updateTime, setUpdateTime] = useState('');

  useEffect(() => {
    setUpdateTime(
      formatDateWithLanguage(
        new Date(notificationForm.updatedAt),
        i18next.language,
        true,
        undefined,
        undefined,
        true
      )
    );
  }, [notificationForm]);

  // include form when formState is Edit to make sure for Autocomplete show right
  useEffect(() => {
    if (formState === FormMode.Create) {
      if (!isOptionLoading && !isLoading) {
        setShow(true);
      }
    }
    if (formState === FormMode.Edit) {
      if (!isOptionLoading && !isLoading && form) {
        setShow(true);
      }
    }
  }, [isOptionLoading, isLoading, form]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {show && (
          <Box
            sx={{
              display: 'flex',
              padding: '1.875rem 1.5rem',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1.875rem',
              borderRadius: '0.5rem',
              background: 'var(--base-white)',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Input
                label={`${t('serviceManagement.create-notification.summary')}*`}
                placeholder={
                  'Enter brief summary of this notice (Up to 150 characters)'
                }
                {...register('summary')}
                errorMessage={errors.summary?.message}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <Typography variant="h6">
                {t('serviceManagement.create-notification.contents')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: '1rem',
                }}
              >
                {(form || formState === FormMode.Create) && //(3)
                  typeOption.length > 0 && ( // (1)
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          title={`${t(
                            'serviceManagement.create-notification.type'
                          )}*`}
                          options={typeOption}
                          defaultValue={typeOption.find((el) =>
                            formState === FormMode.Edit
                              ? el.value === form.type
                              : el.value === NotificationType.Notice
                          )}
                          inputStyle={{
                            flex: 1,
                          }}
                          onChange={(event, newValue) => {
                            field.onChange(newValue?.value);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                          }
                          errorMessage={errors.type?.message}
                        />
                      )}
                    />
                  )}
                <Input
                  style={{ flex: 4 }}
                  labelStyle={{ paddingTop: '0.5rem' }}
                  label={`${t('serviceManagement.create-notification.title')}*`}
                  placeholder={'Enter your title (Up to 150 characters)'}
                  {...register('title')}
                  errorMessage={errors.title?.message}
                />
              </Box>
              <ImageUploadView setValue={setValue} />
            </Box>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextEditor
                  {...field}
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={!!errors.description}
                  helperText={errors?.description?.message || ''}
                  label={`${t(
                    'serviceManagement.create-notification.detail'
                  )}*`}
                  placeholder="Enter your detail (Up to 500 characters)"
                  helperTextCss={{ marginLeft: 0 }}
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="h6">
                {t('serviceManagement.create-notification.display-options')}
              </Typography>
              <Box>
                <Controller
                  name="isDoNotViewButtonShow"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      value="start"
                      control={<Switch color="primary" checked={field.value} />}
                      label={
                        <Typography variant="body2">
                          <span>
                            {t(
                              'serviceManagement.create-notification.button.show'
                            )}
                          </span>{' '}
                          <span style={{ fontWeight: 700 }}>
                            {`'${t(
                              'serviceManagement.create-notification.button.do-not-view-day'
                            )}'`}
                          </span>{' '}
                          <span>
                            {t(
                              'serviceManagement.create-notification.button.button'
                            )}
                          </span>
                        </Typography>
                      }
                      labelPlacement="start"
                      sx={{
                        width: '100%',
                        justifyContent: 'space-between',
                        marginLeft: 0,
                      }}
                    />
                  )}
                />
                <Controller
                  name="isBannerShow"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      value="start"
                      control={<Switch color="primary" checked={field.value} />}
                      label={
                        <Typography variant="body2" fontWeight={500}>
                          {t(
                            'serviceManagement.create-notification.button.banner'
                          )}
                        </Typography>
                      }
                      labelPlacement="start"
                      sx={{
                        width: '100%',
                        justifyContent: 'space-between',
                        marginLeft: 0,
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '16px',
                alignSelf: 'stretch',
                width: '100%',
              }}
            >
              <Typography variant="h6">
                {t('serviceManagement.create-notification.settings')}
              </Typography>
              {(form || formState === FormMode.Create) && //(3)
                pageOption.length > 0 && ( // (2)
                  <Controller
                    name="showOnPage"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        title={`${t(
                          'serviceManagement.create-notification.page-settings'
                        )}*`}
                        options={pageOption}
                        defaultValue={pageOption.find((el) =>
                          formState === FormMode.Edit
                            ? el.value === form.showOnPage
                            : el.value === undefined
                        )}
                        inputStyle={{
                          width: '100%',
                        }}
                        placeholder="Please select the page on which you want to display NotificationForm."
                        onChange={(event, newValue) => {
                          field.onChange(newValue?.value);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        errorMessage={errors.showOnPage?.message}
                      />
                    )}
                  />
                )}
              <PeriodView
                setValue={setValue}
                periodSettable={periodSettable}
                setPeriodSettable={setPeriodSettable}
                control={control}
                errors={errors}
                clearErrors={clearErrors}
                getValues={getValues}
                resetField={resetField}
              />
            </Box>
          </Box>
        )}

        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <Button
              sx={{ flex: 1 }}
              color="secondary"
              type="submit"
              onClick={() => setValue('status', NotificationStatus.Hide)}
            >
              {t('serviceManagement.create-notification.button.save')}
            </Button>
            <Button
              type="submit"
              sx={{ flex: 1 }}
              disabled={!isValid}
              onClick={() => setValue('status', NotificationStatus.Publish)}
            >
              {t('serviceManagement.create-notification.button.publish')}
            </Button>
          </Box>
          {formState === FormMode.Edit && (
            <Typography variant="body2" color={'var(--gray-25)'}>
              {`${t(
                'serviceManagement.create-notification.last-saved'
              )} ${updateTime}`}
            </Typography>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default CreateNotificationForm;
