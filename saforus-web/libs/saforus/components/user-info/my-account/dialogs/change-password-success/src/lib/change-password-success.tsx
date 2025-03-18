import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import KeyholeCircle from './asset/offer-check.svg';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ChangePasswordSuccessProps {
  onClose: () => void;
  onLogin: () => void;
}

export function ChangePasswordSuccess({
  onClose,
  onLogin,
}: ChangePasswordSuccessProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '414px',
          boxShadow: 'var(--shadow-2xl)',
          textAlign: 'center',
        },
      }}
      iconCss={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
      icon={
        <img
          src={KeyholeCircle}
          alt="success"
          width={32}
          height={32}
          loading="lazy"
        />
      }
      onClose={onClose}
      title={`${t('myaccount.change-password.dialogs.success-title')}`}
      titleCss={{ fontWeight: 500 }}
      subtitle={t('myaccount.change-password.dialogs.success-description')}
      subtitleCss={{ fontSize: '16px' }}
      footer={
        <Box sx={{ width: '100%', mt: '1.5rem' }}>
          <Button
            onClick={() => {
              onLogin();
              onClose();
            }}
            fullWidth
            color="primary"
            sx={{ height: 46 }}
          >
            {t('button.log-in')}
          </Button>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
}

export default ChangePasswordSuccess;
