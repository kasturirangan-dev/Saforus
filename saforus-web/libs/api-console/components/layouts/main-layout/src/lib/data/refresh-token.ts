import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { refreshToken } from './api';
import { useMutation } from 'react-query';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import jwt_decode from 'jwt-decode';

const useRefreshTokenData = () => {
  const { userInfo, setUserInfo } = useSnapshot(CsApiAuthStore);

  const { mutate: refreshTokenMutation } = useMutation({
    mutationFn: () => {
      if (userInfo?.refreshToken) {
        return refreshToken(userInfo.refreshToken);
      }
      return Promise.reject(new Error('No refresh token available'));
    },
    onSuccess: (response) => {
      if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
        const tokenContent = decodeToken(response.data.token) as object;
        const updateUser = {
          ...userInfo,
          ...tokenContent,
          token: response.data.token,
        };
        setUserInfo(updateUser);
      }
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
    },
  });

  const decodeToken = (token: string) => {
    return jwt_decode(token);
  };

  return {
    refreshToken: refreshTokenMutation,
  };
};

export default useRefreshTokenData;
