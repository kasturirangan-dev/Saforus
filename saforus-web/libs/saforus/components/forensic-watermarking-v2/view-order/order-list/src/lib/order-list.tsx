import OrderListView from './view';
import { usePagingViewOrderingData } from './data';
import { WatermarkingOrder } from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';

function OrderListComponent({ loading }: { loading: boolean }) {
  const {
    orders,
    total,
    onPageChange,
    onRowClick,
    onDeleteOrder,
    onDownLoad,
    isDownloading,
    isDeleting,
  } = usePagingViewOrderingData();
  return (
    <OrderListView
      orders={orders as WatermarkingOrder[]}
      total={total}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      onDeleteOrder={onDeleteOrder}
      onDownLoad={onDownLoad}
      loading={loading || isDownloading || isDeleting}
    />
  );
}

export default OrderListComponent;
