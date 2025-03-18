import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import {
  QUERY_KEY,
  removeTeamMember,
  UserTeamStore,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
const useRemoveMemberData = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { selectedMembers, currentTeamId, searchQuery } =
    useSnapshot(UserTeamStore);

  const {
    mutate: onRemoveTeamMember,
    isLoading: loading,
    error,
  } = useMutation(removeTeamMember, {
    onSuccess: () => {
      showToast.success(
        `${t('team-member.message.remove-member-successful', {
          size: selectedMembers.length,
        })}`,
        {
          delay: 0,
        }
      );
      queryClient.refetchQueries([QUERY_KEY.MEMBER_LIST]);
      onClose();
    },
  });

  const onSubmit = async () => {
    if (currentTeamId && selectedMembers.length > 0) {
      const memberIds = selectedMembers.map(
        (member) => member.teamMemberUserId
      );
      await onRemoveTeamMember({
        teamId: currentTeamId.toString(),
        memberIds: memberIds,
      });
    }
    onClose();
  };

  return {
    onSubmit,
    error,
  };
};

export default useRemoveMemberData;
