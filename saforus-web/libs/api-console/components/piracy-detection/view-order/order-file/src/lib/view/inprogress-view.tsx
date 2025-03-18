import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@web-workspace/shared/components/widgets/circular-progress';
import { NoRowContainer } from './styled-elements';
import { memo } from 'react';

function InProgressView({
  reqDate,
  esCompletedTime,
}: {
  reqDate?: string | number | Date;
  esCompletedTime?: string | number | Date;
}) {
  const { t } = useTranslation();
  return (
    <NoRowContainer>
      <CircularProgress
        size={24}
        reqDate={reqDate}
        esCompletedTime={esCompletedTime}
      />

      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={'var(--gray-700)'}
        >
          {t('apiDetection.order-detail.inprogress')}
        </Typography>
        <Typography variant="body2" color="var(--gray-200">
          {t('apiDetection.order-detail.inprogress-des')}
        </Typography>
      </Box>
    </NoRowContainer>
  );
}

export default memo(InProgressView);
