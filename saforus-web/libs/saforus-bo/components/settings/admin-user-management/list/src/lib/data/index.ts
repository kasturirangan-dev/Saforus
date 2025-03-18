import { useSnapshot } from 'valtio';
import { AdminUserManagementStore } from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

export function usePagingUserCreditsData() {
  const { setSearchQuery, adminUsers, total, listLoading } =
    useSnapshot(AdminUserManagementStore);

  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    setSearchQuery({ pageNo });
  };

  return {
    onPageChange,
    adminUsers,
    total,
    listLoading,
  };
}
