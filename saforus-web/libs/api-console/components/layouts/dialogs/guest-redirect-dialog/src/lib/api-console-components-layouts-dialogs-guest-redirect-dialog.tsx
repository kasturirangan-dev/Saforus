import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import Happy from './assets/happy.svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type RedirectProps = {
  onClose: () => void;
};

export function ApiConsoleComponentsLayoutsDialogsGuestRedirectDialog({
  onClose,
}: RedirectProps) {
  const { t } = useTranslation();
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
            onClick={onClose}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('redirection-dialog.button.cancel')}
          </Button>
          <Button
            fullWidth
            onClick={() => (window.location.href = '/login')}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('redirection-dialog.button.continue')}
          </Button>
        </>
      }
      dialogContent={
        <Box>
          <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img
              src={Happy}
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
              marginBottom: '0.5rem',
            }}
          >
            {t('redirection-dialog.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '28px',
              textAlign: 'center',
              color: 'var(--gray-50)',
              whiteSpace: 'pre-line',
            }}
          >
            {t('redirection-dialog.description')}
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

export default ApiConsoleComponentsLayoutsDialogsGuestRedirectDialog;
