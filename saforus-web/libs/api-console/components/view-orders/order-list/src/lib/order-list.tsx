import OrderListView from './view';
import { usePagingViewOrderingData } from './data';

function OrderListComponent({ loading }: { loading: boolean }) {
  const { orders, total, onRowClick, onDeleteOrder, isDeleting } =
    usePagingViewOrderingData();

  return (
    <OrderListView
      orders={orders}
      total={total}
      onRowClick={onRowClick}
      loading={loading || isDeleting}
      onDeleteOrder={onDeleteOrder}
    />
  );
}

export default OrderListComponent;
