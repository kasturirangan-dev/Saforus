import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { SxProps, Box } from '@mui/material';
import ChevronDownIcon from './asset/ChevronDown.svg';
import CalendarIcon from './asset/calendar.svg';
import { forwardRef } from 'react';
import i18next from 'i18next';
import { DateFormatWithSlash } from '@web-workspace/shared/helpers/dates';
import { DateValidationError } from '@mui/x-date-pickers';

function OpenPickerIcon() {
  return (
    <Box sx={{ padding: '0.3vw 0.3vw 0.1vw 0.3vw' }}>
      <img
        src={ChevronDownIcon}
        alt="ChevronDownIcon"
        title="ChevronDownIcon"
        style={{
          width: 12,
          height: 12,
          marginRight: '0',
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
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ sx, inputStyle, error, helperText, ...props }, ref) => {
    const format =
      i18next.language === 'en'
        ? DateFormatWithSlash.EN_UK_SHORT
        : DateFormatWithSlash.KOREAN_SHORT;

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
                color: '#272D37',
                paddingLeft: '14px',
                paddingRight: '14px',
                borderRadius: '4px',
                ...sx,
                '& .MuiIconButton-root': {
                  padding: 0,
                  margin: 0,
                },
              },
              startAdornment: (
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
              ),
            },
            inputRef: ref,
            helperText: error ? helperText : '',
          },
        }}
        slots={{
          openPickerIcon: OpenPickerIcon,
        }}
      />
    );
  }
);

export default DatePicker;
