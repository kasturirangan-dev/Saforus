import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from './assets/delete-warning.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';

type DialogSession24TimeoutViewProps = {
  onClose: () => void;
  onLogout: () => void;
};

const Session24TimeoutDialog: React.FC<DialogSession24TimeoutViewProps> = ({
  onClose,
  onLogout,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '5px',
          border: '1px solid var(--neutral-750)',
        },
      }}
      contentCss={{
        margin: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
      }}
      icon={
        <img
          src={DeleteWarning}
          alt="Warning"
          title="Warning"
          width="30"
          height="30"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      }
      onClose={onClose}
      footer={
        <LoadingButton
          color="primary"
          fullWidth
          loading={false}
          onClick={() => {
            onLogout();
            onClose();
          }}
          sx={{ height: 46 }}
        >
          {t('session-timeout.button-login')}
        </LoadingButton>
      }
      dialogContent={
        <Box sx={{ width: 350, margin: 'auto' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '20px',
              marginBottom: '0.5rem',
              fontWeight: 500,
              lineHeight: '28px',
            }}
          >
            {t('session-timeout.title')}
          </Typography>
          <Typography variant="subtitle2" color={'var(--gray-50)'}>
            {t('session-timeout.description')}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    />
  );
};

export default React.memo(Session24TimeoutDialog);
