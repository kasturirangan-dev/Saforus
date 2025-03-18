import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useResetPasswordData } from './data';
import SentEmailView from './view';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type SentEmailProps = {
  userInfo: any;
  blocked: boolean;
  failed: boolean;
};
const SentEmailContainer: React.FC<SentEmailProps> = ({
  userInfo,
  blocked,
  failed,
}) => {
  const { t } = useTranslation();
  const [isResetPasswordCapacityReached, setIsResetPasswordCapacityReached] =
    useState(false);

  const { onSubmit, loading } = useResetPasswordData();
  const onClickSubmit = async () => {
    const res = await onSubmit(userInfo);
    if (res.isSuccess === false) {
      if (res.data)
        if (res.data.status === 401017) {
          setIsResetPasswordCapacityReached(true);
        }

      showToast.error(`${t(res.data.messageKey)}`, {
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
      userInfo={userInfo}
      blocked={blocked}
      failed={failed}
      isResetCapacityReached={isResetPasswordCapacityReached}
    />
  );
};

export default SentEmailContainer;
