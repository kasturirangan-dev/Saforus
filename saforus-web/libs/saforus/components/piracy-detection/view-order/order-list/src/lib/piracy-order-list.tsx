import PiracyOrderListView from './view';
import { usePagingViewOrderingData } from './data';
import { PiracyOrder } from '@web-workspace/saforus/components/piracy-detection/view-order/data';

function PiracyOrderListComponent({ loading }: { loading: boolean }) {
  const { orders, total, onPageChange, onRowClick } =
    usePagingViewOrderingData();
  return (
    <PiracyOrderListView
      orders={orders as PiracyOrder[]}
      total={total}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      loading={loading}
    />
  );
}

export default PiracyOrderListComponent;
