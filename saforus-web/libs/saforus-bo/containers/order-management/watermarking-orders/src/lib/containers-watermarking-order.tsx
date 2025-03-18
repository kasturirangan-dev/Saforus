import { Container, Backdrop, CircularProgress, Box } from '@mui/material';
import WatermarkingOrdersList from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/list';
import WatermarkingOrdersSearch from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/search';
import useWatermarkingOrdersData from './data';
import { useSnapshot } from 'valtio';
import { WatermarkingOrdersStore } from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useEffect } from 'react';
import CommonStore from '@web-workspace/saforus-bo/common/data';

export function ContainersOrderManagementWatermarkingOrder() {
  const { resetWatermarkingOrderStore } = useSnapshot(WatermarkingOrdersStore);
  const { isLoading: isLoadingOptions } = useSnapshot(CommonStore);
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { isLoadingOrders } = useWatermarkingOrdersData();

  useEffect(() => {
    resetWatermarkingOrderStore();
    setMainLayoutCss({ height: '100vh', width: '100vw' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Backdrop
        open={isLoadingOptions}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingBottom: '3.125rem',
        }}
      >
        {!isLoadingOptions && <WatermarkingOrdersSearch />}
        <WatermarkingOrdersList isOrdersLoading={isLoadingOrders} />
      </Box>
    </Container>
  );
}

export default ContainersOrderManagementWatermarkingOrder;
