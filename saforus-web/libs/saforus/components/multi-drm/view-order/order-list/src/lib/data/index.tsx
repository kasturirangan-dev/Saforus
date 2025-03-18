import { useSnapshot } from 'valtio';
import { ViewOrderStore } from '@web-workspace/saforus/components/forensic-watermarking/view-order/data';

export const enum Status {
  COMPLETED = '1',
  INPROGRESS = '2',
  INQUEUE = '3',
  FAILED = '4',
}

export const enum StatusName {
  COMPLETED = 'Completed',
  INPROGRESS = 'In Progress',
  INQUEUE = 'In Queue',
  FAILED = 'Failed',
}

export function usePagingViewOrderingData() {
  const { searchQuery, setSearchQuery, orders, total, orderLoading } =
    useSnapshot(ViewOrderStore);

  const onPageChange = async (selection: any) => {
    const fromRow = selection.page * selection.pageSize;
    setSearchQuery({ fromRow });
  };

  const statusGenerate = (status: string): string => {
    switch (status) {
      case Status.COMPLETED:
        return StatusName.COMPLETED;
      case Status.INPROGRESS:
        return StatusName.INPROGRESS;
      case Status.INQUEUE:
        return StatusName.INQUEUE;
      case Status.FAILED:
        return StatusName.FAILED;
      default:
        return 'Unknown';
    }
  };

  const newOrders = orders?.map((el) => {
    return {
      ...el,
      statusName: statusGenerate(el.status),
      extensionName: el?.extensions?.[0]?.toUpperCase() ?? '',
    };
  });

  return {
    onPageChange,
    orders: newOrders,
    total,
    orderLoading,
  };
}
