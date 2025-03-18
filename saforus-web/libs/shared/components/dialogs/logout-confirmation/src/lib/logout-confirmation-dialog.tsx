import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import InfoIcon from './assets/info-icon.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';

type LogoutConfirmationDialogProps = {
  onClose: () => void;
  onLogout: () => void;
};

const LogoutConfirmationDialog: React.FC<LogoutConfirmationDialogProps> = ({
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
          src={InfoIcon}
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
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.close')}
          </Button>
          <LoadingButton
            color="error"
            fullWidth
            loading={false}
            onClick={() => {
              onLogout();
              onClose();
            }}
            sx={{ height: 46 }}
          >
            {t('logout-confirm.button-logout')}
          </LoadingButton>
        </>
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
            {t('logout-confirm.title')}
          </Typography>
          <Typography variant="subtitle2" color={'var(--gray-50)'}>
            {t('logout-confirm.description')}
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

export default React.memo(LogoutConfirmationDialog);
