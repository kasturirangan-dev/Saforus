import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  RequestUserCredit,
  ResponseUserCredit,
  UserCreditModel,
} from './interface';
import { randomId } from '@web-workspace/shared/helpers/strings';

interface AdminUserCreditStoreType {
  userCredits: UserCreditModel[] | null;
  total: number;
  listLoading: boolean;
  searchQuery: Partial<RequestUserCredit>;
  setSearchQuery: (query: Partial<RequestUserCredit>) => void;
  setUserCredits: (data: ResponseUserCredit | null) => Promise<void>;
  resetAdminUserCreditStore: () => void;
}

function adminUserCreditStore() {
  const currentDate = new Date();

  const store: AdminUserCreditStoreType = {
    userCredits: [],
    total: 0,
    listLoading: false,
    setUserCredits: async (response?: ResponseUserCredit | null) => {
      if (
        response &&
        response?.elementList &&
        response?.elementList?.length > 0
      ) {
        AdminUserCreditStore.userCredits = response?.elementList?.map((el) => {
          return {
            ...el,
            id: randomId(),
            userId: el?.id ? el?.id : randomId(),
          } as any;
        });
      } else {
        AdminUserCreditStore.userCredits = [];
      }

      if (response?.totalElements !== AdminUserCreditStore.total) {
        AdminUserCreditStore.total = response?.totalElements ?? 0;
      }
    },
    searchQuery: {
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<RequestUserCredit>) => {
      AdminUserCreditStore.searchQuery = {
        ...AdminUserCreditStore.searchQuery,
        ...query,
      };
    },
    resetAdminUserCreditStore: () => {
      AdminUserCreditStore.userCredits = [];
      AdminUserCreditStore.total = 0;
      AdminUserCreditStore.listLoading = false;
      AdminUserCreditStore.searchQuery = {
        pageNo: 0,
        elementPerPage: 10,
      };
    },
  };
  return store;
}

const AdminUserCreditStore = proxy<AdminUserCreditStoreType>(adminUserCreditStore());
devtools(AdminUserCreditStore, {
  name: 'ADMIN_USER_CREDIT_STORE',
});

export default AdminUserCreditStore;
