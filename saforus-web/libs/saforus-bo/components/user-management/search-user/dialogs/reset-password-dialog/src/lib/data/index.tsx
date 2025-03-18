import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResetPassword,
  ResetPasswordValidationSchema,
  putResetPassword,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

interface DataProps {
  onClose: () => void;
  fullName: string;
  email: string;
}

const HandleEvenResetPassword = ({ onClose, fullName, email }: DataProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    getValues,
  } = useForm<Partial<ResetPassword>>({
    resolver: yupResolver(ResetPasswordValidationSchema),
    defaultValues: {
      userName: fullName,
      email: email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: Partial<ResetPassword>) => {
    const reqData = {
      jwt: BoAuthStore.token,
      newPassword: data.password,
    };

    putResetPassword(data.email ?? '', reqData).then((res) => {
      if (res.isSuccess === false) {
        showToast.error(`${t(res.data.messageKey)}`, {
          delay: 0,
        });
      } else {
        showToast.success(
          `${t(
            'userManagement.search-user.user-detail.dialogs.reset-password-success'
          )}`,
          {
            delay: 0,
          }
        );
      }
    });
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleKeyPress,
    watch,
    setError,
  };
};

export default HandleEvenResetPassword;
