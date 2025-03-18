import { Box, IconButton, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

type WatermarkLinkExpiredDialogProps = {
  onClose: () => void;
};

const WatermarkLinkExpiredDialog = ({
  onClose,
}: WatermarkLinkExpiredDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '517px',
        },
      }}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      iconCss={{
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      title={t('page-watermarking.dialog.link-expired-title') as string}
      titleCss={{
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'left',
        letterSpacing: '-0.02em',
        color: 'var(--gray-700)',
      }}
      dialogContent={
        <Box>
          <Typography>
            {t('page-watermarking.dialog.link-expired-description1')}
          </Typography>
          <Typography>
            {t('page-watermarking.dialog.link-expired-description2')}
          </Typography>
        </Box>
      }
      contentCss={{
        paddingBottom: '1.5rem',
        color: 'var(--gray-50)',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
      }}
      onClose={onClose}
    />
  );
};

export default WatermarkLinkExpiredDialog;
