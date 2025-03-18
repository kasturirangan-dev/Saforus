import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ReActivationEmail, reActivationEmailValidationSchema } from "./utils";
import { useState } from "react";
import useResendEmailServiceApi from "./reactive-api";

export function useResendEmailData() {
  const { getResendEmail } = useResendEmailServiceApi();
  const [loading, setLoading] = useState(false);
  const [resultResendEmail, setResultResendEmail] = useState<any | null>();

  const { register, handleSubmit, formState: { errors } } = useForm<ReActivationEmail>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(reActivationEmailValidationSchema)
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await getResendEmail(data.email).then((data) => {
      return data;
    });

    setLoading(false);
    setResultResendEmail(response);
  }
  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    loading,
    resultResendEmail,
  };
};