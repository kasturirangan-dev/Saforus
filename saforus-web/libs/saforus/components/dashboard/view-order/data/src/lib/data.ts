import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './api';
import {
  getMinuteOffset,
  getTeamId,
} from '@web-workspace/saforus/common/utils';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import ServiceViewOrderStore from './store';
import {
  getOrders,
  ResponseWatermarkingViewOrder,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { StatusName } from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import {
  PiracyOrderStatus,
  ResponsePiracyOrder,
  getPdOrders,
} from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { ServiceType } from '@web-workspace/saforus/common/model';
import { useEffect, useState } from 'react';

export function useServiceSearchViewOrderData() {
  const { userInfo } = useSnapshot(AuthStore);
  const { searchQuery, setOrders, setTotal, setPdOrders, setPdTotal } =
    useSnapshot(ServiceViewOrderStore);
  const tzOffset = getMinuteOffset();
  const teamId = getTeamId();

  // Control loading state for the search query
  const [orderLoading, setOrderLoading] = useState(false);
  useEffect(() => {
    setOrderLoading(true);
  }, [...Object.values(searchQuery)]);

  // WM orders
  const [refetchInterval, setRefetchInterval] = useState(0);
  const { isLoading, isFetching, data, isError } =
    useQuery<ResponseWatermarkingViewOrder>({
      queryKey: [QUERY_KEY.VIEW_ORDER_LIST, ...Object.values(searchQuery)],
      queryFn: async () => {
        const { pageNo, pageNoPd, ...restQuery } = searchQuery;
        const reqData = {
          ...restQuery,
          pageNo: pageNo,
          userId: userInfo?.id,
          // Formate the date to yyyy-MM-dd in user's timezone
          startDate: formatTzDate(searchQuery.startDate, tzOffset),
          endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
          includeFile: true,
        };

        return await getOrders(reqData);
      },
      enabled:
        searchQuery.serviceType === ServiceType.ALL ||
        searchQuery.serviceType === ServiceType.DIGITAL_WATERMARKING,
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
  }, [isLoading, isFetching, data, isError]);

  // PD orders
  const [pdRefetchInterval, setPdRefetchInterval] = useState(0);

  const {
    isLoading: isPdLoading,
    isFetching: isPdFetching,
    data: pdData,
    isError: isPdError,
  } = useQuery<ResponsePiracyOrder>({
    queryKey: [QUERY_KEY.PIRACY_VIEW_ORDER_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      const { pageNo, pageNoPd, ...restQuery } = searchQuery;
      const reqData = {
        ...restQuery,
        pageNo: pageNoPd,
        teamId: teamId,
        userId: userInfo?.id,
        startDate: formatTzDate(searchQuery.startDate, tzOffset),
        endDate: formatTzDate(searchQuery.endDate, tzOffset, false),
      };
      return await getPdOrders(reqData);
    },
    enabled:
      searchQuery.serviceType === ServiceType.ALL ||
      searchQuery.serviceType === ServiceType.PIRACY_DETECTION,
    refetchInterval: pdRefetchInterval,
  });

  useEffect(() => {
    if (!isPdLoading && pdData && !isError) {
      const orderList = pdData?.data?.elementList || [];
      setPdOrders(orderList);
      setPdTotal(pdData?.data?.totalElements || 0);

      const hasInProgress = orderList.some(
        (order) =>
          order.orderStatus === PiracyOrderStatus.IN_QUEUE ||
          order.orderStatus === PiracyOrderStatus.IN_PROGRESS
      );
      // Set refetch interval to 5 seconds if any order is in progress,
      setPdRefetchInterval(hasInProgress ? 5000 : 0);
    }
    if (isError) {
      setOrders([]);
      setTotal(0);
    }

    if (!isFetching) {
      setOrderLoading(false);
    }
  }, [isPdLoading, pdData, isPdError]);

  useEffect(() => {
    if (!isFetching && !isPdFetching) {
      setOrderLoading(false);
    }
  }, [isFetching, isPdFetching]);

  return {
    orderLoading: isLoading || orderLoading,
    pdOrderLoading: isPdLoading || orderLoading,
  };
}
