import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { SxProps, Box } from '@mui/material';
import CalendarIcon from './asset/calendar.svg';
import { forwardRef } from 'react';
import i18next from 'i18next';
import { DateFormatWithSlash } from '@web-workspace/shared/helpers/dates';
import { DateValidationError } from '@mui/x-date-pickers';

function OpenPickerIcon() {
  return (
    <Box sx={{ padding: '0.3vw 0.3vw 0.1vw 0.3vw' }}>
      <img
        src={CalendarIcon}
        alt="CalendarIcon"
        title="Calendar"
        style={{
          width: 28,
          height: 28,
          paddingRight: '0.5rem',
        }}
        loading="lazy"
      />
    </Box>
  );
}

export interface DatePickerProps extends MuiDatePickerProps<any> {
  sx?: SxProps;
  name?: string;
  inputStyle?: SxProps;
  error?: DateValidationError | null | any; // Add an error prop to pass DateValidationError directly
  helperText?: string; // Adjust the helperText prop to accept a string
  placeholder?: string;
}

const DateInput = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ sx, inputStyle, error, helperText, placeholder, ...props }, ref) => {
    const format =
      i18next.language === 'en'
        ? DateFormatWithSlash.EN_UK_SHORT
        : DateFormatWithSlash.KOREAN_SHORT;

    const defaultPlaceholder =
      i18next.language === 'en' ? 'DD/MM/YYYY' : 'YYYY/MM/DD';
    return (
      <MuiDatePicker
        {...props}
        format={format}
        slotProps={{
          textField: {
            required: true,
            size: 'small',
            sx: {
              ...inputStyle,
            },
            InputProps: {
              sx: {
                '& .MuiOutlinedInput-input': {
                  color: 'var(--gray-700)',
                  '-webkit-text-fill-color': 'unset',
                },
                '& .MuiOutlinedInput-notchedOutline ': {
                  borderColor: 'var(--neutral-750)',
                  boxShadow: 'var(--shadow-xsm)',
                },
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--neutral-750)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                },
                ...sx,
              },
            },
            inputRef: ref,
            helperText: error ? helperText : '',
            placeholder: placeholder || defaultPlaceholder,
          },
        }}
        slots={{
          openPickerIcon: OpenPickerIcon,
        }}
      />
    );
  }
);

export default DateInput;
