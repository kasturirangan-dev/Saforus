import { proxy } from 'valtio';
import { UserDetails, SearchQuery, UserData } from './interface';
import { devtools } from 'valtio/utils';

export interface UserDetailsState {
  searchQuery: SearchQuery;
  totalUsers: number;
  userData: UserDetails[];

  setSearchQuery: (query: Partial<SearchQuery>) => void;
  setUsersData(data: UserData): void;
}

function createUserDetailsStore() {
  const store: UserDetailsState = {
    searchQuery: {
      page: 0,
      size: 10,
    },
    totalUsers: 0,
    userData: [],

    setSearchQuery: (query) => {
      UserManagementStore.searchQuery = {
        ...UserManagementStore.searchQuery,
        ...query,
      };
    },
    setUsersData(data) {
      UserManagementStore.totalUsers = data?.total;
      UserManagementStore.userData = data?.records;
    },
  };
  return store;
}
export const UserManagementStore = proxy<UserDetailsState>(createUserDetailsStore());

devtools(UserManagementStore, { name: 'CS_BO_ADMIN_DASHBOARD_STORE' });
