import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { cloneDeep } from 'lodash-es';

import {
  QUERY_KEY,
  RequestWatermarkingOrders,
  ResponseWatermarkingOrders,
  WatermarkingOrder,
  getOrders,
} from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';
import { WatermarkingOrdersStore } from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';

const useWatermarkingOrdersData = () => {
  const {
    searchQuery,
    setOrders,
    setTotal,
    total,
    setTotalPages,
    setOrdersLoading,
  } = useSnapshot(WatermarkingOrdersStore);

  // in this useQuery the Query func have to format start and end
  // date before calling api. It also set teamId bc it required by api
  // api return all watermarking order
  const { isLoading: isLoadingOrders } = useQuery(
    [QUERY_KEY.WATERMARKING_ORDERS_ORDER_LIST, ...Object.values(searchQuery)],
    () => {
      const queryData = cloneDeep(
        searchQuery
      ) as Partial<RequestWatermarkingOrders>;

      // Fetch data with date filter
      // Form 00:00 of start date to 23:59 of end date
      // Convert from local time to UTC time before sending to the server
      queryData.startDate = formatTzDate(searchQuery.startDate, 0);
      queryData.endDate = formatTzDate(searchQuery.endDate, 0, false);

      const reqData = {
        emailIdOrName: queryData.emailIdOrName,
        orderNo: queryData.orderNo,
        orderRequestStatus: queryData.orderRequestStatus,
        contentType: queryData.contentType,
        format: queryData.format,
        startDate: queryData.startDate,
        endDate: queryData.endDate,
        pageNo: queryData.pageNo,
        elementPerPage: queryData.elementPerPage,
      };
      return getOrders(reqData);
    },
    {
      onSuccess: (data: ResponseWatermarkingOrders) => {
        if (data.data) {
          // at this time some data return by api is duplicate
          // this uniqueList is used to avoid strange behavior of list component(datagrid)
          const responseData = data.data;
          let uniqueList: WatermarkingOrder[] = [];
          if (responseData.elementList) {
            uniqueList = responseData.elementList.filter(
              (item, index, array) => {
                // Find the index of the first occurrence of the item in the array
                const firstIndex = array.findIndex(
                  (element) => element.id === item.id
                );
                // Return true if the current index is equal to the first index
                return index === firstIndex;
              }
            );
          }
          setOrders(uniqueList);
          // Optionally, update the total number of orders from the response data
          setTotal(responseData.totalElements);

          const totalPage = Math.ceil(responseData.totalElements / 10);
          setTotalPages(totalPage);
          setOrdersLoading(isLoadingOrders);
        } else {
          setOrders([]);
          setTotalPages(0);
          setTotal(0);
        }
      },
      // keepPreviousData: true,
      // enabled: searchQuery.userId !== null,
    }
  );

  return {
    isLoadingOrders,
  };
};

export default useWatermarkingOrdersData;
