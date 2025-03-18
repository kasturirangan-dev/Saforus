import {
  Select as MuiSelect,
  BaseSelectProps as MuiSelectProps,
  styled,
  SxProps,
  FormHelperText,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import SelectIcon from './assets/chevronDown';

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

export interface SelectProps extends MuiSelectProps {
  value?: string;
  options?: ReadonlyArray<TOption>;
  inputStyle?: SxProps;
  labelStyle?: SxProps;
  errorMessage?: string;
  showErrorMsg?: boolean;
}

export const Select = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      title,
      value,
      options,
      inputStyle,
      labelStyle,
      errorMessage,
      showErrorMsg = true,
      ...otherProps
    } = props;

    const hasError = Boolean(errorMessage);
    return (
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
        size="small"
      >
        {title && <Label sx={labelStyle}>{title}</Label>}
        <MuiSelect
          value={value}
          IconComponent={(_props) => {
            const rotate = _props.className.toString().includes('iconOpen');
            return (
              <Box
                sx={{
                  position: 'absolute',
                  cursor: 'pointer',
                  pointerEvents: 'none',
                  height: 20,
                  right: 14,
                  transform: rotate ? 'rotate(180deg)' : 'none',
                }}
              >
                <SelectIcon color="currentColor" />
              </Box>
            );
          }}
          sx={{
            backgroundColor: 'var(--base-white)',
            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
              paddingRight: '2.5rem',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--neutral-750)',
              boxShadow: 'var(--shadow-xsm)',
            },
            ...inputStyle,
          }}
          {...otherProps}
        >
          {options?.map((el, index) => {
            return (
              <MenuItem key={index} value={el.value}>
                {el.label}
              </MenuItem>
            );
          })}
        </MuiSelect>
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
      </FormControl>
    );
  }
);

export default Select;
