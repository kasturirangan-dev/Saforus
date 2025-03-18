import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { useSnapshot } from 'valtio';

export const enum StatusName {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'IN_PROGRESS',
  IN_QUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
  ERROR = 'ERROR',
}

export function usePagingTeamOrderData() {
  const { setSearchOrderQuery, orders, totalOrder, ordersLoading } =
    useSnapshot(UserTeamStore);

  const onPageChange = async (selection: any) => {
    const fromRow = selection.page;
    setSearchOrderQuery({ pageNo: fromRow });
  };

  return {
    onPageChange,
    orders,
    totalOrder,
    ordersLoading,
  };
}
