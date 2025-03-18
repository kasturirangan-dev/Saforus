import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import {
  AdminUserManagementStore,
  AdminUserModel,
  QUERY_ADMIN_KEY,
  UpdateAdminUserModel,
  UpdateAdminUserSchema,
  updateAdminUser,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

const useUpdateAdminUsersData = ({
  onClose,
  adminUser,
}: {
  onClose: () => void;
  adminUser: AdminUserModel;
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { searchQuery } = useSnapshot(AdminUserManagementStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    getValues,
    setValue,
    control,
  } = useForm<Partial<UpdateAdminUserModel>>({
    resolver: yupResolver(UpdateAdminUserSchema),
    defaultValues: {
      email: adminUser.email,
      type: adminUser.role,
      name: adminUser.fullName,
      status: adminUser.status,
      resetPassword: false,
    },
  });

  const onSubmit = async (data: Partial<UpdateAdminUserModel>) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // const test = await updateAdminUser({ userInfo: data });
    // if (test?.data?.isSuccess) {
    //   showToast.warning(`${t('team-member.message.remove-member-successful')}`, {
    //     delay: 0,
    //   });
    // } else {
    //   showToast.error(`${t('team-member.message.remove-member-successful')}`, {
    //     delay: 0,
    //   });
    // }

    // queryClient.invalidateQueries([
    //   QUERY_ADMIN_KEY.VIEW_ADMIN_USER_LIST,
    //   ...Object.values(searchQuery),
    // ]);
    // onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleKeyPress,
    watch,
    setError,
    control,
    getValues,
    setValue,
  };
};

export default useUpdateAdminUsersData;
