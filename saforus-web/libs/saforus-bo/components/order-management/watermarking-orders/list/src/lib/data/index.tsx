import { useSnapshot } from 'valtio';
import { WatermarkingOrdersStore } from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';

export function useWatermarkingListData() {
  const { searchQuery, setSearchQuery, ordersLoading } = useSnapshot(
    WatermarkingOrdersStore
  );
  // set the pageNo in search param when event change page trigger
  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    if (pageNo !== searchQuery.pageNo) {
      setSearchQuery({ pageNo });
    }
  };
  //////////////////////////////////////////////
  return {
    onPageChange,
    ordersLoading,
  };
}
