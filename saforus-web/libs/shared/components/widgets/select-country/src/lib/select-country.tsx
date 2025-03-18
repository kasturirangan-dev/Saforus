import TextField from '@mui/material/TextField';
import {
  Box,
  createFilterOptions,
  styled,
  SxProps,
  Typography,
} from '@mui/material';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import ChevronDownIcon from './assets/chevronDown.svg';
import React, { ForwardedRef, forwardRef } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const Label = styled('label')({
  paddingTop: pxToVw('0.5rem'),
  paddingBottom: pxToVw('0.5rem'),
  textAlign: 'left',
  fontWeight: '500',
  fontSize: pxToVw('14px'),
  lineHeight: pxToVw('20px'),
  display: 'block',
});

export interface Country {
  countryCode: string | number;
  shortName: string;
  country: string;
  label: string;
  value?: string;
}

export interface CustomAutocompleteProps
  extends Omit<AutocompleteProps<Country, false, false, false>, 'renderInput'> {
  label: string;
  inputStyle?: SxProps;
  labelStyle?: SxProps;
  value?: Country | any;
  showErrorMsg?: boolean;
  errorMessage?: string;
  placeholder: string;
}

const CustomAutocomplete = styled<any>(MuiAutocomplete)(({ theme }) => {
  return {
    '& .MuiInputBase-root': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& input::placeholder': {
      fontSize: pxToVw('1rem'),
      color: 'var(--gray-25)',
    },
    borderRadius: pxToVw(5),
    backgroundColor:
      theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
    border:
      theme.palette.mode === 'light'
        ? `${pxToVw('1px')} solid var(--neutral-750)`
        : `${pxToVw('1px')} solid var(--gray-300)`,
    color:
      theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
    boxShadow: `var(--shadow-xsm)`,
    fontSize: pxToVw(15),
    textAlign: 'left',
    transition: theme.transitions.create(['border-color']),
    '&.Mui-disabled': {
      borderColor: 'var(--neutral-700)',
      backgroundColor: 'var(--neutral-200)',
    },
    '&.Mui-focused': {
      borderColor: 'var(--purple-600)',
    },
    height: pxToVw(40),
  };
});

export const SelectCountry = forwardRef(
  (props: CustomAutocompleteProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      options,
      value,
      inputStyle,
      showErrorMsg = true,
      errorMessage,
      placeholder: string,
      labelStyle = {},
      ...otherProps
    } = props;

    const hasError = Boolean(errorMessage);
    const errorStyle = hasError
      ? {
        border: `${pxToVw('1px')} solid var(--red-500)`, borderRadius: pxToVw('5px') }
      : null;

    const filterOptions = createFilterOptions<any>({
      matchFrom: 'any',
      stringify: (option: any) => option.label,
    });
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          ...inputStyle,
        }}
      >
        <Label sx={labelStyle}>{label}</Label>
        <CustomAutocomplete
          sx={{
            ...errorStyle,
            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              padding: pxToVw(['6px', '39px', '6px', '6px'])
            },
          }}
          options={options}
          getOptionLabel={(option: Country) => option.label}
          filterOptions={filterOptions}
          renderOption={(props: any, option: Country) => (
            <Box
              component="li"
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                '& > img': { mr: pxToVw(2), flexShrink: 0, minWidth: pxToVw(30)},
              }}
              {...props}
            >
              <img
                loading="lazy"
                width={pxToVw(20)}
                srcSet={`https://flagcdn.com/w40/${option.shortName.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.shortName.toLowerCase()}.png`}
                alt=""
              />
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.label} ({option.shortName}) + {option.countryCode}
              </Typography>
            </Box>
          )}
          popupIcon={
            <img
              src={ChevronDownIcon}
              alt="ChevronDownIcon"
              title="ChevronDownIcon"
              width={pxToVw(12)}
              height={pxToVw(12)}
              loading="lazy"
            />
          }
          {...otherProps}
          renderInput={(params: any) => {
            return (
              <TextField
                {...params}
                size="small"
                placeholder={props.placeholder}
                variant="outlined"
                sx={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: pxToVw('14px'),
                  fontWeight: 400,
                  lineHeight: pxToVw('20px'),
                  letterSpacing: pxToVw('-0.1px'),
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
              fontSize: pxToVw('14px'),
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: pxToVw('20px'),
              letterSpacing: pxToVw('-0.1px'),
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

export default SelectCountry;
