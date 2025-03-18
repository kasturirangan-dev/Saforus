import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useResetPasswordData } from './data';
import SentEmailDialogView from './view';
import { useTranslation } from 'react-i18next';

type SentEmailDialogProps = {
  onClose: () => void;
  userInfo: any;
  navigate: any;
  blocked?: boolean;
  failed?: boolean;
};
const SentEmailDialogContainer: React.FC<SentEmailDialogProps> = ({
  onClose,
  userInfo,
  navigate,
  blocked,
  failed,
}) => {
  const { t } = useTranslation();

  const { onSubmit, loading } = useResetPasswordData();
  const onClickSubmit = async () => {
    const res = await onSubmit(userInfo);
    if (res.isSuccess === false) {
      if (res.data)
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
    <SentEmailDialogView
      onSubmit={onClickSubmit}
      onClose={onClose}
      loading={loading}
      userInfo={userInfo}
      navigate={navigate}
      blocked={blocked}
      failed={failed}
    />
  );
};

export default SentEmailDialogContainer;
