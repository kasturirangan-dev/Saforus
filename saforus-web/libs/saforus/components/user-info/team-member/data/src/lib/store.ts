import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { createTeam, updateTeam, deleteTeam, updateMemberRole } from './api';
import {
  MemberSearchType,
  SearchMemberValues,
  MemberExt,
  TeamOrder,
  RequestTeamOrder,
  ResponseTeamOrder,
  Invitation,
} from './interface';
import { IResponse, TOption } from '@web-workspace/saforus/common/model';
import { Member, Team } from '@web-workspace/shared/hooks/use-auth';
import { randomId } from '@web-workspace/shared/helpers/strings';

type TOptionKeys = 'status' | 'roles';

interface TeamType {
  team?: Team | null;
  setTeam: (team?: Team) => void;
  members: MemberExt[] | null;
  setMembers: (members: Member[]) => void;
  total: number;
  setTotal: (total: number) => void;
  currentTeamId: number | null;
  selectedMembers: MemberExt[];
  setSelectedMember: (members: MemberExt[]) => void;
  setCurrentTeamId: (teamId?: number | null | undefined) => void;
  updateTeamOverview: (
    teamId: number | null | undefined,
    updatedOverview: Partial<Team>
  ) => Promise<IResponse | null>;
  createTeam: (newTeam: Partial<Team>) => Promise<Team>;
  inviteMember: (member: Member) => void;
  changeOwner: (
    teamId: number | null | undefined,
    member: Partial<Member>
  ) => Promise<any>;
  deleteTeam: (teamId: number) => Promise<boolean>;
  searchQuery: Partial<SearchMemberValues>;
  setSearchQuery: (query: Partial<SearchMemberValues>) => void;
  status: TOption[];
  roles: TOption[];
  setSearchTypes: (values: any[], type: MemberSearchType) => void;
  memberLoading: boolean;
  setMemberLoading: (value: boolean) => void;
  createTeamResult: any;
  memberOptions: TOption[];
  originMembers: Member[];
  setMemberOptions: (member: Member[]) => void;
  destroyStore: () => void;
  orders: TeamOrder[];
  ordersLoading: boolean;
  setOrdersLoading: (value: boolean) => void;
  totalOrder: number;
  searchOrderQuery: Partial<RequestTeamOrder>;
  setSearchOrderQuery: (query: Partial<RequestTeamOrder>) => void;
  setOrders: (data: ResponseTeamOrder | null) => void;
  reset: () => void;
  invitation: Invitation;
  setInvitation: (data: Invitation) => void;
}

