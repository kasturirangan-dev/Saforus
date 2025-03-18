import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { sub, startOfYear, endOfYear } from 'date-fns';
import {
  RequestAdminUser,
  AdminUserModel,
  ResponseAdminUser,
  AdminStatus,
  AdminType,
} from './interface';
import { randomId } from '@web-workspace/shared/helpers/strings';
import { TOption } from '@web-workspace/saforus-bo/common/model';

interface AdminUserStoreType {
  status: TOption[];
  types: TOption[];
  markAnyUsers: TOption[];
  users: TOption[];
  adminUsers: AdminUserModel[];
  total: number;
  listLoading: boolean;
  searchQuery: Partial<RequestAdminUser>;
  setSearchQuery: (query: Partial<RequestAdminUser>) => void;
  setAdminUsers: (data: ResponseAdminUser | null) => Promise<void>;
  resetAdminUserStore: () => void;
  selectedAdminUsers: AdminUserModel[];
  setSelectedAdminUsers: (users: AdminUserModel[]) => void;
  setMarkAnyUsers: (users: TOption[]) => void;
  setUsers: (users: TOption[]) => void;
}

function adminUserStore() {
  const currentDate = new Date();

  const store: AdminUserStoreType = {
    adminUsers: [],
    markAnyUsers: [],
    users: [],
    total: 0,
    listLoading: false,
    // FIXME map data STATUS
    status: [
      { label: 'All', value: '' },
      { label: 'Active', value: AdminStatus.ACTIVE },
      { label: 'Inactive', value: AdminStatus.INACTIVE },
    ],
    types: [
      { label: 'All', value: '' },
      { label: 'Super Admin', value: AdminType.SUPER_ADMIN },
      { label: 'Admin CS', value: AdminType.ADMIN_CS },
      { label: 'Admin', value: AdminType.ADMIN },
    ],
    setAdminUsers: async (response?: ResponseAdminUser | null) => {
      if (
        response &&
        response?.elementList &&
        response?.elementList?.length > 0
      ) {
        AdminUserManagementStore.adminUsers = response?.elementList?.map((el) => {
          return {
            ...el,
            id: randomId(),
            userId: el?.id ? el?.id : randomId(),
          } as any;
        });
      } else {
        AdminUserManagementStore.adminUsers = [];
      }

      if (response?.totalElements !== AdminUserManagementStore.total) {
        AdminUserManagementStore.total = response?.totalElements ?? 0;
      }
    },
    searchQuery: {
      nameOrEmail: '',
      status: '',
      role: '',
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    selectedAdminUsers: [],
    setSelectedAdminUsers: (users: AdminUserModel[]) => {
      AdminUserManagementStore.selectedAdminUsers = users;
    },
    setSearchQuery: (query: Partial<RequestAdminUser>) => {
      AdminUserManagementStore.searchQuery = {
        ...AdminUserManagementStore.searchQuery,
        ...query,
      };
    },
    resetAdminUserStore: () => {
      AdminUserManagementStore.adminUsers = [];
      AdminUserManagementStore.total = 0;
      AdminUserManagementStore.listLoading = false;
      AdminUserManagementStore.searchQuery = {
        nameOrEmail: '',
        status: '',
        role: '',
        startDate: sub(currentDate, { days: 30 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
      };
    },
    setMarkAnyUsers: (users: TOption[]) => {
      AdminUserManagementStore.markAnyUsers = users;
    },
    setUsers: (users: TOption[]) => {
      AdminUserManagementStore.users = users;
    },
  };
  return store;
}

const AdminUserManagementStore = proxy<AdminUserStoreType>(adminUserStore());
devtools(AdminUserManagementStore, {
  name: 'ADMIN_USER_MANAGE_STORE',
});

export default AdminUserManagementStore;
