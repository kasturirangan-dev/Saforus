import React, { useEffect, useState } from 'react';
import { Dialog, Typography, Box, Button } from '@mui/material';
import Logo from './assets/logo.svg';
import { useTranslation } from 'react-i18next';

type DialogLogoutOnSubscribeSuccessViewProps = {
  onClose: () => void;
  onLogout: () => void;
  planType: any;
};

const LogoutOnSubscribeSuccessDialog: React.FC<
  DialogLogoutOnSubscribeSuccessViewProps
> = ({ onClose, onLogout, planType }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();

  let timeoutId: any;
  useEffect(() => {
    timeoutId = setTimeout(() => {
      onLogout();
      onClose();
    }, 60000);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '440px',
          minHeight: '230px',
          padding: '24px',
          borderColor: 'var(--neutral-750)',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        },
      }}
    >
      <Box
        component="img"
        sx={{
          height: 32,
        }}
        alt="Saforus_logo"
        src={Logo}
      />

      <Box>
        <Typography
          variant="h6"
          display={'block'}
          sx={{ fontSize: '19px', color: 'var(--gray-700)', fontWeight: 500 }}
          align="center"
        >
          {t('servicePlan.subscription.dialog.description1', {
            planTitle: planType === null ? 'Free' : 'Standard',
          })}
        </Typography>
        <Typography
          variant="h6"
          display={'block'}
          sx={{ fontSize: '19px', color: 'var(--gray-700)', fontWeight: 500 }}
          align="center"
        >
          {t('servicePlan.subscription.dialog.description2')}
        </Typography>
      </Box>

      <Button
        onClick={() => {
          clearTimeout(timeoutId);
          onLogout();
          onClose();
        }}
        sx={{
          bgcolor: 'lightblue',
          minWidth: '392px',
          minHeight: '46px',
          color: 'var(--base-white)',
          fontWeight: 600,
          fontSize: '15px',
          lineHeight: '22px',
          '&.MuiButtonBase-root:hover': {
            background: 'var(--main-brand-color3)',
          },
          background: 'var(--main-brand-color3)',
        }}
      >
        {t('servicePlan.subscription.dialog.re-login-button')}
      </Button>
    </Dialog>
  );
};

export default React.memo(LogoutOnSubscribeSuccessDialog);
