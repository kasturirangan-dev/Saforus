import { Box, styled } from '@mui/material';
import { useCurrentOrderData } from './data';
import OrderInfo from './view/order-info';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import OrderFileList from './view/order-file-list';
import { WtrOrderStatus } from '@web-workspace/api-console/components/watermarking/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function WtrViewOrderDetail() {
  const { isLoading, currentOrder } = useCurrentOrderData();

  const esCompletedTime =
    currentOrder?.orderFiles[0]?.moreInfo?.estimatedCompletionTime;

  const orderFiles = currentOrder?.orderFiles ?? [];

  return (
    <BoxContainer sx={{ position: 'relative' }}>
      <LoadingOverLayer loading={isLoading} />
      <OrderInfo wtrOrder={currentOrder} />
      {currentOrder?.status !== WtrOrderStatus.EXPIRED && (
        <OrderFileList
          isLoading={isLoading}
          orderFiles={orderFiles}
          total={orderFiles.length}
          reqDate={currentOrder?.createdAt}
          esCompletedTime={esCompletedTime}
        />
      )}
    </BoxContainer>
  );
}

export default WtrViewOrderDetail;
