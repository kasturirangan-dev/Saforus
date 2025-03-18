import { useTranslation } from 'react-i18next';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

import { useResetPasswordData } from './data';
import NewPasswordFormView from './view';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ResetPasswordFormProps {
  token?: string;
}

export function NewPasswordForm(props: ResetPasswordFormProps) {
  const { token } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleSubmit, onSubmit, watch, register, errors, loading, email } =
    useResetPasswordData(token);
  const onClickSubmit = async (data: any) => {
    const res = await onSubmit(data, token);
    if (res.data.msg !== 'OK') {
      showToast.error(`${t(res?.data.msg)}`, {
        delay: 0,
      });
    } else {
      navigate(API_ROUTES.RESET_DONE.path);
    }
  };

  return (
    <NewPasswordFormView
      handleSubmit={handleSubmit}
      onSubmit={onClickSubmit}
      register={register}
      watch={watch}
      errors={errors}
      loading={loading}
      email={email}
    />
  );
}

export default NewPasswordForm;
