/* eslint-disable-next-line */
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import warning from './assets/warning.svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ErrorDialogProps = {
  onClose: () => void;
};

export function ApiConsoleComponentsRegisterFormSrcLibDialogsErrorDialog({
  onClose,
}: ErrorDialogProps) {
  const { t, i18n } = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
      onClose={onClose}
      footer={
        <>
          <Button
            fullWidth
            color="secondary"
            onClick={() => {
              onClose();
              window.open(
                getEnvVar(
                  i18n.language === 'en'
                    ? 'VITE_SUPPORT_URL'
                    : 'VITE_SUPPORT_KO_URL'
                ),
                '_blank'
              );
            }}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('apiRegister.dialogs.register-error.button.contact')}
          </Button>
          <Button
            fullWidth
            onClick={onClose}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('apiRegister.dialogs.register-error.button.try-again')}
          </Button>
        </>
      }
      dialogContent={
        <Box>
          <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
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
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              textAlign: 'center',
              color: 'var(--gray-700)',
              whiteSpace: 'pre-line',
              marginBottom: '.25rem',
            }}
          >
            {t('apiRegister.dialogs.register-error.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              textAlign: 'center',
              color: 'var(--gray-50)',
              whiteSpace: 'pre-line',
            }}
          >
            {t('apiRegister.dialogs.register-error.description')}
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
}

export default ApiConsoleComponentsRegisterFormSrcLibDialogsErrorDialog;
