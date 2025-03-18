import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import CreateOrder from '@web-workspace/saforus/components/forensic-watermarking-v2/create';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { PageTitle } from '@web-workspace/saforus/common/views';
import WatermarkingStore, {
  QUERY_KEY,
  WatermarkingOrderInfo,
  getOrderFileList,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useQuery } from 'react-query';
import {
  DashboardServiceUsageStore,
  useDashboardData,
} from '@web-workspace/saforus/components/dashboard/service-usage/data';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function WatermarkingContainer() {
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t } = useTranslation();
  const { createOrderNo, currentOrder, saveOrder, onReset, createStep } =
    useSnapshot(WatermarkingStore);

  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      onReset();
      resetMainLayoutCss();
    };
  }, []);

  // Get usage data when create order
  useDashboardData();
  const { forensicWatermarkingData } = useSnapshot(DashboardServiceUsageStore);
  const { openDialog } = useSnapshot(DialogStore);
  const availableSize = useMemo(() => {
    const totalCapacity = forensicWatermarkingData?.wtrCapacitySize ?? 0;
    const usedCapacity = forensicWatermarkingData?.wtrUsedCapacitySize ?? 0;
    return Math.max((totalCapacity - usedCapacity) * 1024 * 1024 * 1024, 0);
  }, [forensicWatermarkingData]);

  const location = useLocation();
  useEffect(() => {
    // This code runs whenever the route changes
    if (createStep !== 1) onReset();
  }, [location]);

  const navigate = useNavigate();
  // Fetch order file list to navigate to order detail page
  const { data } = useQuery<any>(
    [QUERY_KEY.ORDER_DETAIL, createOrderNo],
    () => getOrderFileList(createOrderNo || ''),

    {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          const orderData = data[0];
          saveOrder({
            ...currentOrder,
            status: orderData.progress ?? currentOrder?.status ?? '',
            requestedDate: orderData.regDt ?? currentOrder?.requestedDate ?? '',
          } as WatermarkingOrderInfo);

          const detailPagePath =
            ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children
              .WATERMARKING_HISTORY_DETAIL.path;
          const detailPageUrl = `${detailPagePath}/${createOrderNo}?personOrderInfoSq=${
            orderData?.personOrderInfoSq || ''
          }`;
          openDialog({
            name: DialogType.Loading,
            props: {
              status: 'success',
              title: t('create-watermarking.success'),
            },
          });
          setTimeout(() => {
            navigate(detailPageUrl, {
              state: { from: 'create-new-request' },
            });
          }, 3000);
        }
      },
      enabled: createStep === 2,
    }
  );

  return (
    <BoxContainer>
      <PageTitle
        title={t('create-watermarking.title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('create-watermarking.description')}
        </Typography>
      </PageTitle>
      <CreateOrder availableSize={availableSize} />
    </BoxContainer>
  );
}

export default WatermarkingContainer;
