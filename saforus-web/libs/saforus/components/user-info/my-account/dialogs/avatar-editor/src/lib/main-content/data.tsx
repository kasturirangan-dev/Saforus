import {
  deleteUserAvatar,
  updateUserAvatar,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useMutation, useQueryClient } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';

export const useMainContentData = (onClose: () => void) => {
  const { userInfo } = useSnapshot(AuthStore);
  const { id: userId } = userInfo || {};
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { mutate: uploadAvatar, isLoading: isUploadAvatarLoading } =
    useMutation(
      // Pass the userId and avatarFile as arguments to the updateUserAvatar function
      (file: File) => updateUserAvatar({ userId, file: file }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('MY_ACCOUNT');
          showToast.success(t('myaccount.avatar.sucessUpload'));
          onClose();
        },
        onError(error, variables, context) {
          showToast.warning(t('myaccount.avatar.failUpload'));
        }
      }
    );

  const { mutate: deleteAvatar, isSuccess: isDeleteAvatarSuccess } =
    useMutation(
      // Pass the userId as arguments to the deleteUserAvatar function
      () => deleteUserAvatar({ userId }),

      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('MY_ACCOUNT');
          showToast.success(t('myaccount.avatar.sucessDelete'));
          onClose();
        },
        onError(error, variables, context) {
          showToast.warning(`Delete avatar failed!`);
        },
      }
    );

  return {
    uploadAvatar,
    isUploadAvatarLoading,
    deleteAvatar,
    isDeleteAvatarSuccess,
  };
};
