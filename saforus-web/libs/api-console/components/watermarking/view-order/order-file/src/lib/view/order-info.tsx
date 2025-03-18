import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { OrderFile } from '@web-workspace/api-console/components/watermarking/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
}));

const OrderInfo = ({
  orderFile,
  reqDate,
}: {
  orderFile?: OrderFile;
  reqDate?: Date | string;
}) => {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);

  return (
    <BoxContainer>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiWatermarking.order-detail.file-number')}:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '24px',
            color: 'var(--gray-700)',
          }}
        >
          {orderFile?.id}
        </Typography>
      </BoxContent>

      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiWatermarking.order-detail.process-date')}:
        </Typography>

        <Typography variant="body2" color="var(--gray-50)">
          {`${formatDateWithLanguage({
            date: reqDate,
            withSlash: true,
            isDetail: true,
            tzOffset,
          })} (GMT${timeZone})`}
        </Typography>
      </BoxContent>

      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('apiWatermarking.order-detail.status')}:
        </Typography>
        <DetectionStatus
          value={orderFile?.status || ''}
          reqDate={reqDate}
          esCompletedTime={orderFile?.moreInfo?.estimatedCompletionTime}
        />
      </BoxContent>
    </BoxContainer>
  );
};

export default OrderInfo;
