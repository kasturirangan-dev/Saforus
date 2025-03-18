import CreateNewOrder from '@web-workspace/api-console/components/watermarking/create';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { PageTitle } from '@web-workspace/api-console/common/views';
import { useBlocker } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import WatermarkingStore from '@web-workspace/api-console/components/watermarking/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function InsertWatermarkContainer() {
  const { t } = useTranslation();

  const { file, createOrderId, onReset } = useSnapshot(WatermarkingStore);
  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);
  const { openDialog } = useSnapshot(DialogStore);

  const { state, proceed, reset } = useBlocker(Boolean(file) && !createOrderId);
  useEffect(() => {
    if (state === 'blocked') {
      openDialog({
        name: DialogType.Cancel,
        props: {
          title: t('common.cancel-title'),
          description: t('common.cancel-description'),
          leaveTitle: `${t('button.leave')}`,
          stayTitle: `${t(`button.no`)}`,
          onLeave: proceed,
          onStay: reset,
        },
      });
    }
  }, [state, proceed, reset]);
  return (
    <BoxContainer>
      <PageTitle
        title={t('apiWatermarking.create.title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
          gap: '2px',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('apiWatermarking.create.description')}
        </Typography>
      </PageTitle>
      <CreateNewOrder />
    </BoxContainer>
  );
}

export default InsertWatermarkContainer;
