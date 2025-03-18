import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import {
  getOrders,
  QUERY_KEY,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import { StatusName } from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useEffect } from 'react';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

export function useSearchViewOrderingData() {
  const { orders, searchQuery, setOrders, addOrders, setTotal } =
    useSnapshot(FindWtrOrderStore);

  const { userInfo } = useSnapshot(AuthStore);
  const tzOffset = getMinuteOffset();

  const { isFetching, data, isError } = useQuery(
    [QUERY_KEY.FORENSIC_VIEW_ORDER_LIST, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        ...searchQuery,
        userId: userInfo?.id,
        elementPerPage: 30,
        orderRequestStatus: StatusName.COMPLETED,
        startDate: formatTzDate(searchQuery.startDate, tzOffset),
        endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
      };
      return getOrders(reqData);
    }
  );

  useEffect(() => {
    // If data is fetched successfully, update the order list
    if (!isFetching && data && !isError) {
      const orderList = data?.data?.elementList || [];

      // For infinite scroll, if pageNo is 0, reset the order list
      if (searchQuery?.pageNo === 0) {
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
      setTotal(data?.data?.totalElements || 0);
    }

    if (isError && searchQuery?.pageNo === 0) {
      setOrders([]);
      setTotal(0);
    }
  }, [isFetching, data, isError]);

  return {
    orderLoading: isFetching,
  };
}
