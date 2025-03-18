import Dialog from '@web-workspace/shared/components/widgets/dialog';
import styles from './index.module.scss';
import Failure from './assets/failure.gif';
import Success from './assets/success.gif';
import { Box, Typography } from '@mui/material';
import React from 'react';

type DialogLoadingProps = {
  onClose: () => void;
  title?: string;
  description?: string;
  status: 'loading' | 'success' | 'failed';
  msg?: string;
};

const DialogLoading: React.FC<DialogLoadingProps> = ({
  onClose,
  title,
  description,
  status = 'loading',
  msg,
}) => {
  return (
    <Dialog
      PaperProps={{
        style: {
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '1.5rem',
          minWidth: 'auto',
        },
      }}
      contentCss={{
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 36px',
      }}
      disableBackdropClick={true}
      onClose={onClose}
      dialogContent={
        <Box
          sx={{
            width: '300px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              height: 'auto',
              padding: '1.5rem 0 0.5rem 0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {status === 'loading' && <Box className={styles.loader} />}
            {status === 'success' && (
              <img
                src={`${Success}?${new Date().getTime()}`} // reload every time the dialog renders
                alt="success."
                height="64px"
                width="64px"
              />
            )}

            {status === 'failed' && (
              <img
                src={`${Failure}?${new Date().getTime()}`} // reload every time the dialog renders
                alt="failed"
                height="64px"
                width="64px"
              />
            )}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              marginTop: status === 'loading' ? '20px' : 0,
              width: '100%',
              color: 'var(--base-black)',
              textAlign: 'center',
            }}
          >
            {title} <br />
            {description}
            {msg && (
              <>
                <br />
                <br />
                {msg}
              </>
            )}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    ></Dialog>
  );
};

export default DialogLoading;
