import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPassword, resetPasswordValidationSchema } from './utils';
import useUserResetPasswordServiceApi from './api';
import { useMutation } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';

export function useResetPasswordData(
  onSuccessCallback: (response: any) => void
) {
  const { getResetPassword } = useUserResetPasswordServiceApi();
  const { t } = useTranslation();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    getResetPassword,
    {
      onSuccess: (response) => {
        if (response && !response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          if (response.code === "CSA1100") {
            showToast.error(
              `${t('api.reset-password.CSA1100')}`,
              { delay: 0 }
            );
          } else {
            showToast.error(response?.msg, { delay: 0 });
          }
        } else {
          onSuccessCallback(response);
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const onSubmit = (data: ResetPassword) => {
    mutate({ email: data.email });
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    isLoading,
    isError,
    isSuccess,
  };
}
