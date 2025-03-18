import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import MyAccountStore, {
  ProfileInfomation,
  QUERY_KEY,
  UserProfileSchema,
} from '@web-workspace/api-console/components/my-account/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { updateUserInfo } from '@web-workspace/api-console/components/my-account/data';
import { useTranslation } from 'react-i18next';

const useEditProfileData = ({ onClose }: { onClose: () => void }) => {
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const userId = userInfo?.id || '';
  const { profile } = useSnapshot(MyAccountStore);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutateAsync: onEditAsync, isLoading: isSaving } = useMutation(
    (data: Partial<ProfileInfomation>) => {
      return updateUserInfo(userId, data);
    },
    {
      onSuccess: (response) => {
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
          showToast.success(t('apiAccount.edit-timezone.success'));
        } else {
          showToast.error(t('apiAccount.edit-timezone.fail'));
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    getValues,
    setValue,
    control,
  } = useForm<Partial<ProfileInfomation>>({
    resolver: yupResolver(UserProfileSchema),
    defaultValues: {
      zoneId: profile.zoneId,
    },
  });

  const onSubmit = async (data: Partial<ProfileInfomation>) => {
    await onEditAsync(data);
    onClose();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    watch,
    setError,
    control,
    getValues,
    setValue,
    isSaving,
  };
};

export default useEditProfileData;
