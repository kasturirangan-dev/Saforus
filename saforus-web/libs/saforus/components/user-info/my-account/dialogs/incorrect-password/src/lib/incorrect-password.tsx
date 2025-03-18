import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Button from '@web-workspace/shared/components/widgets/button';
import WarningIcon from './asset/warning.svg';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export interface IncorrectPasswordProps {
  onClose: () => void;
  onLogout: () => void;
}

export function IncorrectPassword({
  onClose,
  onLogout,
}: IncorrectPasswordProps) {
  const { t } = useTranslation();

  const [counter, setCounter] = useState(5); // 5 seconds
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      onLogout();
      onClose();
    }
  }, [counter]);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '414px',
          boxShadow: 'var(--shadow-2xl)',
          textAlign: 'center',
        },
      }}
      disableBackdropClick={true}
      iconCss={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
      icon={
        <img
          src={WarningIcon}
          alt="warning"
          width={32}
          height={32}
          loading="lazy"
        />
      }
      onClose={onClose}
      title={`${t('myaccount.change-password.dialogs.incorrect-title')}`}
      subtitle={t('myaccount.change-password.dialogs.incorrect-description', {
        count: counter,
      })}
      subtitleCss={{
        fontSize: '16px',
        lineHeight: '24px',
        whiteSpace: 'pre-line',
      }}
      footer={
        <Box sx={{ width: '100%', mt: '1.5rem' }}>
          <Button
            onClick={() => {
              onLogout();
              onClose();
            }}
            fullWidth
            color="error"
            sx={{ height: 46 }}
          >
            {t('gnbmenu.logout')}
          </Button>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
}

export default IncorrectPassword;
