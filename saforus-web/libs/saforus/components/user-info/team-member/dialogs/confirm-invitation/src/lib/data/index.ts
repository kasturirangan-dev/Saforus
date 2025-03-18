import { useTranslation } from 'react-i18next';
import {
  InvitationStatus,
  QUERY_KEY,
  UserTeamStore,
  updateInvitation,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { useMutation, useQueryClient } from 'react-query';
import { useSnapshot } from 'valtio';
import { showToast } from '@web-workspace/saforus/common/utils';
import { UserRole } from '@web-workspace/saforus/common/model';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import useSubscription, {
  SubscriptionPlanDetail,
} from '@web-workspace/shared/hooks/use-subscription';

const useConfirmInvitationData = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { joinTeam } = useSnapshot(AuthStore);
  const { invitation, setInvitation } = useSnapshot(UserTeamStore);
  const { setSubscriptionData } = useSnapshot(useSubscription);

  const getInviteeRole = (role: string | undefined) => {
    let inviteeRole;
    switch (role) {
      case UserRole.TEAM_EDITOR:
        inviteeRole = `${t('team-member.role.member')}`;
        break;
      case UserRole.TEAM_VIEWER:
        inviteeRole = `${t('team-member.role.viewer')}`;
        break;
      case UserRole.TEAM_OWNER:
        inviteeRole = `${t('team-member.role.owner')}`;
        break;
      default:
        inviteeRole = `${t('team-member.role.owner')}`;
        break;
    }
    return inviteeRole;
  };

  const updateTeam = (data: any) => {
    // Update user info after join a team
    joinTeam(data);

    //  Subscription plan could change after join a team
    //  Update subscription data base on userInfo
    const subscriptionPlanDetailList =
      AuthStore?.userInfo?.subscriptionPlanDetailList;
    const subscriptionPlanStatus = AuthStore?.userInfo?.subscriptionPlanStatus;
    setSubscriptionData(
      subscriptionPlanDetailList?.[0] as SubscriptionPlanDetail,
      subscriptionPlanStatus || ''
    );

    queryClient.invalidateQueries(QUERY_KEY.TEAMS);
  };

  const { mutate: onUpdateInvitation, isLoading: loading } = useMutation(
    updateInvitation,
    {
      onSuccess: (response, request) => {
        if (
          response &&
          response.resultCode >= 200 &&
          response.resultCode <= 299
        ) {
          const inviteeRole = getInviteeRole(request?.userRole);
          if (request?.status === InvitationStatus.ACCEPTED) {
            showToast.success(
              t('team-member.message.accept-invitation-successful', {
                team: request?.teamName,
                role: inviteeRole,
              }),
              {
                delay: 0,
              }
            );
            response.data && updateTeam(response.data);
          } else {
            showToast.success(
              t('team-member.message.decline-invitation-successful', {
                team: request?.teamName,
              }),
              {
                delay: 0,
              }
            );
          }
          setInvitation({ ...invitation, ...request });
        }
      },
    }
  );

  const onAccept = async () => {
    if (invitation) {
      await onUpdateInvitation({
        ...invitation,
        status: InvitationStatus.ACCEPTED,
      });
    }
    onClose();
  };

  const onDecline = async () => {
    if (invitation) {
      await onUpdateInvitation({
        ...invitation,
        status: InvitationStatus.DECLINED,
      });
    }
    onClose();
  };

  return {
    onAccept,
    onDecline,
    loading,
  };
};

export default useConfirmInvitationData;
