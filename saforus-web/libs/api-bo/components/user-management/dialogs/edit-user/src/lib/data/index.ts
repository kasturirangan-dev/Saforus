import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  UserDetails,
  UserManagementStore,
  QUERY_KEY,
  EditUser,
  EditUserSchema,
} from '@web-workspace/api-bo/components/user-management/data';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { describe } from 'node:test';

const useUserEditData = ({
  slectedUser,
  onClose,
}: {
  slectedUser: UserDetails;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(UserManagementStore);

  const { mutateAsync: onEditAsync, isLoading: loading } = useMutation(
    
    (data: Partial<UserDetails>) => {
      const reqData = {
        accountName: data.accountName,
        companyName : data.companyName,
        description  : data.description ,
      };
      
      return EditUser(slectedUser.id, reqData);
    },
    {
      onSuccess: (response) => {
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          // Refresh the api list in page 0
          if (searchQuery.page != 0) {
            setSearchQuery({ page: 0 });
          } else {
            queryClient.invalidateQueries(QUERY_KEY.ADMIN_DASHBOARD);
          }
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
  } = useForm<Partial<UserDetails>>({
    resolver: yupResolver(EditUserSchema),
    defaultValues: {
      accountName: slectedUser.accountName,
      companyName : slectedUser.companyName,
      subscriptionTier: slectedUser.subscriptionTier,
      description  : slectedUser.description ,
    },
  });

  const onSubmit = async (data: Partial<UserDetails>) => {
    await onEditAsync({ ...data });
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
    loading,
  };
};

export default useUserEditData;
