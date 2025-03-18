import { Box, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import DeleteWarning from './assets/delete-warning.svg';

type WatermarkSubmitErrorProps = {
  errorCode: string;
  onClose: () => void;
};

const WatermarkSubmitError = ({
  errorCode,
  onClose,
}: WatermarkSubmitErrorProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
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
      footer={
        <Button fullWidth color="primary" onClick={onClose}>
          {t('button.ok')}
        </Button>
      }
      footerCss={{
        width: '100%',
      }}
      iconCss={{
        display: 'flex',
        justifyContent: 'center',
      }}
      dialogContent={
        <Box
          sx={{
            width: 350,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography
            align="center"
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              letterSpacing: '-0.4px',
            }}
          >
            {t('page-watermarking.submitting-order.error-dialog.title')}
          </Typography>
          <Typography
            align="center"
            variant="subtitle2"
            color={'var(--gray-50)'}
          >
            {t('page-watermarking.submitting-order.error-dialog.description', {
              errorCode,
            })}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
    />
  );
};

export default WatermarkSubmitError;
