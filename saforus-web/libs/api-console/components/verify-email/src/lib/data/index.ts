import { IActivationRequest } from '../interface';
import useVerificationEmailServiceApi from './api';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

export function useAccountActivateData(token: string) {
  const { postVerificationEmail } = useVerificationEmailServiceApi();
  const [loading, setLoading] = useState(false);

  let isTokenExpired = false;
  if (token) {
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      isTokenExpired = decodedToken.exp < currentTime;
    }
  }

  const onSubmit = async (activationInfo: IActivationRequest) => {
    setLoading(true);
    const response = await postVerificationEmail(activationInfo).then((data) => {
      return data;
    });

    setLoading(false);
    return response;
  };
  return {
    onSubmit,
    loading,
    isTokenExpired
  };
}
