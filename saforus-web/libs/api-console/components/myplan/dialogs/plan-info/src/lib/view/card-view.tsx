import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetailContainer } from './styled-elements';
import CardLogo from '@web-workspace/api-console/components/payment/card-logo';

export function CardView({
  cardCompany,
  cardNumber,
}: {
  cardCompany: string;
  cardNumber: string;
}) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle1" color="var(--gray-700)" fontWeight={600}>
        {t('apiServicePlan.planDetail.paymentMethod')}
      </Typography>
      <DetailContainer
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CardLogo cardNumber={cardNumber} />
        <Typography
          variant="subtitle2"
          color="var(--gray-700)"
          fontWeight="500"
        >
          {cardNumber}
        </Typography>
      </DetailContainer>
    </Box>
  );
}

export default CardView;
