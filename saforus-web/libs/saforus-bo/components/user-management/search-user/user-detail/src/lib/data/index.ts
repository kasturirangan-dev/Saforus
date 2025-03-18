import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { deleteUser } from '@web-workspace/saforus-bo/components/user-management/search-user/data';

const useAccountUserData = ({ onClose }: { onClose: () => void }) => {
  const onDeleteAccount = async (userId: number) => {
    const res = await deleteUser(userId);
    if (res?.resultCode in [200, 299]) {
      showToast.success('Delete user successfully',
        {
          delay: 0,
        }
      );
    } else {
      showToast.error(
        'Delete user failed',
        {
          delay: 0,
        }
      );
    }

    onClose();
  }

  return {
    onDeleteAccount
  };
};

export default useAccountUserData;
