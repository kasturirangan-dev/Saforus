import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import ViewOrderStore from './store';
import { getOrders, QUERY_KEY } from './api';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';
import { ResponseWatermarkingViewOrder } from './interface';
import { StatusName } from '@web-workspace/saforus/components/forensic-watermarking-v2/data';

export function useViewOrderingData() {
  const { userInfo } = useSnapshot(AuthStore);
  const { searchQuery, setOrders, setTotal } = useSnapshot(ViewOrderStore);
  const tzOffset = getMinuteOffset();
  const [refetchInterval, setRefetchInterval] = useState(0);

  // Control loading state for the search query
  const [orderLoading, setOrderLoading] = useState(false);
  useEffect(() => {
    setOrderLoading(true);
  }, [...Object.values(searchQuery)]);

  const { isLoading, isFetching, data, isError } =
    useQuery<ResponseWatermarkingViewOrder>({
      refetchOnWindowFocus: false,
      queryKey: [
        QUERY_KEY.FORENSIC_VIEW_ORDER_LIST,
        ...Object.values(searchQuery),
      ],
      queryFn: async () => {
        // Formate the date to yyyy-MM-dd in user's timezone
        const reqData = {
          ...searchQuery,
          userId: userInfo?.id,

          startDate: formatTzDate(searchQuery.startDate, tzOffset),
          endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
        };
        return await getOrders(reqData);
      },
      refetchInterval: refetchInterval,
    });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const orderList = data?.data?.elementList || [];
      setOrders(orderList);
      setTotal(data?.data?.totalElements || 0);

      const hasInProgress = orderList.some(
        (order) =>
          order.orderStatus === StatusName.IN_QUEUE ||
          order.orderStatus === StatusName.IN_PROGRESS
      );
      // Set refetch interval to 5 seconds if any order is in progress,
      setRefetchInterval(hasInProgress ? 5000 : 0);
    }

    if (isError) {
      setOrders([]);
      setTotal(0);
    }

    if (!isFetching) {
      setOrderLoading(false);
    }
  }, [isLoading, isFetching, data, isError]);

  return {
    orderLoading: isLoading || orderLoading,
  };
}
