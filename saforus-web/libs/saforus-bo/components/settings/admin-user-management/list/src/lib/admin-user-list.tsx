import AdminUserListView from './view';
import { useSnapshot } from 'valtio';
import {
  AdminUserManagementStore,
  AdminUserModel,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

function AdminUserList() {
  const {
    setSearchQuery,
    adminUsers,
    selectedAdminUsers,
    setSelectedAdminUsers,
    total,
    listLoading,
  } = useSnapshot(AdminUserManagementStore);
  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    setSearchQuery({ pageNo });
  };

  return (
    <AdminUserListView
      onPageChange={onPageChange}
      adminUsers={adminUsers as AdminUserModel[]}
      total={total}
      listLoading={listLoading}
      selectedItems={selectedAdminUsers as AdminUserModel[]}
      setSelectedItems={setSelectedAdminUsers}
    />
  );
}

export default AdminUserList;
