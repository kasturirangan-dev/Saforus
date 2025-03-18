import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WatermarkingOrderInfo } from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';

export interface OrderInforProps {
  order: WatermarkingOrderInfo;
}

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
}));

const OrderInfo = ({ order }: OrderInforProps) => {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  return (
    <BoxContainer>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('watermarked-order-detail.order-number')}
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '24px',
            color: 'var(--gray-700)',
          }}
        >
          {order.orderNo}
        </Typography>
      </BoxContent>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('watermarked-order-detail.requested-date')}
        </Typography>
        <Typography variant="body2" color="var(--gray-50)">
          {order.requestedDate &&
            `${formatDateWithLanguage({
              date: order.requestedDate,
              withSlash: true,
              isDetail: true,
              tzOffset,
            })} (GMT${timeZone})`}
        </Typography>{' '}
      </BoxContent>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('watermarked-order-detail.status')}
        </Typography>
        <DetectionStatus
          value={order.status as string}
          reqDate={order?.requestedDate}
          esCompletedTime={order?.estimatedCompletionTime}
        />
      </BoxContent>
    </BoxContainer>
  );
};

export default OrderInfo;
