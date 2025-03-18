import { useQuery } from 'react-query';
import { QUERY_KEY, fetchApiKey } from './api';
import { useSnapshot } from 'valtio';
import { ApiKeyStore } from './store';
import { ApiKeyData } from './interface';
import { differenceDays } from '@web-workspace/shared/helpers/dates';

export const useApiKeyData = () => {
  const { searchQuery, setApiKeys, setSearchQuery } = useSnapshot(ApiKeyStore);

  const isNeverExpireKey = (expiredDate: Date) => {
    const dayLeft = differenceDays(new Date(), expiredDate);
    return dayLeft > 36500; // 100 years
  };

  const { isFetching } = useQuery(
    [QUERY_KEY.API_KEY, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        page: searchQuery.page,
        pageSize: searchQuery.pageSize,
      };
      return fetchApiKey(reqData);
    },
    {
      onSuccess: (response) => {
        const resData = response?.data as ApiKeyData;

        const records =
          resData?.records?.map((e) => ({
            ...e,
            neverExpire: isNeverExpireKey(e.expiredAt),
          })) || [];

        setApiKeys({
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
