import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

import { useResetPasswordData } from './data';
import NewPasswordFormView from './view';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ResetPasswordFormProps {
  token?: string;
  email?: string;
}

export function NewPasswordForm(props: ResetPasswordFormProps) {
  const { token, email } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleSubmit, onSubmit, watch, register, errors, loading } =
    useResetPasswordData();
  const onClickSubmit = async (data: any) => {
    const res = await onSubmit(data, token, email);
    if (res.isSuccess === false) {
      showToast.error(`${t(res.data.messageKey)}`, {
        delay: 0,
      });
    } else {
      navigate(ROUTES.RESET_DONE.path);
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
