import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { DateValidationError, TimeValidationError } from '@mui/x-date-pickers';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import TimePicker from '@web-workspace/shared/components/widgets/time-picker';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';
import { NotificationForm } from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useTranslation } from 'react-i18next';
type CustomErrorType =
  | DateValidationError
  | TimeValidationError
  | 'nullDate'
  | 'startDate'
  | 'endDate'
  | 'invalidTime'
  | 'nullTime';

type PeriodViewProps = {
  control: Control<NotificationForm>;
  setValue: UseFormSetValue<NotificationForm>;
  periodSettable: boolean;
  setPeriodSettable: Dispatch<SetStateAction<boolean>>;
  errors: FieldErrors<NotificationForm>;
  clearErrors: UseFormClearErrors<NotificationForm>;
  getValues: UseFormGetValues<NotificationForm>;
  resetField: UseFormResetField<NotificationForm>
};

export const PeriodView = ({
  control,
  setValue,
  periodSettable,
  setPeriodSettable,
  errors,
  clearErrors,
  getValues,
  resetField
}: PeriodViewProps) => {
  const { t } = useTranslation();

  // this is used for set date and time to startNotice and endNotice
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [notificationPeriod, setNotificationPeriod] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });

  const handleStartTimeChange = (time: Date) => {
    if (time instanceof Date && !isNaN(time as any)) {
      setNotificationPeriod((prev) => {
        const startDate = new Date(prev.startDate);
        startDate.setHours(time.getHours(), time.getMinutes());
        setValue('startNotice', startDate);
        setStartError(null);
        return { ...prev, startDate };
      });
    }
    if (time === null) {
      setStartError('nullTime');
    }
  };

  const handleEndTimeChange = (time: Date) => {
    if (time instanceof Date && !isNaN(time as any)) {
      setNotificationPeriod((prev) => {
        const endDate = new Date(prev.endDate);
        endDate.setHours(time.getHours(), time.getMinutes());
        setValue('endNotice', endDate);
        setEndError(null);
        return { ...prev, endDate };
      });
    } else {
      setEndError('nullTime');
    }
  };

  // when Set Notice Period remove value from field
  useEffect(() => {
    if (periodSettable) {
      resetField('startNotice');
      resetField('endNotice');
    } else {
      setValue('startNotice', currentDate);
      setValue('endNotice', currentDate);
      // this is used for even period invalid but remove Set Notice Period
      // then form have to valid to enable public button
      resetField('startNotice');
      resetField('endNotice');
    }
  }, [periodSettable]);

  // use separate state variables for start and end errors
  const [startError, setStartError] = useState<CustomErrorType | null>(null);
  const [endError, setEndError] = useState<CustomErrorType | null>(null);

  // use separate error messages for start and end errors
  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case 'invalidDate': {
        return 'Your start date is not valid';
      }
      case 'invalidTime': {
        return 'Your start time is not valid';
      }
      case 'nullDate': {
        return 'Your start date can not left empty';
      }
      case 'startDate': {
        return 'Your start date can not after end date';
      }
      case 'endDate': {
        return 'Your end date can not before end date';
      }
      case 'nullTime': {
        return 'Your start time can not left empty';
      }
      default: {
        return '';
      }
    }
  }, [startError]);

  const endErrorMessage = useMemo(() => {
    switch (endError) {
      case 'invalidDate': {
        return 'Your end date is not valid';
      }
      case 'invalidTime': {
        return 'Your end time is not valid';
      }
      case 'nullDate': {
        return 'Your end date can not left empty';
      }
      case 'startDate': {
        return 'Your start date can not after end date';
      }
      case 'endDate': {
        return 'Your end date can not before end date';
      }
      case 'nullTime': {
        return 'Your end time can not left empty';
      }
      default: {
        return '';
      }
    }
  }, [endError]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
      }}
    >
      <FormControlLabel
        value="start"
        control={<Switch color="primary" />}
        label={
          <Typography variant="body2" fontWeight={500}>
            {t('serviceManagement.create-notification.button.set-period')}
          </Typography>
        }
        labelPlacement="start"
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          marginLeft: 0,
        }}
        checked={periodSettable}
        onChange={() => setPeriodSettable(!periodSettable)}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <Controller
          name="startNotice"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date as any)) {
                  field.onChange(date);
                  if (getValues('endNotice')) {
                    clearErrors('endNotice');
                  }
                } else {
                  field.onChange(null);
                }
              }}
              value={field.value}
              disabled={!periodSettable}
              inputStyle={{ width: '100%' }}
              error={!!errors.startNotice?.message}
              helperText={errors.startNotice?.message}
            />
          )}
        />

        <TimePicker
          disabled={!periodSettable}
          ampm={false}
          value={notificationPeriod.startDate}
          onChange={handleStartTimeChange}
          error={setStartError}
          helperText={startErrorMessage}
          onError={(newError) => {
            if (newError !== null) {
              setStartError(newError);
            }
            if (newError === 'invalidDate') {
              setStartError('invalidTime');
            }
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <Controller
          name="endNotice"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(date) => {
                if (date instanceof Date && !isNaN(date as any)) {
                  field.onChange(date);
                  if (getValues('startNotice')) {
                    clearErrors('startNotice');
                  }
                } else {
                  field.onChange(null);
                }
              }}
              value={field.value}
              disabled={!periodSettable}
              inputStyle={{ width: '100%' }}
              error={!!errors.endNotice?.message}
              helperText={errors.endNotice?.message}
            />
          )}
        />

        <TimePicker
          disabled={!periodSettable}
          ampm={false}
          value={notificationPeriod.endDate}
          onChange={handleEndTimeChange}
          error={setEndError}
          helperText={endErrorMessage}
          onError={(newError) => {
            if (newError !== null) {
              setEndError(newError);
            }
            if (newError === 'invalidDate') {
              setEndError('invalidTime');
            }
          }}
        />
      </Box>
    </Box>
  );
};