function createTeamStore() {
  const currentDate = new Date();
  const store: TeamType = {
    selectedMembers: [],
    memberOptions: [],
    originMembers: [],
    setMemberOptions: (members) => {
      if (members && members instanceof Array) {
        UserTeamStore.originMembers = members;
        const memberOptions = members.map((el) => {
          return {
            label: `${el.fullName} (${el.emailAddress})`,
            value: `${el.teamMemberUserId}`,
          };
        });

        UserTeamStore.memberOptions = memberOptions;
      } else {
        UserTeamStore.originMembers = [];
        UserTeamStore.memberOptions = [];
      }
    },
    team: null,
    createTeamResult: null,
    setTeam: (team) => {
      UserTeamStore.team = team;
    },
    total: 0,
    setTotal: (total) => {
      UserTeamStore.total = total;
    },
    members: null,
    setMembers: (members) => {
      if (members && members instanceof Array) {
        const newMembers = members.map((el) => {
          return {
            ...el,
            id: randomId(),
            joinedDate: {
              status: el.status,
              invitationAcceptedAt: el.invitationAcceptedAt,
              invitationExpiredAt: el.invitationExpiredAt,
              invitationSentAt: el.invitationSentAt,
            },
          } as MemberExt;
        });
        UserTeamStore.members = newMembers;
        UserTeamStore.total = members?.length || 0;
      } else {
        UserTeamStore.members = null;
      }
    },
    memberLoading: false,
    setMemberLoading(value) {
      UserTeamStore.memberLoading = value;
    },
    currentTeamId: null,
    setCurrentTeamId: (teamId) => {
      UserTeamStore.currentTeamId = Number(teamId);
    },
    setSelectedMember: (members) => {
      UserTeamStore.selectedMembers = members;
    },
    updateTeamOverview: async (teamId, updatedOverview) => {
      const currentTeamData = UserTeamStore.team;
      // Merge current team data with updated data
      const combinedData = { ...currentTeamData, ...updatedOverview } as Team;
      // Call the real API to update the team
      const response = await updateTeam(teamId, combinedData);
      if (response) {
        UserTeamStore.team = combinedData;
      }
      return response;
    },
    changeOwner: async (teamId, member) => {
      // Call the real API to update the team
      const response = await updateMemberRole(
        teamId,
        member.teamMemberUserId?.toString() ?? '',
        member.role ?? '',
        member.status ?? ''
      );
      // Update member list and member Extend list
      return response;
    },
    createTeam: async (newTeam) => {
      const result = await createTeam(newTeam);
      if (result === null) {
        const cusResult = {
          isSuccess: false,
          data: null,
        };
        UserTeamStore.createTeamResult = cusResult;

        return cusResult;
      }
      UserTeamStore.createTeamResult = result;
      UserTeamStore.currentTeamId = result.data?.resourceId;
      return result;
    },
    deleteTeam: async (teamId) => {
      const success = await deleteTeam(teamId);
      if (success) {
        UserTeamStore.team = null;
        UserTeamStore.setCurrentTeamId(null);
      }
      return success;
    },
    inviteMember: (newMember: Member) => {
      const newMem = {
        ...newMember,
        id: randomId(),
        joinedDate: {
          status: newMember.status,
          invitationAcceptedAt: newMember.invitationAcceptedAt,
          invitationExpiredAt: newMember.invitationExpiredAt,
          invitationSentAt: newMember.invitationSentAt,
        },
      } as MemberExt;
      UserTeamStore.members = UserTeamStore.members
        ? [...UserTeamStore.members, newMem]
        : [newMem];
    },
    searchQuery: {
      nameOrEmail: '',
      status: 'ALL',
      role: 'ALL',
      startDate: undefined,
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<SearchMemberValues>) => {
      UserTeamStore.searchQuery = {
        ...UserTeamStore.searchQuery,
        ...query,
      };
    },
    status: [] as TOption[],
    roles: [] as TOption[],
    setSearchTypes: (values: any[], type: MemberSearchType) => {
      const mappedValues =
        values &&
        (values.map((item) => {
          return {
            label: item?.label ?? '',
            value: item?.value ?? '',
          };
        }) as TOption[]);
      const typeToStateMap: { [key in MemberSearchType]: TOptionKeys } = {
        [MemberSearchType.STATUS]: 'status',
        [MemberSearchType.ROLE]: 'roles',
      };

      UserTeamStore[typeToStateMap[type]] = mappedValues;
    },
    destroyStore: () => {
      UserTeamStore.team = null;
      UserTeamStore.setCurrentTeamId(null);
    },
    orders: [],
    totalOrder: 0,
    ordersLoading: false,
    setOrdersLoading(value) {
      UserTeamStore.ordersLoading = value;
    },
    searchOrderQuery: {
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchOrderQuery: (query: Partial<RequestTeamOrder>) => {
      UserTeamStore.searchOrderQuery = {
        ...UserTeamStore.searchOrderQuery,
        ...query,
      };
    },
    setOrders: (data: ResponseTeamOrder | null) => {
      UserTeamStore.totalOrder = data?.totalElements ?? 0;
      if (data?.elementList && data?.elementList.length > 0) {
        UserTeamStore.orders = data?.elementList?.map((el) => {
          const formatList = el.formatList;
          let formatStr = '';
          if (formatList && formatList.length > 0) {
            formatStr = formatList[0].extension?.replace('.', '');
            formatStr = formatStr.toUpperCase();
          }
          return {
            ...el,
            id: randomId(),
            // contentTypeStr: el.contentType?.value ?? '',
            formatStr: formatStr,
          };
        });
      } else {
        UserTeamStore.orders = [];
      }
    },
    reset: () => {
      UserTeamStore.createTeamResult = null;
    },
    setInvitation: (invitation) => {
      UserTeamStore.invitation = invitation;
    },
  };

  return store;
}

const UserTeamStore = proxy<TeamType>(createTeamStore());

devtools(UserTeamStore, { name: 'USER_TEAM' });

export default UserTeamStore;
