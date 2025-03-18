import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { cloneDeep } from 'lodash-es';
import {
  PiracyDetectionRequestsStore,
  QUERY_KEY as PIRACY_DETECTION_QUERY_KEY,
  RequestPiracyDetectionRequests,
  getRequests,
  ResponsePiracyDetectionRequests,
  PiracyDetectionRequest,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';

const usePiracyDetectionRequestsData = () => {
  const { searchQuery, setRequests, setTotal, total, setTotalPages } =
    useSnapshot(PiracyDetectionRequestsStore);

  // in this useQuery the Query func have to format start and end
  // date before calling api. It also set teamId bc it required by api
  // api return all watermarking order
  const { isLoading: isLoadingRequest } = useQuery(
    [
      PIRACY_DETECTION_QUERY_KEY.PIRACY_DETECTION_REQUESTS_LIST,
      ...Object.values(searchQuery),
    ],
    () => {
      const queryData = cloneDeep(
        searchQuery
      ) as Partial<RequestPiracyDetectionRequests>;

      // Fetch data with date filter
      // Form 00:00 of start date to 23:59 of end date
      // Convert from local time to UTC time before sending to the server
      queryData.startDate = formatTzDate(searchQuery.startDate, 0);
      queryData.endDate = formatTzDate(searchQuery.endDate, 0, false);

      //  emailIdOrName: string;
      //  orderNo: string;
      //  serviceType: string;
      //  orderRequestStatus: string;
      //  contentType: string;
      //  format: string;
      //  startDate: Date | string;
      //  endDate: Date | string;
      //  pageNo: number;
      //  elementPerPage: number;

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

      return getRequests(reqData);
    },
    {
      onSuccess: (data: ResponsePiracyDetectionRequests) => {
        if (data.data) {
          const responseData = data.data;
          // at this time some data return by api is duplicate
          // this uniqueList is used to avoid strange behavior of list component(datagrid)
          let uniqueList: PiracyDetectionRequest[] = [];
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
          setRequests(uniqueList);
          // Optionally, update the total number of orders from the response data
          if (!total || total < responseData.totalElements) {
            setTotal(responseData.totalElements);
          }
          const totalPage = Math.ceil(responseData.totalElements / 10);
          setTotalPages(totalPage);
        } else {
          setRequests([]);
          setTotalPages(0);
          setTotal(0);
        }
      },
      // enabled: false,
    }
  );

  return {
    isLoadingRequest,
  };
};

export default usePiracyDetectionRequestsData;
