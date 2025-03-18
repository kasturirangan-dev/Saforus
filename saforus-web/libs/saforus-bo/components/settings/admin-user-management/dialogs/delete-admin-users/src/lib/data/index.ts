import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { AdminUserManagementStore, QUERY_ADMIN_KEY, deleteAdminUsers } from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

const useDeleteAdminUsersData = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { searchQuery, selectedAdminUsers } =
    useSnapshot(AdminUserManagementStore);

  const { mutate: onDeleteAdminUsers, isLoading: loading, error } = useMutation(deleteAdminUsers, {
    onSuccess: () => {
      showToast.warning(
        `${t('team-member.message.remove-member-successful', { size: selectedAdminUsers.length })}`,
        {
          delay: 0,
        }
      );
      queryClient.invalidateQueries([
        QUERY_ADMIN_KEY.VIEW_ADMIN_USER_LIST,
        ...Object.values(searchQuery),
      ]); onClose();
    },
  });

  const onSubmit = async () => {
    if (selectedAdminUsers.length > 0) {
      const memberIds = selectedAdminUsers.map((member) => member.userId) ?? [];
      await onDeleteAdminUsers({ memberIds: memberIds });
    }
    onClose();
  };

  return {
    onSubmit,
    error,
  };
};

export default useDeleteAdminUsersData;
