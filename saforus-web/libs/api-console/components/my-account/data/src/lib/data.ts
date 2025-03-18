import { QUERY_KEY, getUserDetail } from './api';
import { useQuery } from 'react-query';
import { useSnapshot } from 'valtio';
import MyAccountStore from './store';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';

export function useMyAccountData() {
  const { userInfo, updateProfile } = useSnapshot(CsApiAuthStore);
  const userId = userInfo?.id || '';

  const { setProfile } = useSnapshot(MyAccountStore);

  const { isFetching: isMyAccountLoading } = useQuery({
    queryKey: QUERY_KEY.MY_ACCOUNT,
    enabled: Boolean(userId),
    queryFn: async () => {
      return getUserDetail(userId);
    },
    onSuccess: (response) => {
      setProfile(response?.data || {});
      // Synce profile data to auth store
      updateProfile(response?.data || {});
    },
  });

  return {
    isMyAccountLoading,
  };
}
