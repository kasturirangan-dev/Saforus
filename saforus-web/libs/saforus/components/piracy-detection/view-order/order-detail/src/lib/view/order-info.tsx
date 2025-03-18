import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import { PiracyDetailData } from '../data/interface';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useMemo } from 'react';
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
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);
  const currentFile = useMemo(() => {
    return pdOrder?.fileList?.[0];
  }, [pdOrder?.fileList]);

  return (
    <BoxContainer>
      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('piracy-order-view.order-detail.order-number')}:
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: '24px',
            color: 'var(--gray-700)',
          }}
        >
          {pdOrder?.orderNo}
        </Typography>
      </BoxContent>

      <BoxContent>
        <Typography variant="body2" color="var(--gray-700)">
          {t('piracy-order-view.order-detail.request-date')}:
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
          {t('piracy-order-view.order-detail.status')}:
        </Typography>
        <DetectionStatus
          value={currentFile?.status || ''}
          reqDate={currentFile?.createdAt}
          esCompletedTime={currentFile?.estimatedCompletionTime}
        />
        <Typography
          variant="caption"
          sx={{
            textTransform: 'capitalize',
            padding: '2px 8px',
            borderRadius: '5px',
            fontWeight: 500,
            backgroundColor: 'var(--gray-400)',
            color: 'var(--neutral-200)',
          }}
        >
          {pdOrder?.autoDetection
            ? t('piracy-order-view.order-detail.auto-detection')
            : t('piracy-order-view.order-detail.expert-detection')}
        </Typography>
      </BoxContent>
    </BoxContainer>
  );
};

export default OrderInfo;
