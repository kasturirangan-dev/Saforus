/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPassword, resetPasswordValidationSchema } from "./utils";
import useUserResetPasswordServiceApi from "./api";
import { useState } from "react";

export function useResetPasswordData() {
  const { getResetPassword } = useUserResetPasswordServiceApi();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(resetPasswordValidationSchema)
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    const reqdata = {
      email: data.email,
    };

    const response = await getResetPassword(reqdata).then((data) => {
      return data;
    });

    setLoading(false);
    return response;
  }
  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    loading,
  };
};