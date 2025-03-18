import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PaymentHistory from './views/payment-list';
import { usePaymentData } from './data/data';

export function PaymentManagement() {
  const { t } = useTranslation();
  const {
    paymentList,
    total,
    paginationModel,
    setPaginationModel,
    loading,
    downLoadInvoice,
  } = usePaymentData();

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} mb={1}>
        {t('apiPaymentManagement.paymentHistory')}
      </Typography>
      <PaymentHistory
        paymentList={paymentList}
        total={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        downLoadInvoice={downLoadInvoice}
        loading={loading}
      />
    </Box>
  );
}

export default PaymentManagement;
