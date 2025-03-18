import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import InfoIcon from './assets/info-red.svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface PaymentFailProps {
  code: string;
  message: string;
  onClose: () => void;
}

export function PaymentFailDialog({
  code,
  message,
  onClose,
}: PaymentFailProps) {
  const { t } = useTranslation();

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
      title={`${t('apiServicePlan.paymentFailed.title')}`}
      titleCss={{ fontWeight: 500 }}
      subtitle={`${t('apiServicePlan.paymentFailed.description')}`}
      subtitleCss={{ fontSize: '16px' }}
      footer={
        <Button
          onClick={() => {
            onClose();
          }}
          fullWidth
          color="error"
          sx={{ height: 46 }}
        >
          {t('apiServicePlan.paymentFailed.tryAgain')}
        </Button>
      }
      dialogContent={
        <>
          <Typography fontSize={16} color="var(--gray-50)">
            {t('apiServicePlan.paymentFailed.errorCode', { code })}
          </Typography>
          <Typography fontSize={16} color="var(--gray-50)">
            {message}
          </Typography>
        </>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
}

export default PaymentFailDialog;
