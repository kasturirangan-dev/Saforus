import { useSnapshot } from 'valtio';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEY, getOrders } from './api';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { useRef, useState } from 'react';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { OrderStatus, ViewOrderResponse } from './interface';
import ViewOrderStore from './store';
import { useEffect } from 'react';

export function useViewOrderingData() {
  const { searchQuery, setOrders, setTotal } = useSnapshot(ViewOrderStore);
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const [refetchInterval, setRefetchInterval] = useState(0);

  const { isLoading, isFetching, data, isError } = useQuery<
    unknown,
    Error,
    ViewOrderResponse
  >({
    queryKey: [QUERY_KEY.VIEW_ORDER_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      // Formate the date to yyyy-MM-dd in user's timezone
      // Remove the ALL values from the query
      const reqData = Object.fromEntries(
        Object.entries({
          ...searchQuery,
          startDate: formatTzDate(searchQuery.startDate, tzOffset),
          endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
        }).filter(([key, value]) => value !== 'ALL')
      );
      return await getOrders(reqData);
    },
    refetchInterval: refetchInterval,
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const orderList = data?.data?.records || [];
      setOrders(orderList);
      setTotal(data?.data?.total || 0);

      const hasInProgress = orderList.some(
        (order) => order.status === OrderStatus.AWAITING_PROCESS
      );
      // Set refetch interval to 5 seconds if any order is in progress,
      setRefetchInterval(hasInProgress ? 5000 : 0);
    }
    if (isError) {
      setOrders([]);
      setTotal(0);
    }
  }, [isLoading, data, isError]);

  // Control loading state for the search query
  const lastQueryRef = useRef(searchQuery);
  const [orderLoading, setOrderLoading] = useState(false);
  useEffect(() => {
    if (
      isFetching &&
      JSON.stringify(searchQuery) !== JSON.stringify(lastQueryRef.current)
    ) {
      setOrderLoading(true);
      lastQueryRef.current = searchQuery;
    } else {
      setOrderLoading(false);
    }
  }, [...Object.values(searchQuery), isFetching]);

  return {
    orderLoading: isLoading || orderLoading,
  };
}
