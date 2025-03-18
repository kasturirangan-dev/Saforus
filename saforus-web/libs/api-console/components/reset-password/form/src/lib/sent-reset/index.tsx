import React from 'react';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useResetPasswordData } from './data';
import SentEmailView from './view';
import { useTranslation } from 'react-i18next';

type SentEmailProps = {
  userEmail: string;
};

const SentEmailContainer: React.FC<SentEmailProps> = ({ userEmail }) => {
  const { t } = useTranslation();

  const { onSubmit, loading } = useResetPasswordData();

  const onClickSubmit = async () => {
    const res = await onSubmit(userEmail);
    if (res.msg !== 'OK') {
      showToast.error(res.msg, {
        delay: 0,
      });
    } else {
      showToast.success(`${t('page-reset.email-resent-successfully')}`, {
        closeOnClick: true,
      });
    }
  };

  return (
    <SentEmailView
      onSubmit={onClickSubmit}
      loading={loading}
      userEmail={userEmail}
    />
  );
};

export default SentEmailContainer;
