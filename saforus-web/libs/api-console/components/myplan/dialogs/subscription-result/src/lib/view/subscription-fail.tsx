import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import InfoIcon from '../assets/info-red.svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export interface SubscriptionFailProps {
  type: 'subscribe' | 'upgrade';
  code?: string;
  onClose: () => void;
}

export function SubscriptionFailDialog({
  type,
  code,
  onClose,
}: SubscriptionFailProps) {
  const { t } = useTranslation();

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const onContact = () => {
    window.open(linkSupport, '_blank');
    onClose();
  };
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
        {t(`apiServicePlan.subscriptionFailed.${type}`)}
      </DialogTitle>
      <Typography
        variant="subtitle2"
        color="var(--gray-50)"
        sx={{ pb: '20px' }}
      >
        {t('apiServicePlan.subscriptionFailed.description')}
      </Typography>
      <Typography variant="subtitle2" color="var(--gray-50)">
        {t('apiServicePlan.subscriptionFailed.errorCode', { code })}
      </Typography>
      <DialogActions sx={{ padding: '1.5em' }}>
        <Button
          onClick={onClose}
          fullWidth
          color="secondary"
          sx={{ mr: 2, height: 46 }}
        >
          {t('apiServicePlan.subscriptionFailed.cancel')}
        </Button>
        <Button
          color="primary"
          onClick={onContact}
          fullWidth
          sx={{ height: 46 }}
        >
          {t('apiServicePlan.subscriptionFailed.contact')}
        </Button>
      </DialogActions>
    </>
  );
}

export default SubscriptionFailDialog;
