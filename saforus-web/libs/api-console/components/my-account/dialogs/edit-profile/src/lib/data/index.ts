import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import MyAccountStore, {
  ProfileInfomation,
  QUERY_KEY,
} from '@web-workspace/api-console/components/my-account/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import {
  updateUserInfo,
  deactivateAccount,
} from '@web-workspace/api-console/components/my-account/data';
import { editProfileValidation } from './validation';

const useEditProfileData = ({
  onClose,
  handleLogout,
}: {
  onClose: () => void;
  handleLogout: () => void;
}) => {
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const userId = userInfo?.id || '';
  const { profile } = useSnapshot(MyAccountStore);
  const queryClient = useQueryClient();

  const { mutateAsync: onEditAsync, isLoading: isSaving } = useMutation(
    (data: Partial<ProfileInfomation>) => {
      return updateUserInfo(userId, data);
    },
    {
      onSuccess: (response) => {
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
        } else {
          showToast.error(response?.msg || 'Error');
        }
      },
    }
  );

  const { mutateAsync: deactivateAsync, isLoading: isDeactivating } =
    useMutation(
      () => {
        return deactivateAccount();
      },
      {
        onSuccess: (response) => {
          if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
            handleLogout();
          } else {
            showToast.error(response?.msg || 'Error');
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
    resolver: yupResolver(editProfileValidation),
    defaultValues: {
      accountName: profile.accountName,
      companyName: profile.companyName,
      phone: profile.phone,
    },
  });

  const onSubmit = async (data: Partial<ProfileInfomation>) => {
    await onEditAsync(data);
    onClose();
  };

  const onDeactivate = async () => {
    await deactivateAsync();
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
    onDeactivate,
    isDeactivating,
  };
};

export default useEditProfileData;
