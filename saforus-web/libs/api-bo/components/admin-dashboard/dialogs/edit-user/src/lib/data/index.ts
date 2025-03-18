import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  UserDetails,
  AdminDashboardStore,
  QUERY_KEY,
  EditUser,
  EditUserSchema,
} from '@web-workspace/api-bo/components/admin-dashboard/data';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const useUserEditData = ({
  slectedUser,
  onClose,
}: {
  slectedUser: UserDetails;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(AdminDashboardStore);

  const { mutateAsync: onEditAsync, isLoading: loading } = useMutation(
    
    (data: Partial<UserDetails>) => {
      const reqData = {
        accountName: data.accountName,
        roles: data.roles,
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
      roles: slectedUser.roles,
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
