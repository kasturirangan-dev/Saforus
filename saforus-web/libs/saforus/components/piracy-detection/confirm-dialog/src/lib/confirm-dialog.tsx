import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import warning from './assets/warning.svg';
import {Box, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

type PiracyErrorConfirmDialogProps = {
  onRetry: () => void;
  uploadFailContent: string;
};

const ConfirmDialog = ({
    onRetry,
   uploadFailContent
  }: PiracyErrorConfirmDialogProps) => {
  const {t} = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
      footer={
        <LoadingButton
          fullWidth
          onClick={onRetry}
          sx={{ marginRight: 'auto', padding: '12px 18px' }}
        >
          {t(`create-new-request.confirm.retry-btn`)}
        </LoadingButton>
      }
      dialogContent={
        <Box sx={{ width: 400, margin: 'auto' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '1rem'}}>
            <img
              src={warning}
              alt="Warning"
              title="Warning"
              width="32"
              height="32"
              loading="lazy"
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '1.5rem',
              marginBottom: '0.4rem',
              fontWeight: 500,
              textAlign: 'center',
              color: 'var(--gray-700)'
            }}
          >
            {t(`create-new-request.confirm.file-upload-failed`)}
          </Typography>

          <Typography
            variant="subtitle2"
            color={'var(--gray-50)'}
            sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem',
              fontWeight: 400,
              textAlign: 'center',
              color: 'var(--gray-50)',
              whiteSpace: 'pre-wrap'
            }}
          >
            {t(uploadFailContent)}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
    ></Dialog>
  );
};

export default ConfirmDialog;
