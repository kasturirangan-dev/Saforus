/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login, loginValidationSchema } from './utils';
import useUserLoginServiceApi from './api';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import AuthStore, { UserMode } from '@web-workspace/shared/hooks/use-auth';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { UserTokenInfo } from '../interface';
import useSubscription, {
  SubscriptionPlanDetail,
} from '@web-workspace/shared/hooks/use-subscription';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useTranslation } from 'react-i18next';

export function useLoginData() {
  const { setIsLogIn, setUserInfo, setUserPassword } = useSnapshot(AuthStore);
  const [loading, setLoading] = useState(false);
  const { postLogin } = useUserLoginServiceApi();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema),
  });

   const mapLoginToRequest = (data: Login) => ({
     email: data.email,
     password: data.password,
     teamInvitationToken: data?.teamInvitationToken ?? null,
     awsToken: data?.awsToken ?? null,
     googleToken: data?.googleToken ?? null,
   });

  const handleRegisterAccount = (res: any) => {
    // navigate(ROUTES.REGISTER.path, {
    //   replace: true,
    //   state: {
    //     googleName: res.data.data.name,
    //     googleEmail: res.data.data.email,
    //     googleToken: res.data.data.token,
    //   },
    // });
    showToast.error(`${t('api.login.unregistered')}`, {
      delay: 0,
    });
  };

   const handleSuccessfulLogin = (
     res: any,
     reqdata: any,
     isGoogleLogin: boolean
   ) => {
     setIsLogIn(true);
     const domain = isGoogleLogin
       ? res.data.data.authenticationData.email.split('@').pop()
       : reqdata.email.split('@').pop() || '';
     const isMaster = !PATTERN.MARK_ANY_DOMAIN.includes(domain.toLowerCase());
     const userInfo = {
       ...res.data.data,
       master: isMaster,
       devMode: false,
       ...(isGoogleLogin && { ...res.data.data.authenticationData }),
     } as UserMode;

     setExpriedTime(userInfo.token);
     setUserInfo(userInfo);
     setUserPassword(reqdata.password);
     setSubscription(userInfo);
     logEventAnalytics(TrackingEvent.User_Logged);
   };

   const onSubmit = async (data: Login) => {
     setLoading(true);
     const reqdata = mapLoginToRequest(data);
     const isGoogleLogin = data?.isGoogleLogin ?? false;

     try {
       const res = await postLogin(reqdata, isGoogleLogin);
      if (res.data?.data?.action === 'REGISTER_ACCOUNT') {
        handleRegisterAccount(res);
      } else if (res.isSuccess) {
        handleSuccessfulLogin(res, reqdata, isGoogleLogin);
      } else {
        setUserInfo();
        setIsLogIn(false);
      }
       return res;
     } catch (error) {
       console.error('Login failed', error);
       setUserInfo();
       setIsLogIn(false);
     } finally {
       setLoading(false);
     }
   };

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

  const { setSubscriptionData } = useSnapshot(useSubscription);
  const setSubscription = (userInfo: UserMode) => {
    const subscriptionPlanDetailList = userInfo?.subscriptionPlanDetailList;
    const subscriptionPlanStatus = userInfo?.subscriptionPlanStatus;

    setSubscriptionData(
      subscriptionPlanDetailList?.[0] as SubscriptionPlanDetail,
      subscriptionPlanStatus || ''
    );
  };
  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    loading,
  };
}
