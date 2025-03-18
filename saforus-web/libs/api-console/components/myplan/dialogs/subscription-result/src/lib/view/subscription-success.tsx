import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import InfoIcon from '../assets/offer-check.svg';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Box, Typography } from '@mui/material';

export interface SubscriptionSuccessProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function SubscriptionSuccessDialog({
  onSuccess,
  onClose,
}: SubscriptionSuccessProps) {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '1.5rem',
          justifyContent: 'center',
          paddingBottom: 0,
        }}
      >
        <img src={InfoIcon} alt="information" height={32} width={32} />
      </Box>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 500, pb: '8px' }}>
        {t(`apiServicePlan.subscriptionSuccess.title`)}
      </DialogTitle>
      <Typography
        fontSize={16}
        color="var(--gray-50)"
        px="24px"
        whiteSpace="pre-line"
      >
        {t('apiServicePlan.subscriptionSuccess.description')}
      </Typography>

      <DialogActions sx={{ padding: '1.5em' }}>
        <Button
          onClick={onClose}
          fullWidth
          color="secondary"
          sx={{ mr: 2, height: 46 }}
        >
          {t('apiServicePlan.subscriptionSuccess.close')}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onSuccess();
            onClose();
          }}
          fullWidth
          sx={{ height: 46 }}
        >
          {t('apiServicePlan.subscriptionSuccess.watermark')}
        </Button>
      </DialogActions>
    </>
  );
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
          textAlign: 'center',
        },
      }}
      icon={<img src={InfoIcon} alt="information" height={32} width={32} />}
      onClose={onClose}
      title={`${t(`apiServicePlan.subscriptionSuccess.title`)}`}
      titleCss={{ fontWeight: 500 }}
      subtitle={`${t('apiServicePlan.subscriptionSuccess.description')}`}
      subtitleCss={{
        fontSize: '16px',
        whiteSpace: 'pre-line',
        paddingBottom: '24px',
      }}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('apiServicePlan.subscriptionSuccess.close')}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onSuccess();
              onClose();
            }}
            fullWidth
            sx={{ height: 46 }}
          >
            {t('apiServicePlan.subscriptionSuccess.watermark')}
          </Button>
        </>
      }
    />
  );
}

export default SubscriptionSuccessDialog;
