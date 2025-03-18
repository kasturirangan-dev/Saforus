import DashboardOrderListView from './view';
import { usePagingViewOrderingData } from './data';
import { WatermarkingOrder } from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';

function DashboardOrderListComponent({ loading }: { loading: boolean }) {
  const { orders, total, onPageChange, onRowClick, onDeleteOrder, onDownLoad } =
    usePagingViewOrderingData();

  return (
    <DashboardOrderListView
      orders={orders as WatermarkingOrder[]}
      total={total}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      loading={loading}
      onDeleteOrder={onDeleteOrder}
      onDownLoad={onDownLoad}
    />
  );
}

export default DashboardOrderListComponent;
