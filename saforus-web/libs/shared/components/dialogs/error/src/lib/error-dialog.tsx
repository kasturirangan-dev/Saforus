import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import warning from './assets/warning.svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ErrorDialogProps = {
  onClose: () => void;
  title: string;
  closeTitle: string;
};

const ErrorDialog = ({ onClose, title, closeTitle }: ErrorDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
      onClose={onClose}
      footer={
        <LoadingButton
          fullWidth
          color="secondary"
          onClick={onClose}
          sx={{ marginRight: 'auto', padding: '12px 18px' }}
        >
          {closeTitle}
        </LoadingButton>
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
            }}
          >
            {title}
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

export default ErrorDialog;
