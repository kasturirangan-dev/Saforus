import { usePagingTeamOrderData } from '../data/order-list';
import TeamOrderListView from './order-list-view';

function TeamOrderComponent() {
  const { onPageChange, orders, totalOrder, ordersLoading } = usePagingTeamOrderData();
  return (
    <TeamOrderListView
      onPageChange={onPageChange}
      orders={[...orders]}
      total={totalOrder}
      ordersLoading={ordersLoading}
    />
  );
}

export default TeamOrderComponent;
