import AuthStore from '@web-workspace/shared/hooks/use-auth';

export function getTeamId() {
  const { userInfo } = AuthStore;
  const { subscriptionPlanDetailList = [] } = userInfo || {};
  return subscriptionPlanDetailList?.[0]?.teamId || getIdFromTeamDetailList();
}

const getIdFromTeamDetailList = () => {
  return AuthStore?.userInfo?.teamDetailList?.find((team) => team.isDefaultTeam)
    ?.id;
};

export function getPublicTeamId() {
  const { userInfo } = AuthStore;
  const pubTeams = userInfo?.teamDetailList?.filter(
    (team) => !team.isDefaultTeam
  );
  return pubTeams?.[0]?.id;
}
