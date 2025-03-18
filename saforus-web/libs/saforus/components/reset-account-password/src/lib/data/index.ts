/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPassword, newPasswordValidationSchema } from "./utils";
import useUserNewPasswordServiceApi from "./api";
import { useState } from "react";

export function useResetPasswordData() {
  const { putNewPassword } = useUserNewPasswordServiceApi();
  const [loading, setLoading] = useState(false);

  const { register, watch ,handleSubmit, formState: { errors } } = useForm<NewPassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(newPasswordValidationSchema)
  });
  const onSubmit = async (data: any, token?: string, email?: string) => {
    setLoading(true);
    const reqdata = {
      newPassword: data.password,
      jwt: token,
    };

    const response = await putNewPassword(reqdata, email).then((data) => {
      return data;
    });

    setLoading(false);
    return response;
  }
  return {
    handleSubmit,
    onSubmit,
    watch,
    errors,
    register,
    loading,
  };
};