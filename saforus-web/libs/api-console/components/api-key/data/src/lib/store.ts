import { proxy } from 'valtio';
import { SearchQuery, ApiKeyDetails, ApiKeyData } from './interface';
import { devtools } from 'valtio/utils';

export interface ApiKeyState {
  searchQuery: SearchQuery;
  totalApiKeys: number;
  apiKeys: ApiKeyDetails[];

  setSearchQuery: (query: Partial<SearchQuery>) => void;
  setApiKeys(data: ApiKeyData): void;
}

function createApiKeyStore() {
  const store: ApiKeyState = {
    searchQuery: {
      page: 0,
      pageSize: 10,
    },
    totalApiKeys: 0,
    apiKeys: [],

    setSearchQuery: (query) => {
      ApiKeyStore.searchQuery = {
        ...ApiKeyStore.searchQuery,
        ...query,
      };
    },
    setApiKeys(data) {
      ApiKeyStore.totalApiKeys = data?.total;
      ApiKeyStore.apiKeys = data?.records;
    },
  };
  return store;
}

export const ApiKeyStore = proxy<ApiKeyState>(createApiKeyStore());

devtools(ApiKeyStore, { name: 'CS_API_KEY_STORE' });
