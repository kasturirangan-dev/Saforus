import {
  QUERY_KEY,
  updateUserAvatar,
  deleteUserAvatar,
} from '@web-workspace/api-console/components/my-account/data';
import { useMutation, useQueryClient } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';

export const useUserAvatarData = (onClose: () => void) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutate: uploadAvatar, isLoading: isUploadAvatarLoading } =
    useMutation(updateUserAvatar, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
        showToast.success(t('apiAccount.avatar-editor.success'));
        onClose();
      },
      onError(error, variables, context) {
        showToast.error(t('apiAccount.avatar-editor.fail'));
      },
    });

  const { mutate: deleteAvatar, isLoading: isDeleteAvatarLoading } =
    useMutation(deleteUserAvatar, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
        showToast.success(t('apiAccount.avatar-editor.delete-success'));
        onClose();
      },
      onError: (error, variables, context) => {
        showToast.error(t('apiAccount.avatar-editor.delete-fail'));
      },
    });

  return {
    uploadAvatar,
    isUploadAvatarLoading,
    deleteAvatar,
    isDeleteAvatarLoading,
  };
};
