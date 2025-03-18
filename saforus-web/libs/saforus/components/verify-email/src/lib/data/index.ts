import { IActivationRequest } from '../interface';
import useVerificationEmailServiceApi from './api';
import { useState } from 'react';

export function useAccountActivateData() {
  const { putVerificationEmail } =
    useVerificationEmailServiceApi();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (activationInfo: IActivationRequest) => {
    setLoading(true);
    const response = await putVerificationEmail(activationInfo).then((data) => {
      return data;
    });

    setLoading(false);
    return response;
  };
  return {
    onSubmit,
    loading,
  };
}
