/* 
Noted:
(1): there is a bug when searchParam has changed yet but query process still going 
may be can cause by parent component re-render make the hook call again. So this
logic is defined to set the query only run once and everytime searchParam change
*/

import { useMutation, useQuery, useQueryClient } from 'react-query';
import NotificationListStore, {
  NOTICES_LIST_QUERY_KEY,
  NotificationStatus,
  getNotificationList,
  mockNotifications,
  updateNoticeStatus,
} from '@web-workspace/saforus-bo/components/service-management/notification-list/data';
import { useSnapshot } from 'valtio';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useEffect, useRef, useState } from 'react';
import CreateNotificationStore from '@web-workspace/saforus-bo/components/service-management/create-notification/data';

export const useNotificationListData = () => {
  const { setNotifications, setTotal, searchParams, setSearchParam } =
    useSnapshot(NotificationListStore);

  const { setCurrentNoticeVersion } = useSnapshot(
    CreateNotificationStore
  );

  const searchParamRef = useRef(searchParams); // (1) create a ref to store the searchParam value

  const [enabled, setEnabled] = useState(false); // (1)

  const {
    isSuccess: isGetNoticesSuccess,
    isLoading,
    refetch,
  } = useQuery(
    [NOTICES_LIST_QUERY_KEY.SEARCH_NOTICES, ...Object.values(searchParams)],
    () => getNotificationList(searchParams),
    {
      onSuccess(data) {
        setNotifications(data.data.elementList);
        setTotal(data.data.totalElements);
      },
      onError(err) {
        showToast.warning('Get notices failed!');
      },
      enabled: !enabled || searchParamRef.current !== searchParams, // (1) only enable the query if the searchParam value has changed and query once when render
    }
  );

  useEffect(() => {
    searchParamRef.current = searchParams; // (1) update the ref value after the query
    setEnabled(searchParamRef.current !== searchParams);
  }, [searchParams]);

  const { mutate, data } = useMutation(
    async ({
      id,
      status,
      noticeVersion,
      showOnPage,
    }: {
      id: number;
      status: string;
      noticeVersion: string;
      showOnPage: string;
    }) => {
      return updateNoticeStatus(id, status, noticeVersion, showOnPage);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch relevant queries
        refetch();
        setCurrentNoticeVersion(false);
      },
    }
  );

  // set the pageNo in search param when event change page trigger
  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    if (pageNo !== searchParams.pageNo) {
      setSearchParam({ pageNo });
    }
  };
  //////////////////////////////////////////////

  return {
    isSuccess: isGetNoticesSuccess,
    isLoading,
    onPageChange,
    mutate,
    data,
  };
};
