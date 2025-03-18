import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useSnapshot } from 'valtio';
import MyAccountStore, {
  LIMIT_ENTER_CURRENT_PASSWORD,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import * as CryptoJS from 'crypto-js';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export const ChangePasswordValidationSchema = yup
  .object({
    currentPassword: yup.string(),
  })
  .required();

export type ChangePassword = yup.InferType<
  typeof ChangePasswordValidationSchema
>;

type DataProps = {
  onContinue: (result: boolean, currentPassword?: string) => void;
  onClose: () => void;
};

const useChangePasswordDialogData = ({ onContinue, onClose }: DataProps) => {
  const { incorrectPasswordCount, setIncorrectPasswordCount } =
    useSnapshot(MyAccountStore);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (incorrectPasswordCount >= LIMIT_ENTER_CURRENT_PASSWORD) {
      onContinue(false);
    }
  }, [incorrectPasswordCount]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Partial<ChangePassword>>({
    resolver: yupResolver(ChangePasswordValidationSchema),
    defaultValues: {
      currentPassword: '',
    },
  });

  const onSubmit = async (data: Partial<ChangePassword>) => {
    const currentPass = AuthStore.password;

    const key = getEnvVar('VITE_SAFORUS');
    const hashPwd = CryptoJS.HmacSHA512(data.currentPassword ?? '' ?? '', key);
    const newPassword = hashPwd.toString(CryptoJS.enc.Hex);

    if (currentPass !== newPassword) {
      setIncorrectPasswordCount(incorrectPasswordCount + 1);
      setError('currentPassword', {
        type: 'manual',
        message: 'error-message.enter-current-password-count',
      });
      return;
    }
    onContinue(true, data?.currentPassword);
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
    loading,
    setError,
  };
};

export default useChangePasswordDialogData;
