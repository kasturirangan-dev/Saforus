import React, { useEffect } from 'react';
import { AdminUserCreditStore, QUERY_CREDIT_KEY, fetchUserCredit, mockFetchUserCredits } from '@web-workspace/saforus/components/user-info/admin-user-credit/data';
import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { DateFormat, formatDate } from '@web-workspace/shared/helpers/dates';

export function usePagingUserCreditsData() {
  const { setUserCredits, setSearchQuery, userCredits, total, listLoading, searchQuery } =
    useSnapshot(AdminUserCreditStore);


  const { isLoading, isError, data } = useQuery<
    unknown,
    Error,
    any
  >({
    queryKey: [QUERY_CREDIT_KEY.VIEW_USER_CREDIT_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {

      const reqDataWater = {
        pageNo: searchQuery.pageNo,
        elementPerPage: searchQuery.elementPerPage,
      }
      return fetchUserCredit(reqDataWater);
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setUserCredits(data.data);
    }
    if (isError) {
      setUserCredits(null);
    }
    AdminUserCreditStore.listLoading = isLoading;
  }, [isLoading, data, isError]);

  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    setSearchQuery({ pageNo });
  };

  return {
    onPageChange,
    userCredits,
    total,
    listLoading,
  };
}
