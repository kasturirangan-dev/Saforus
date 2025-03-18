import React from 'react';
import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import { Box, SxProps } from '@mui/material';
import ClockIcon from './asset/clock.svg';
import { forwardRef } from 'react';
import { TimeValidationError } from '@mui/x-date-pickers';

function OpenPickerIcon() {
  return (
    <Box>
      <img
        src={ClockIcon}
        alt="CalendarIcon"
        title="CalendarIcon"
        width={18}
        height={18}
        loading="lazy"
      />
    </Box>
  );
}

export interface TimePickerProps extends MuiTimePickerProps<any> {
  sx?: SxProps;
  name?: string;
  error?: TimeValidationError | null | any; // Add an error prop to pass DateValidationError directly
  helperText?: string; // Adjust the helperText prop to accept a string
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ sx, error, helperText, ...props }, ref) => {
    return (
      <MuiTimePicker
        {...props}
        timeSteps={{ hours: 1, minutes: 1 }}
        slotProps={{
          textField: {
            required: true,
            size: 'small',
            sx: {
              width: '100%',
              ...sx,
            },
            InputProps: {
              sx: {
                color: '#272D37',
              },
            },
            inputRef: ref,
            helperText: error ? helperText : '',
          },
          inputAdornment: {
            position: 'start',
            sx: {
              marginRight: 0,
            },
          },
        }}
        slots={{
          openPickerIcon: OpenPickerIcon,
        }}
      />
    );
  }
);

export default TimePicker;
