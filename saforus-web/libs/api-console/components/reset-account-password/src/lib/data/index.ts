/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPassword, newPasswordValidationSchema } from './utils';
import jwt_decode from 'jwt-decode';
import useUserNewPasswordServiceApi from './api';

import { useState } from 'react';

export function useResetPasswordData(token?: string) {
  const { putNewPassword } = useUserNewPasswordServiceApi();
  const [loading, setLoading] = useState(false);

  let email = '';
  if (token) {
    const decodedToken: any = jwt_decode(token);
    email = decodedToken.email;
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(newPasswordValidationSchema),
  });
  const onSubmit = async (data: any, token?: string) => {
    setLoading(true);
    const reqdata = {
      newPassword: data.password,
      jwt: token,
    };

    const response = await putNewPassword(reqdata).then((data) => {
      return data;
    });

    setLoading(false);
    return response;
  };
  return {
    handleSubmit,
    onSubmit,
    watch,
    errors,
    register,
    loading,
    email,
  };
}
