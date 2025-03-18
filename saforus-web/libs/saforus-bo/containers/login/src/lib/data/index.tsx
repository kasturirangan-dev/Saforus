import { yupResolver } from '@hookform/resolvers/yup';
import {
  ILoginInfoRequest,
  Login,
  login,
  loginValidationSchema,
} from '@web-workspace/saforus-bo/components/login-form/data';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import BoAuthStore, { UserMode } from '@web-workspace/shared/hooks/use-bo-auth';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';
import jwt_decode from 'jwt-decode';

// used for case change BO to FO without logout
export interface UserTokenInfo {
  sub: string;
  teamId: number;
  roles: string;
  iss: string;
  ipAddress: string;
  exp: number;
  userName: string;
  tokenType: string;
  iat: number;
  userId: number;
}
///////////////////////////////////

export function InitDataLoginForm() {
  // hooks declaration area
  const navigate = useNavigate();
  const { setIsLogIn, setUserInfo, setUserPassword } = useSnapshot(BoAuthStore);

  const { mutate, isLoading, error, data } = useMutation(login, {
    onSuccess(data: any, variables) {
      setIsLogIn(true);

      const domain = variables.email.split('@').pop() || '';
      // SET current password
      setUserPassword(data.password);

      const isMaster = !PATTERN.MARK_ANY_DOMAIN.includes(domain.toLowerCase());
      const userInfo = {
        ...data.data,
        master: isMaster,
        devMode: false,
      } as UserMode;

      // used for case change BO to FO without logout
      setExpriedTime(userInfo.token);
      ///////////////////////////////////////////////
      setUserInfo(userInfo);
      navigate(BO_ROUTES.ADMIN_DASHBOARD.FORENSIC_WATERMARKING.path);
    },
    onError(error: any) {
      showToast.warning(`${error.message}`);
    },
  });

  const setExpriedTime = (token: string) => {
    const tokenContent = decodeToken(token) as UserTokenInfo;

    const currentTime = Math.floor(Date.now() / 1000);
    const maxTimeExpired = currentTime + 24 * 60 * 60;

    if (tokenContent && tokenContent.exp > maxTimeExpired) {
      localStorage.setItem('Expired', `${maxTimeExpired}`);
    } else {
      localStorage.setItem('Expired', `${tokenContent.exp}`);
    }
  };

  const decodeToken = (token: string) => {
    return jwt_decode(token);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(loginValidationSchema),
  });
  /////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  const onSubmit = (data: ILoginInfoRequest) => {
    mutate(data);
    // eslint-disable-next-line no-console
    console.log('mutate', data);
  };
  /////////////////////////////////////////////////////////////////
  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
  };
}
