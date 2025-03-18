import { Box, Typography, styled } from '@mui/material';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import { useTranslation } from 'react-i18next';
import { useNotificationFilterData } from '../data/useNotificationFilterData';
import { useSnapshot } from 'valtio';
import NotificationListStore, {
  NotificationStatus,
  NotificationType,
} from '@web-workspace/saforus-bo/components/service-management/notification-list/data';
import CommonStore from '@web-workspace/saforus-bo/common/data';
import Button from '@web-workspace/shared/components/widgets/button';
import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';

const Label = styled('label')({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
});


export function NotificationSearchSelects() {
  const { t } = useTranslation();

  const { isOptionLoaded, handleSubmit, control, onSubmit, setValue } =
    useNotificationFilterData();

  const { editorOption, searchParams } = useSnapshot(NotificationListStore);

  const {
    noticeTypeList: typeOption,
    noticeStatusList: statusOption,
    isLoading,
  } = useSnapshot(CommonStore);

  const defaultType = useMemo(
    () =>
      typeOption.find((el) => `${el.value}` === `${searchParams?.type}`) ||
      typeOption[0],
    [typeOption]
  );

  const defaultStatus = useMemo(
    () =>
      statusOption.find((el) => `${el.value}` === `${searchParams?.status}`) ||
      statusOption[0],
    [statusOption]
  );

  const defaultEditor = useMemo(
    () =>
      // editorOption.find((el) => `${el.value}` === `${searchParams?.status}`) ||
      editorOption[0],
    [editorOption]
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isOptionLoaded && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.5rem',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                width: '100%',
              }}
            >
              {typeOption.length > 0 && (
                <Autocomplete
                  title={t('serviceManagement.notification-list.table.type')}
                  options={typeOption}
                  defaultValue={defaultType}
                  labelStyle={{
                    minWidth: '160px',
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(event, newValue) => {
                    newValue
                      ? setValue(
                        'type',
                        `${newValue?.value}` || `${typeOption[0].value}`
                      )
                      : setValue('type', NotificationType.All);
                  }}
                  sx={{
                    minWidth: '160px',
                    width: '100%',
                  }}
                  loading={isLoading}
                />
              )}

              {/* <Controller
              control={control}
              name="updatedBy"
              render={({ field }) => ( */}
              {editorOption.length > 0 && (
                <Autocomplete
                  // {...field}
                  title={t('serviceManagement.notification-list.table.editor')}
                  options={editorOption}
                  defaultValue={defaultEditor}
                  inputStyle={{
                    width: '100%',
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  sx={{
                    minWidth: '350px',
                    width: '100%',
                  }}
                // onChange={(event, newValue) => {
                //   field.onChange(newValue?.value || editorOption[0].value);
                // }}
                />
              )}
              {statusOption.length > 0 && (
                <Autocomplete
                  title={t('serviceManagement.notification-list.table.status')}
                  options={statusOption}
                  defaultValue={defaultStatus}
                  labelStyle={{
                    minWidth: '160px',
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(event, newValue) => {
                    newValue
                      ? setValue(
                        'status',
                        `${newValue?.value}` || `${statusOption[0].value}`
                      )
                      : setValue('status', NotificationStatus.All);
                  }}
                  sx={{
                    minWidth: '160px',
                    width: '100%',
                  }}
                  loading={isLoading}
                />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '1.4rem',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Label sx={{ fontWeight: 500 }}>
                  {t('serviceManagement.notification-list.table.notice-period')}
                </Label>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        onChange={onChange}
                        value={value}
                        sx={{
                          minWidth: '160px',
                          width: '100%',
                        }}
                      />
                    )}
                  />
                  <Typography
                    sx={{
                      px: '0.8rem',
                    }}
                  >
                    ~
                  </Typography>
                  <Controller
                    control={control}
                    name="endTime"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        onChange={onChange}
                        value={value}
                        sx={{
                          minWidth: '160px',
                          width: '100%',
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0.7rem',
                height: '100%',
              }}
            >
              <LoadingButton
                type="submit"
                sx={{
                  // my: '1.3rem',
                  py: '0.56rem',
                  maxWidth: '80px',
                }}
              >
                {t('button.search')}
              </LoadingButton>
            </Box>
          </Box>
        )}
      </form>
    </Box>
  );
}

export default NotificationSearchSelects;
