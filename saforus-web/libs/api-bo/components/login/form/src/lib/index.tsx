import React, { useEffect } from 'react';
import LoginFormView from './view';
import { useLoginData } from './data';
import { useSearchParams } from 'react-router-dom';

export function LoginForm() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  const {
    handleSubmit,
    onSubmit,
    register,
    setValue,
    watch,
    errors,
    isLoading,
  } = useLoginData();

  useEffect(() => {
    if (paramsAsObject?.email) {
      setValue('email', paramsAsObject?.email);
    }
  }, [paramsAsObject?.email]);

  return (
    <LoginFormView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loading={isLoading}
      watch={watch}
    />
  );
}

export default React.memo(LoginForm);
