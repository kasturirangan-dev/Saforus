import { useSnapshot } from 'valtio';
import MyAccountStore, {
  ProfileInfomation,
} from '@web-workspace/api-console/components/my-account/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useEffect } from 'react';

const useLayoutData = () => {
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const { profile, setProfile } = useSnapshot(MyAccountStore);

  useEffect(() => {
    if (userInfo?.id && profile.id != userInfo?.id) {
      setProfile({
        ...profile,
        id: userInfo.id,
        email: userInfo.email,
        accountName: userInfo.accountName,
        avatarUrl: userInfo.avatarUrl,
        zoneId: userInfo.zoneId,
      } as ProfileInfomation);
    }
  }, [profile.id, userInfo?.id]);

  return {
    isLoading: false,
  };
};

export default useLayoutData;
