import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { getPdOrders, QUERY_KEY } from './api';
import {
  getMinuteOffset,
  getTeamId,
} from '@web-workspace/saforus/common/utils';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useEffect, useState } from 'react';
import PiracyOrderStore from './store';
import { PiracyOrderStatus, ResponsePiracyOrder } from './interface';

export function usePiracyViewOrderingData() {
  const { userInfo } = useSnapshot(AuthStore);
  const { searchQuery, setOrders, setTotal } = useSnapshot(PiracyOrderStore);
  const tzOffset = getMinuteOffset();
  const teamId = getTeamId();
  const [refetchInterval, setRefetchInterval] = useState(0);

  // Control loading state for the search query
  const [orderLoading, setOrderLoading] = useState(false);
  const { isLoading, isFetching, data, isError } =
    useQuery<ResponsePiracyOrder>({
      refetchOnWindowFocus: false,
      queryKey: [
        QUERY_KEY.PIRACY_VIEW_ORDER_LIST,
        ...Object.values(searchQuery),
      ],
      queryFn: async () => {
        // Formate the date to yyyy-MM-dd in user's timezone
        const reqData = {
          ...searchQuery,
          teamId: teamId,
          userId: userInfo?.id,
          startDate: formatTzDate(searchQuery.startDate, tzOffset),
          endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
        };
        return await getPdOrders(reqData);
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
          order.orderStatus === PiracyOrderStatus.IN_QUEUE ||
          order.orderStatus === PiracyOrderStatus.IN_PROGRESS
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
