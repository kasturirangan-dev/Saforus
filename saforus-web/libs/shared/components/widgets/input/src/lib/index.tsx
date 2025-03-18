import React, { InputHTMLAttributes, useMemo } from 'react';
import MuiInput, { InputProps } from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Typography } from '@mui/material';
import { importIcon, InputIcon } from './svg';
import { useTranslation } from 'react-i18next';

export interface CustomInputProps extends InputProps {
  label?: string;
  inputStyle?: InputHTMLAttributes<HTMLInputElement>['style'];
  labelStyle?: InputHTMLAttributes<HTMLInputElement>['style'];
  errorMessage?: string;
  warningMessage?: string | undefined | null;
  showErrorMsg?: boolean;
  helperText?: string | null;
  icon?: InputIcon | React.ReactNode;
  customInputElement?: boolean;
  value?: string;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
}));

const CustomLabel = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  marginBottom: '6px',
  transition: theme.transitions.create(['color']),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

const CustomInput = styled(MuiInput)(({ theme }) => ({
  borderRadius: 5,
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  boxShadow: `var(--shadow-xsm)`,
  fontSize: 15,
  padding: '9px 16px',
  textAlign: 'left',
  transition: theme.transitions.create(['border-color']),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
    backgroundColor: 'var(--neutral-200)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
  height: 40,
}));

const CustomBoxAsInput = styled(Box)(({ theme }) => ({
  borderRadius: 5,
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  boxShadow: `var(--shadow-xsm)`,
  fontSize: 15,
  padding: '9px 16px',
  textAlign: 'left',
  transition: theme.transitions.create(['border-color']),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
    backgroundColor: 'var(--neutral-200)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
  height: 40,
  cursor: 'default',
}));

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      style,
      label,
      inputStyle,
      labelStyle,
      errorMessage,
      warningMessage,
      icon,
      showErrorMsg = true,
      helperText = '',
      customInputElement,
      value,
      ...otherProps
    } = props;

    const hasError = Boolean(errorMessage);
    const errorStyle = hasError ? { border: '1px solid var(--red-500)' } : null;

    const _icon = useMemo(() => importIcon(icon), [icon]);

    const { t } = useTranslation();

    return (
      <Box style={style}>
        {label && <CustomLabel style={labelStyle}>{label}</CustomLabel>}
        <StyledFormControl error={hasError} variant="standard">
          {customInputElement ? (
            <CustomBoxAsInput>
              {value ? (
                value
              ) : (
                <Typography
                  variant="body1"
                  color={'var(--gray-25)'}
                  sx={{
                    cursor: 'default',
                  }}
                >
                  {t('create-new-request.order-number-placeholder')}
                </Typography>
              )}
            </CustomBoxAsInput>
          ) : (
            <CustomInput
              ref={ref}
              sx={errorStyle}
              style={inputStyle}
              {...otherProps}
              disableUnderline
              endAdornment={
                icon && (
                  <InputAdornment position="end" sx={{ position: 'static' }}>
                    {_icon}
                  </InputAdornment>
                )
              }
            />
          )}
          {helperText && (
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
                color: 'var(--gray-50)',
              }}
            >
              {helperText}
            </FormHelperText>
          )}
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
                // Support for warning message
                color: hasError ? 'var(--red-600)' : 'var(--gray-50)',
              }}
            >
              {/* support show warning message and error message */}
              {hasError ? errorMessage : warningMessage || ' '}
            </FormHelperText>
          )}
        </StyledFormControl>
      </Box>
    );
  }
);

export default Input;
