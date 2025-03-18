import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  UserDetails,
  UserManagementStore,
  CreateUser,
  CreateUserSchema,
  QUERY_KEY,
} from '@web-workspace/api-bo/components/user-management/data';
import { ApiResponseStatus } from '@web-workspace/api-bo/common/model';
import { useMemo } from 'react';
import {
  formatedTimezone,
  getLocalTimeZone,
} from '@web-workspace/shared/helpers/dates';
import { TimeZones } from '@web-workspace/api-bo/components/admin-dashboard/data';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const useCreateUserData = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(UserManagementStore);
  const currentTimezone = useMemo(() => {
    const { localTz } = getLocalTimeZone();
    const { timeZone } = formatedTimezone(localTz);

    const timeZoneObject = TimeZones.find((el) => el.value === timeZone);
    return timeZoneObject?.value;
  }, []);

  const { mutateAsync: onCreateAsync, isLoading: loading } = useMutation(
    (data: Partial<UserDetails>) => {
      const reqData = {
        accountName: data.accountName,
        email: data.email,
        subscriptionTier: data.subscriptionTier,
        zoneId: data.zoneId,
      };

      return CreateUser(reqData);
    },
    {
      onSuccess: (response, variables) => {
        const reqData = variables;
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          // Refresh the api list in page 0
          if (searchQuery.page != 0) {
            setSearchQuery({ page: 0 });
          } else {
            queryClient.invalidateQueries(QUERY_KEY.ADMIN_DASHBOARD);
          }
          dialogStore.openDialog({
            name: DialogType.CsApiBoAdminEditUser,
            props: {
              createdUser: reqData,
            },
          });
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
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      accountName: '',
      email: '',
      zoneId: currentTimezone,
      subscriptionTier: 'Free',
      companyName: '',
    },
  });

  const onSubmit = async (data: Partial<UserDetails>) => {
    await onCreateAsync({ ...data });
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

export default useCreateUserData;
