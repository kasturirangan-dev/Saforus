import { Box, styled } from '@mui/material';
import { useCurrentOrderData } from './data';
import OrderInfo from './view/order-info';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import OrderFileList from './view/order-file-list';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyViewOrderDetail() {
  const { isLoading, currentOrder } = useCurrentOrderData();

  const esCompletedTime =
    currentOrder?.orderFiles[0]?.moreInfo?.estimatedCompletionTime;

  const orderFiles = currentOrder?.orderFiles ?? [];

  return (
    <BoxContainer sx={{ position: 'relative' }}>
      <LoadingOverLayer loading={isLoading} />
      <OrderInfo pdOrder={currentOrder} />
      <OrderFileList
        isLoading={isLoading}
        orderFiles={orderFiles}
        total={orderFiles.length}
        reqDate={currentOrder?.createdAt}
        esCompletedTime={esCompletedTime}
      />
    </BoxContainer>
  );
}

export default PiracyViewOrderDetail;
