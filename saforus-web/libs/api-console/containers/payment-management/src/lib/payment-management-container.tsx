import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CardManagement from '@web-workspace/api-console/components/payment/card-management';
import PaymentHistory from '@web-workspace/api-console/components/payment/payment-history';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
}));

const BoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '4px',
  paddingTop: '16px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PaymentManagementContainer() {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <BoxTitle>
        <Typography
          sx={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '36px',
            letterSpacing: '-0.02em',
            color: 'var(--gray-900)',
          }}
        >
          {t('apiPaymentManagement.title')}
        </Typography>
        <Typography
          variant="body2"
          color="var(--gray-50)"
          sx={{ fontSize: '14px', fontWeight: 400 }}
        >
          {t('apiPaymentManagement.description')}
        </Typography>
      </BoxTitle>
      <BoxContent>
        <CardManagement />
        <PaymentHistory />
      </BoxContent>
    </BoxContainer>
  );
}

export default PaymentManagementContainer;
