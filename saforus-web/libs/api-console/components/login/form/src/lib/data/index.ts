/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login, loginValidationSchema } from './utils';
import useUserLoginServiceApi from './api';
import jwt_decode from 'jwt-decode';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { ILoginInfoRequest, UserTokenInfo } from '../interface';
import { useMutation } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { useNavigate } from 'react-router-dom';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import { t } from 'i18next';
import { useSearchParams } from 'react-router-dom';
import { getReturnPath } from '@web-workspace/shared/helpers/routes';

export function useLoginData() {
  const [searchParams] = useSearchParams();
  const returnPath = getReturnPath(searchParams);

  const navigate = useNavigate();
  const { setIsLogIn, setUserInfo, setUserPassword } =
    useSnapshot(CsApiAuthStore);
  const { postLogin } = useUserLoginServiceApi();

  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess(response: any, request: ILoginInfoRequest) {
      if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
        const tokenContent = decodeToken(response.data.token) as UserTokenInfo;
        const userInfo = {
          ...tokenContent,
          id: tokenContent.sub,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        };

        setExpriedTime(tokenContent.exp);
        setUserInfo(userInfo);
        // SET current password
        setUserPassword(request.password);

        setIsLogIn(true);
        navigate(returnPath ?? API_ROUTES.INSERT_WATERMARK.path, {
          replace: true,
        });
      } else if (response?.code === 'CSA1104') {
        showToast.error(t('api.login.401005'), {
          delay: 0,
        });
      } else if (response.code === 'CSA1111') {
        showToast.error(t('api.login.CSA11111'), {
          delay: 0,
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
