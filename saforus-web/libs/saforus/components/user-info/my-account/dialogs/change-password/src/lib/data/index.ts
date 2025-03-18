import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import * as yup from 'yup';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import useUserNewPasswordServiceApi from './api';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useTranslation } from 'react-i18next';

export const ChangePasswordValidationSchema = yup
  .object({
    currentPassword: yup.string(),
    password: yup
      .string()
      .required('error-message.new-password-required')
      .min(8, ' ')
      .matches(PATTERN.NUMBER_LEAST, ' ')
      .matches(PATTERN.UP_LOWER_CASE_LEAST, ' ')
      .matches(PATTERN.SYMBOL_LEAST, ' ')
      .matches(
        PATTERN.NOT_CONTAIN_SPACE,
        'error-message.password-not-contain-space'
      )
      .notOneOf(
        [yup.ref('currentPassword')],
        'error-message.password-must-different'
      ),
    confirmPassword: yup
      .string()
      .required('error-message.confirm-password-required')
      .min(8, ' ')
      .matches(PATTERN.NUMBER_LEAST, ' ')
      .matches(PATTERN.UP_LOWER_CASE_LEAST, ' ')
      .matches(PATTERN.SYMBOL_LEAST, ' ')
      .oneOf([yup.ref('password')], 'error-message.new-password-must-match'),
  })
  .required();

export type ChangePassword = yup.InferType<
  typeof ChangePasswordValidationSchema
>;

type DataProps = {
  currentPassword: string;
  onResult: (result: boolean) => void;
  onClose: () => void;
};

const useChangePasswordDialogData = ({
  currentPassword,
  onResult,
  onClose,
}: DataProps) => {
  const { t } = useTranslation();
  const { putNewPassword } = useUserNewPasswordServiceApi();
  const [loading, setLoading] = useState(false);

  const changePassword = async (data: Partial<ChangePassword>) => {
    try {
      setLoading(true);
      const reqdata = {
        oldPassword: currentPassword,
        newPassword: data.password,
        jwt: AuthStore.token,
      };

      const response = await putNewPassword(
        reqdata,
        AuthStore.userInfo?.email
      ).then((data) => {
        return data;
      });

      if (response.isSuccess === false) {
        showToast.error(`${t(response.data.messageKey)}`, {
          delay: 0,
        });
      } else {
        onResult(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Partial<ChangePassword>>({
    resolver: yupResolver(ChangePasswordValidationSchema),
    defaultValues: {
      currentPassword: currentPassword,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: Partial<ChangePassword>) => {
    await changePassword(data);
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
