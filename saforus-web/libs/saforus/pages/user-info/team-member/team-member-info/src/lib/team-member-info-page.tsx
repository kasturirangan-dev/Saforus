import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import TeamMemberContainer from '@web-workspace/saforus/containers/user-info/team-member/team-member-info';
import { useTranslation } from 'react-i18next';

export function TeamMemberPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.user-info.team-members.title')}
        desc={t('pageHeader.user-info.team-members.desc')}
      />
      <TeamMemberContainer />
    </div>
  );
}

export default TeamMemberPage;
