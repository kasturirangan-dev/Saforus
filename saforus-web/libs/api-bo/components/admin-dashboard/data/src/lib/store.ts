// import { proxy } from 'valtio';
// import { SearchQuery, ApiKeyDetails, ApiKeyData } from './interface';
// import { devtools } from 'valtio/utils';

// export interface ApiKeyState {
//   searchQuery: SearchQuery;
//   totalApiKeys: number;
//   apiKeys: ApiKeyDetails[];

//   setSearchQuery: (query: Partial<SearchQuery>) => void;
//   setApiKeys(data: ApiKeyData): void;
// }

// function createApiKeyStore() {
//   const store: ApiKeyState = {
//     searchQuery: {
//       page: 0,
//       pageSize: 10,
//     },
//     totalApiKeys: 0,
//     apiKeys: [],

//     setSearchQuery: (query) => {
//       ApiKeyStore.searchQuery = {
//         ...ApiKeyStore.searchQuery,
//         ...query,
//       };
//     },
//     setApiKeys(data) {
//       ApiKeyStore.totalApiKeys = data?.total;
//       ApiKeyStore.apiKeys = data?.records;
//     },
//   };
//   return store;
// }

// export const ApiKeyStore = proxy<ApiKeyState>(createApiKeyStore());

// devtools(ApiKeyStore, { name: 'CS_API_KEY_STORE' });



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
      AdminDashboardStore.searchQuery = {
        ...AdminDashboardStore.searchQuery,
        ...query,
      };
    },
    setUsersData(data) {
      AdminDashboardStore.totalUsers = data?.total;
      AdminDashboardStore.userData = data?.records;
    },
  };
  return store;
}
export const AdminDashboardStore = proxy<UserDetailsState>(createUserDetailsStore());

devtools(AdminDashboardStore, { name: 'CS_BO_ADMIN_DASHBOARD_STORE' });
