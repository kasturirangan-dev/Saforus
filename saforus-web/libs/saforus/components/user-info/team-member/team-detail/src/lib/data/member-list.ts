import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { useSnapshot } from 'valtio';


export function usePagingMemberListData() {
  const { setSearchQuery, members, total, memberLoading } =
    useSnapshot(UserTeamStore);

  const onPageChange = async (selection: any) => {
    setSearchQuery({ pageNo: selection.page });
  };

  return {
    onPageChange,
    members,
    total,
    memberLoading,
  };
}
