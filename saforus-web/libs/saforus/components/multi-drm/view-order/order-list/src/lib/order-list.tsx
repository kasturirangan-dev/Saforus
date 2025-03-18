import OrderListView from './view';
import { usePagingViewOrderingData } from './data';

function OrderListComponent() {
  const { onPageChange, orders, total } = usePagingViewOrderingData();
  return (
    <OrderListView onPageChange={onPageChange} orders={orders} total={total} />
  );
}

export default OrderListComponent;
