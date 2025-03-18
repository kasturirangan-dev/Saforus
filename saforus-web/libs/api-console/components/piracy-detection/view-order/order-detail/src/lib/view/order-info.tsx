import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { PiracyDetailData } from '@web-workspace/api-console/components/piracy-detection/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
}));

const OrderInfo = ({ pdOrder }: { pdOrder?: PiracyDetailData }) => {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);

  const esCompletedTime =
    pdOrder?.orderFiles[0]?.moreInfo?.estimatedCompletionTime;

  return (
    <BoxContainer>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiDetection.order-detail.order-number')}:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '24px',
            color: 'var(--gray-700)',
          }}
        >
          {pdOrder?.id}
        </Typography>
      </BoxContent>

      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiDetection.order-detail.requested-date')}:
        </Typography>

        <Typography variant="body2" color="var(--gray-50)">
          {`${formatDateWithLanguage({
            date: pdOrder?.createdAt,
            withSlash: true,
            isDetail: true,
            tzOffset,
          })} (GMT${timeZone})`}
        </Typography>
      </BoxContent>

      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiDetection.order-detail.status')}:
        </Typography>
        <DetectionStatus
          value={pdOrder?.status || ''}
          reqDate={pdOrder?.createdAt}
          esCompletedTime={esCompletedTime}
        />
      </BoxContent>
    </BoxContainer>
  );
};

export default OrderInfo;
