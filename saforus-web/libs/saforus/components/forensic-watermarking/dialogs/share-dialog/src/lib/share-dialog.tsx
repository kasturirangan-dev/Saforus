import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  styled,
} from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type WatermarkShareDialogProps = {
  onClose?: () => void;
  onSend?: (val: string[]) => void;
  fileName: string;
};

const WatermarkShareDialog = ({
  onClose,
  onSend,
  fileName,
}: WatermarkShareDialogProps) => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleSend = () => {
    if (!isValidEmail) {
      setTrigger(true);
      return;
    }

    onSend?.(emails);
    onClose?.();
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '560px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '16px',
          padding: '8px 12px',
        },
      }}
      title={t('page-watermarking.dialog.share-title') as string}
      titleCss={{
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'left',
        letterSpacing: '-0.02em',
        color: 'var(--gray-700)',
      }}
      subtitle={
        <Trans
          i18nKey="page-watermarking.dialog.share-subtitle"
          values={{ fileName }}
          components={[<Box sx={{ fontWeight: 500, display: 'inline' }} />]}
        />
      }
      subtitleCss={{
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        textAlign: 'left',
        letterSpacing: '-0.1px',
        color: 'var(--gray-50)',
        wordBreak: 'break-all',
      }}
      dialogContent={
        <Box>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={emails}
              inputValue={emailInput}
              onInputChange={(event, newInputValue) => {
                setEmailInput(newInputValue);
              }}
              disableClearable
              onChange={(event, newValue) => {
                if (newValue.length <= 20) {
                  setEmails(newValue);
                  if (newValue.some((email) => !isValidEmail(email))) {
                    setErrorMessage(true);
                  } else {
                    setErrorMessage(false);
                  }
                }
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    sx={{
                      color: isValidEmail(option)
                        ? 'var(--gray-700)'
                        : 'var(--red-450)',
                      backgroundColor: isValidEmail(option)
                        ? 'default'
                        : 'var(--red-100)',
                      borderRadius: '5px',
                      '& .MuiChip-deleteIcon': {
                        color: 'var(--gray-700)',
                      },
                    }}
                    label={option}
                    {...getTagProps({ index })}
                    deleteIcon={
                      <CloseIcon sx={{ height: '16px', width: '16px' }} />
                    }
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={
                    !emails.length
                      ? (t(
                          'page-watermarking.dialog.share-email-placeholder'
                        ) as string)
                      : ('' as string)
                  }
                />
              )}
              sx={{
                '& .MuiChip-deleteIcon': {
                  color: 'transperent',
                },
              }}
            />
            {trigger ||
              (errorMessage && (
                <FormHelperText
                  sx={{
                    marginTop: '0.5rem',
                    marginLeft: '0',
                    display: 'flex',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: errorMessage ? 'var(--red-500)' : 'var(--gray-700)',
                  }}
                >
                  <Typography>
                    {t('page-watermarking.dialog.share-email-description')}
                  </Typography>
                </FormHelperText>
              ))}
          </FormControl>
        </Box>
      }
      onClose={onClose}
      footer={
        <>
          <LoadingButton
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.cancel')}
          </LoadingButton>
          <LoadingButton
            onClick={handleSend}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
            disabled={!emails.length || !!emailInput || errorMessage}
          >
            {t('page-watermarking.dialog.share-send')}
          </LoadingButton>
        </>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    />
  );
};

export default WatermarkShareDialog;
