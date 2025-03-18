
import { useState } from "react";
import useUserResetPasswordServiceApi from "./api";

export function useResetPasswordData() {
  const { getResetPassword } = useUserResetPasswordServiceApi();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const reqdata = {
      fullName: data.fullName,
      email: data.email,
    };

    const response = await getResetPassword(reqdata).then((res) => {
      return res;
    });

    setLoading(false);
    return response;
  }
  return {
    onSubmit,
    loading,
  };
};