import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { useEffect } from 'react';
import {
  QUERY_KEY,
  getOrders,
  FindWtrOrderStore,
} from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';

export function useSearchViewOrderingData() {
  const { orders, searchQuery, setOrders, addOrders, setTotal } =
    useSnapshot(FindWtrOrderStore);

  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);

  const { isFetching, data, isError } = useQuery(
    [QUERY_KEY.FORENSIC_VIEW_ORDER_LIST, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        ...searchQuery,
        startDate: formatTzDate(searchQuery.startDate, tzOffset),
        endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
      };
      return getOrders(reqData);
    }
  );

  useEffect(() => {
    // If data is fetched successfully, update the order list
    if (!isFetching && data && !isError) {
      const orderList = data?.data?.records || [];

      // For infinite scroll, if pageNo is 0, reset the order list
      if (searchQuery?.page === 0) {
        setOrders(orderList);
      } else {
        // Add new order to existing order list without duplicate
        const additionList = orderList.filter(
          (orderListItem) =>
            !orders.some((orderItem) => orderItem.id === orderListItem.id)
        );
        if (additionList.length > 0) {
          addOrders(additionList);
        }
      }
      setTotal(data?.data?.total || 0);
    }

    if (isError && searchQuery?.page === 0) {
      setOrders([]);
      setTotal(0);
    }
  }, [isFetching, data, isError]);

  return {
    orderLoading: isFetching,
  };
}
