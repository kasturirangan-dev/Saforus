import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import Input, {
  CustomInputProps,
} from '@web-workspace/shared/components/widgets/input';
import { ActionsButtons } from './actions-buttons';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@mui/material/FormHelperText';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorder',
})<{ showBorder?: boolean }>(({ theme, showBorder }) => ({
  border: showBorder ? `${pxToVw('1px')} solid var(--neutral-700)` : 'none',
  display: 'flex',
  minHeight: pxToVw(56),
  alignItems: 'stretch',
}));

const Label = styled(Box)(({ theme }) => ({
  background: 'var(--neutral-600)',
  minWidth: pxToVw(200),
  display: 'flex',
  alignItems: 'center',
  padding: pxToVw(['0.5rem', '1rem']),
  fontSize: pxToVw('14px'),
  fontWeight: 500,
  color: 'var(--gray-700)',
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: pxToVw(['0.5rem', '1rem']),
  flexWrap: 'wrap',
}));

interface InputToggleProps extends CustomInputProps {
  label?: string;
  canCopy?: boolean;
  canEdit?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  formControl?: JSX.Element;
  containerCss?: React.CSSProperties;
  controlCss?: React.CSSProperties;
  valueCss?: React.CSSProperties;
  showBorder?: boolean;
  submitValue?: () => Promise<boolean> | boolean;
  value?: string;
  iconSize?: number;
  disableActions?: boolean;
  editModeFromParent?: boolean;
  limitedChars?: number;
  canSubmit?: boolean;
}

const InputToggle = React.forwardRef<HTMLInputElement, InputToggleProps>(
  (props, ref: any) => {
    const {
      label,
      canEdit = true,
      canCopy = true,
      onEdit,
      onCancel,
      formControl,
      containerCss,
      controlCss,
      showBorder = true,
      submitValue,
      value,
      iconSize = pxToVw(20, true) as number,
      errorMessage,
      disableActions = false,
      editModeFromParent = false,
      valueCss,
      labelStyle,
      endAdornment: EndAdornment,
      limitedChars,
      canSubmit = true,
      ...inputProps
    } = props;
    const [editMode, setEditMode] = useState(editModeFromParent);
    const [isLoading, setIsLoading] = useState(false);
    const [limitTextValue, setLimitTextValue] = useState(value);
    const { t } = useTranslation();

    const handleCopy = () => {
      if (value) {
        navigator.clipboard.writeText(value);
        showToast.success(t('common.copy-success'), {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 0,
          bodyStyle: { width: '100%' },
          style: {
            width: pxToVw('300px'),
            marginLeft: '0px',
            marginRight: '0px',
          },
        });
      }
    };

    const handleBlur = () => {
      setEditMode(false);
    };

    const handleSubmit = async () => {
      let isValid = false;
      if (submitValue) {
        setIsLoading(true);
        const result = submitValue();

        if (result instanceof Promise) {
          isValid = await result;
        } else {
          isValid = true;
        }

        setIsLoading(false);
      }
      return isValid;
    };

    const hasError = Boolean(errorMessage);

    useEffect(() => {
      setEditMode(editModeFromParent);
    }, [editModeFromParent]);

    useEffect(() => {
      if (value && limitedChars) {
        if (value.length > limitedChars) {
          setLimitTextValue(value.slice(0, limitedChars) + '...');
        } else {
          setLimitTextValue(value);
        }
      } else {
        setLimitTextValue(value);
      }
    }, [limitTextValue, value]);

    return (
      <Container sx={containerCss} showBorder={showBorder}>
        {label && <Label sx={labelStyle}>{label}</Label>}
        <InputWrapper sx={controlCss}>
          {formControl ? (
            formControl
          ) : editMode ? (
            <Input
              ref={ref}
              onBlur={handleBlur}
              errorMessage={errorMessage}
              showErrorMsg={false}
              {...inputProps}
              style={{ flexGrow: 1, marginRight: pxToVw('1rem') }}
            />
          ) : (
            <Typography
              sx={valueCss}
              style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            >
              {limitTextValue}
            </Typography>
          )}
          {!disableActions && (
            <ActionsButtons
              editMode={editMode}
              setEditMode={setEditMode}
              handleCopy={handleCopy}
              canCopy={canCopy}
              canEdit={canEdit}
              isLoading={isLoading}
              onSubmit={
                !disableActions
                  ? async () => {
                      const isValid = await handleSubmit();
                      if (isValid) {
                        setEditMode(false);
                      }
                    }
                  : undefined
              }
              onEdit={onEdit}
              onCancel={onCancel}
              iconSize={iconSize}
              canSubmit={canSubmit}
            />
          )}
          {hasError && editMode && (
            <>
              <Box sx={{ flexBasis: '100%', height: 0 }} />
              <FormHelperText sx={{ color: 'var(--red-450)' }}>
                {errorMessage}
              </FormHelperText>
            </>
          )}
          {EndAdornment && EndAdornment}
        </InputWrapper>
      </Container>
    );
  }
);

export default React.memo(InputToggle);
