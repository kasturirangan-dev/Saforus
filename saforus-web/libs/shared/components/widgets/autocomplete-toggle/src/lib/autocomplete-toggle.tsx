import React, { useEffect, useState } from 'react';
import { Box, Typography, styled, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@mui/material/FormHelperText';
import EditIcon from './assets/edit.svg';
import { TOption } from '@web-workspace/saforus/components/dashboard/view-order/data';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorder',
})<{ showBorder?: boolean }>(({ theme, showBorder }) => ({
  border: showBorder ? '1px solid var(--neutral-700)' : 'none',
  display: 'flex',
  minHeight: 56,
  alignItems: 'stretch',
}));

const Label = styled(Box)(({ theme }) => ({
  background: 'var(--neutral-600)',
  minWidth: 200,
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--gray-700)',
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem',
  flexWrap: 'wrap',
}));

const AutocompleteToggle = React.forwardRef<HTMLInputElement, any>(
  (props, ref: any) => {
    const {
      label,
      canEdit = true,
      canCopy = true,
      onEdit,
      formControl,
      containerCss,
      controlCss,
      options,
      showBorder = true,
      submitValue,
      value,
      iconSize = 20,
      errorMessage,
      disableActions = false,
      editModeFromParent = false,
      onChange,
      valueCss,
      labelStyle,
      ...inputProps
    } = props;
    const [editMode, setEditMode] = useState(editModeFromParent);
    const { t } = useTranslation();
    const handleEdit = () => {
      onEdit ? onEdit() : setEditMode((isEdit) => !isEdit);
    };
    const handelOnBlur = () => {
      setEditMode(false);
    };

    const hasError = Boolean(errorMessage);

    useEffect(() => {
      setEditMode(editModeFromParent);
    }, [editModeFromParent]);

    return (
      <Container sx={containerCss} showBorder={showBorder}>
        {label && <Label sx={labelStyle}>{label}</Label>}
        <InputWrapper sx={controlCss}>
          {formControl ? (
            formControl
          ) : editMode ? (
            <Autocomplete
              ref={ref}
              options={options as TOption[]}
              defaultValue={options.find((el) => el.value === value)}
              onBlur={handelOnBlur}
              errorMessage={errorMessage}
              inputStyle={{
                width: '100%',
              }}
              onChange={(event, value) => {
                setEditMode(false);
                onChange && onChange(event, value);
              }}
              showErrorMsg={false}
              style={{ flexGrow: 1, marginRight: '1rem' }}
              {...inputProps}
            />
          ) : (
            <Typography sx={valueCss}>
              {options.find((el) => el.value == value)?.label || 'no data'}
            </Typography>
          )}
          {!disableActions && !editMode && (
            <IconButton onClick={handleEdit}>
              <img
                src={EditIcon}
                alt="Edit"
                title="Edit"
                width={iconSize}
                height={iconSize}
                loading="lazy"
              />
            </IconButton>
          )}
          {hasError && editMode && (
            <>
              <Box sx={{ flexBasis: '100%', height: 0 }} />
              <FormHelperText sx={{ color: 'var(--red-450)' }}>
                {errorMessage}
              </FormHelperText>
            </>
          )}
        </InputWrapper>
      </Container>
    );
  }
);

export default React.memo(AutocompleteToggle);
