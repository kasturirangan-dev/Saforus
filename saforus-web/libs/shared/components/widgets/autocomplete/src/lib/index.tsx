import React from 'react';
import TextField from '@mui/material/TextField';
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  Box,
  createFilterOptions,
  styled,
  SxProps,
  Typography,
  FormHelperText,
} from '@mui/material';
import ChevronDownIcon from './assets/chevronDown.svg';
import { ForwardedRef, forwardRef } from 'react';

const Label = styled('label')({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
});

export interface TOption {
  label: string;
  value: string | number;
}

export interface MuiAutocompletePropsWithoutTitle
  extends Omit<
    MuiAutocompleteProps<TOption, false, false, false>,
    'renderInput' | 'title'
  > { _dummy?: never; }

export interface AutocompleteProps extends MuiAutocompletePropsWithoutTitle {
  title?: React.ReactNode;
  inputStyle?: SxProps;
  labelStyle?: SxProps;
  value?: TOption | any;
  errorMessage?: string;
  showErrorMsg?: boolean;
  onBlur?: any;
}

export const Autocomplete = forwardRef(
  (props: AutocompleteProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      title,
      options,
      value,
      inputStyle,
      labelStyle = {},
      errorMessage,
      onBlur,
      showErrorMsg = true,
      placeholder,
      selectOnFocus = false,
      ...otherProps
    } = props;

    const hasError = Boolean(errorMessage);

    const filterOptions = createFilterOptions<TOption>({
      matchFrom: 'start',
      stringify: (option: TOption) => option.label,
    });

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          ...inputStyle,
          '& .MuiIconButton-root': {
            padding: 0,
          },
        }}
      >
        {title && <Label sx={labelStyle}>{title}</Label>}
        <MuiAutocomplete<TOption, false, false, false>
          options={options}
          value={options.find((option) => option.value === value)}
          getOptionLabel={(option) => option.label}
          filterOptions={filterOptions}
          disableClearable={true}// Added to remove the clear button
          openText=''
          closeText=''
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
              {...props}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.label}
              </Typography>
            </Box>
          )}
          popupIcon={
            <img
              src={ChevronDownIcon}
              alt="ChevronDownIcon"
              title=""
              loading="lazy"
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          }
          sx={{
            '& .MuiOutlinedInput-notchedOutline ': {
              borderColor: 'var(--neutral-750)',
              boxShadow: 'var(--shadow-xsm)',
            },
            '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
              right: 14,
            },
            '.MuiAutocomplete-popupIndicator:hover': {
              backgroundColor: 'transparent',
            },
          }} //Added to center the icon
          selectOnFocus={selectOnFocus} // selectOnFocus=false prevent the input from being highlighted when focused
          {...otherProps}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                placeholder={placeholder}
                size="small"
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  letterSpacing: '-0.1px',
                  backgroundColor: 'var(--base-white)',
                  ...inputStyle,
                  px: 0,
                }}
                ref={ref}
              />
            );
          }}
        />
        {showErrorMsg && (
          <FormHelperText
            sx={{
              width: '100%',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: 'var(--red-600)',
            }}
          >
            {hasError ? errorMessage : ' '}
          </FormHelperText>
        )}
      </Box>
    );
  }
);

export default Autocomplete;
