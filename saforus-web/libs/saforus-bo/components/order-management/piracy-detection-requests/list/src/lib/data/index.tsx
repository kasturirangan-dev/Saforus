import { PiracyDetectionRequestsStore } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { useSnapshot } from 'valtio';

export function usePiracyDetectionListData() {
  const { searchQuery, setSearchQuery } = useSnapshot(
    PiracyDetectionRequestsStore
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
  };
}
