import { useQuery } from 'react-query';
import { QUERY_KEY, fetchUsers } from './api';
import { useSnapshot } from 'valtio';
import { AdminDashboardStore } from './store';
// import { user } from './interface';

export const useUserData = () => {
  const { searchQuery, setUsersData, setSearchQuery } =
    useSnapshot(AdminDashboardStore);

  const { isFetching } = useQuery(
    [QUERY_KEY.ADMIN_DASHBOARD, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        page: searchQuery.page,
        size: searchQuery.size,
      };
      return fetchUsers(reqData);
    },
    {
      onSuccess: (response) => {
        const resData = response?.data;

        const records = resData?.records || [];

        setUsersData({
          ...resData,
          records,
        });
      },
    }
  );

  const onPageChange = async (selection: any) => {
    const page = selection.page;
    setSearchQuery({ page });
  };

  return {
    isFetching,
    onPageChange,
  };
};
