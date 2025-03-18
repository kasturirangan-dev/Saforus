/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login, loginValidationSchema } from './utils';
import useUserLoginServiceApi from './api';
import jwt_decode from 'jwt-decode';
import { useSnapshot } from 'valtio';
import CsApiBoAuthStore, {
  UserMode,
} from '@web-workspace/shared/hooks/use-csapi-bo-auth';
import { PATTERN } from '@web-workspace/api-bo/constants/validation';
import { ILoginInfoRequest } from '../interface';
import { UserTokenInfo } from '../interface';
import { useMutation } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import { useNavigate } from 'react-router-dom';
import { ApiResponseStatus } from '@web-workspace/api-bo/common/model';

export function useLoginData() {
  const navigate = useNavigate();
  const { setIsLogIn, setUserInfo, setUserPassword } =
    useSnapshot(CsApiBoAuthStore);
  const { postLogin } = useUserLoginServiceApi();

  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess(response: any, request: ILoginInfoRequest) {
      if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
        setIsLogIn(true);
        const domain = request.email.split('@').pop() || '';
        const isMaster = !PATTERN.MARK_ANY_DOMAIN.includes(
          domain.toLowerCase()
        );
        const tokenContent = decodeToken(response.data.token) as UserTokenInfo;

        const userInfo = {
          ...tokenContent,
          id: tokenContent.sub,
          token: response.data.token,
          master: isMaster,
          devMode: false,
        } as UserMode;

        setExpriedTime(tokenContent.exp);
        setUserInfo(userInfo);
        // SET current password
        setUserPassword(request.password);

        navigate(API_BO_ROUTES.USER_MANAGEMENT.MANAGE_ACCOUNT.path, {
          replace: true,
        });
      } else {
        showToast.error(response?.msg, {
          delay: 0,
        });
      }
    },
  });

  const setExpriedTime = (exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const maxTimeExpired = currentTime + 24 * 60 * 60;

    if (exp > maxTimeExpired) {
      localStorage.setItem('Expired', `${maxTimeExpired}`);
    } else {
      localStorage.setItem('Expired', `${exp}`);
    }
  };

  const decodeToken = (token: string) => {
    return jwt_decode(token);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: ILoginInfoRequest) => {
    mutate(data);
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    watch,
    isLoading,
  };
}
