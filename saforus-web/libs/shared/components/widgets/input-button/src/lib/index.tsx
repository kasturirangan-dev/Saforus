import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputProps,
  Typography,
  styled,
} from '@mui/material';
import React, { useState, CSSProperties, useEffect } from 'react';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';

/* eslint-disable-next-line */
interface InputButtonProps extends InputProps {
  label?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  errorMessage?: string;
  icon?: React.ReactNode;
  btnTitle?: string;
  disabledButton?: boolean;
  onSubmit?: (parmas: any) => any;
  showErrorMsg?: boolean;
}

const CustomButton = styled(Button)(({ theme }) => ({
  height: '38px',
  borderRadius: '0px 5px 5px 0px',
}));

const CustomLabel = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  letterSpacing: '-0.1px',
}));

const CustomInput = styled(Input)(({ theme }) => ({
  height: '38px',
  position: 'relative',
  borderRadius: '5px 0px 0px 5px',
  boxShadow: `var(--shadow-xsm)`,
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  padding: '9px 16px',
  fontSize: '15px',
  border: '1px solid var(--neutral-750)',
  transition: theme.transitions.create(['border-color']),

  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px white inset', // Fix for Chrome autofill background blue color
  },
  '&:hover': {
    borderColor: 'var(--base-black)',
  },
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>(
  (props, ref) => {
    const {
      style,
      label,
      btnTitle,
      inputStyle,
      labelStyle,
      buttonStyle,
      disabledButton,
      errorMessage,
      icon,
      onSubmit,
      name,
      value,
      disabled,
      showErrorMsg = true,
      ...otherProps
    } = props;

    const [message, setMessage] = useState('');

    useEffect(() => {
      setMessage(value as string);
    }, [value]);

    const hasError = Boolean(errorMessage);
    const errorStyle = hasError
      ? { color: 'var(--red-500)', borderColor: 'var(--red-500)' }
      : null;
    const newInputStyle = { ...inputStyle, ...errorStyle };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      onSubmit && onSubmit(message);
    };

    const handleChange = (event: any) => {
      setMessage(event.target.value);
    };

    return (
      <Box style={style}>
        {label && <CustomLabel style={labelStyle}>{label}</CustomLabel>}
        <FormControl sx={{ width: '100%' }} error={hasError} variant="standard">
          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <CustomInput
              style={newInputStyle}
              fullWidth
              disableUnderline
              id={otherProps.id}
              name={name}
              value={message}
              onChange={handleChange}
              error={hasError}
              {...otherProps}
              endAdornment={
                icon && <InputAdornment position="end">{icon}</InputAdornment>
              }
            />
            <CustomButton
              style={buttonStyle}
              type="button"
              onClick={handleSubmit}
              disabled={disabled || disabledButton}
              variant="contained"
            >
              {btnTitle}
            </CustomButton>
          </Box>
          {/* show FormHelperText when no error */}
          {showErrorMsg && (
            <FormHelperText>{hasError ? errorMessage : ' '}</FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }
);

export default InputButton;
