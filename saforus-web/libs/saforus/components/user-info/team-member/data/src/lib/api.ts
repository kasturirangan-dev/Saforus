import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from '@web-workspace/shared/api/http-client';
import { Member, Team } from '@web-workspace/shared/hooks/use-auth';
import {
  RequestTeamOrder,
  ResponseTeamOrder,
  MembersResponseData,
  Invitation,
} from './interface';
import { IResponse } from '@web-workspace/saforus/common/model';
import queryString from 'query-string';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

export const QUERY_KEY = {
  TEAM: 'team',
  TEAMS: 'teams',
  MEMBER_LIST: 'member_list',
  INVITE_MEMBER: 'invite_member',
  META_DATA: 'META_DATA',
  ORDER_LIST: 'order_list',
  INVITATIONS: 'invitations',
};

const teamEndpoint = '/api/v1/saforus-web-be/user/team';
const createTeamEndpoint = '/api/v1/saforus-web-be/user/team';
const inviteMemberEndpoint = '/api/v1/saforus-web-be/user/team/member';
const removeMemberEndpoint = '/api/v1/saforus-web-be/user/team/';
const searchMembers = '/api/v1/saforus-web-be/user/team/';
const teamDetailEndpoint = '/api/v1/saforus-web-be/user/team/';
const GET_META_DATA = '/api/v1/saforus-web-be/papi/common/home/metadata';
const removeTeamEndpoint = '/api/v1/saforus-web-be/user/team/';
const updateMemberRoleEndpoint = '/api/v1/saforus-web-be/user/team/';
const teamOrdersEndpoint = '/api/v1/saforus-web-be/user/team/orders/';
const invitationEndpoint = '/api/v1/saforus-web-be/invitations/pending';
const createInvitationEndpoint = '/api/v1/saforus-web-be/invitations';
const updateInvitationEndpoint = '/api/v1/saforus-web-be/invitations/';
// /user/team/orders/{teamId}
export async function fetchTeams(): Promise<Team[]> {
  const response = await apiGet({ url: teamEndpoint, showToast: false });
  if (response.data?.data) {
    const teams = response.data?.data as Team[];
    return teams;
  }
  return [] as Team[];
}

export async function fetchTeamDetail(
  teamId: string | number | null | undefined
): Promise<Team | null> {
  if (!teamId) return null;
  const response = await apiGet({
    url: `${teamDetailEndpoint}${teamId}`,
    showToast: false,
  });
  return response.data?.data as Team;
}

export async function fetchMembers(
  data: any,
  teamId: number | null | undefined
): Promise<MembersResponseData | null> {
  const tzOffset = getMinuteOffset();
  const formattedData = Object.assign({}, data, {
    startDate:
      data.startDate instanceof Date
        ? formatTzDate(data.startDate, tzOffset)
        : data.startDate,
    endDate:
      data.endDate instanceof Date
        ? formatTzDate(data.endDate, tzOffset, false)
        : data.endDate,
  });
  // delete the status property if its value is ALL
  if (data.status === 'ALL') {
    delete formattedData.status;
  }

  // delete the role property if its value is ALL
  if (data.role === 'ALL') {
    delete formattedData.role;
  }
  const searchParams = queryString.stringify(formattedData);
  const response = await apiGet({
    url: `${searchMembers}${teamId}/member?${searchParams}`,
  });
  return response.data;
}

export async function fetchTeamOrders(
  data: Partial<RequestTeamOrder>,
  teamId: number | null | undefined
): Promise<ResponseTeamOrder | null> {
  if (!teamId) return null;
  const searchParams = `?pageNo=${data.pageNo}&elementPerPage=${data.elementPerPage}`;
  const response = await apiGet({
    url: `${teamOrdersEndpoint}${teamId}${searchParams}`,
  });
  return response.data?.data;
}

export async function createTeam(newTeam: Partial<Team>): Promise<any> {
  const reqData = {
    transactionId: '',
    name: newTeam.name,
    description: newTeam.description ?? '',
  };
  const response = await apiPost({
    url: createTeamEndpoint,
    data: reqData,
    showToast: false,
  });
  return response;
}

export async function inviteMember(member: Partial<Member>): Promise<any> {
  const reqData = {
    transactionId: '',
    fullName: member.fullName,
    email: member.emailAddress,
    userRole: member.userRole,
    teamId: member.teamId,
  };

  const response = await apiPost({
    url: inviteMemberEndpoint,
    data: reqData,
    showToast: false,
  });
  return response.data;
}

export async function removeTeamMember({
  teamId,
  memberIds,
}: {
  teamId: string;
  memberIds: string[];
}): Promise<boolean> {
  if (memberIds.length === 0) return false;

  let memberExt = memberIds.join('&userId=');
  memberExt = `?userId=${memberExt}`;

  const response = await apiDelete({
    url: `${removeMemberEndpoint}${teamId}/member${memberExt}`,
    showToast: true,
  });
  console.warn('removeTeamMember', JSON.stringify(response, null, 2));
  return response.data;
}
export async function removeTeam(teamId: number): Promise<any> {
  const response = await apiDelete({
    url: `${removeTeamEndpoint}${teamId}`,
    showToast: false,
  });
  return response.data?.data as Team;
}

export async function updateTeam(
  teamId: number | null | undefined,
  data: Partial<Team>
): Promise<IResponse> {
  const reqData = {
    name: data.name,
    description: data.description ?? '',
  };
  const response = await apiPut({
    url: `${teamEndpoint}/${teamId}`,
    data: reqData,
    showToast: false,
  });
  return response.data;
}

// export async function deleteTeam(teamId: number): Promise<boolean> {
//   const response = await apiDelete({
//     url: `${teamEndpoint}/${teamId}`,
//     showToast: true,
//   });
//   return response.isSuccess;
// }

export async function deleteTeam(teamId: number): Promise<boolean> {
  return true;
}

export async function fetchMetaData(): Promise<any | null> {
  const response = await apiGet({ url: GET_META_DATA });
  return response?.data;
}

export async function updateMemberRole(
  teamId: number | null | undefined,
  userId: string,
  role: string,
  status: string
): Promise<any> {
  const reqData = {
    status: status ?? '',
    userRole: role ?? '',
  };
  const response = await apiPut({
    url: `${updateMemberRoleEndpoint}${teamId}/member/${userId}`,
    data: reqData,
    showToast: false,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function createInvitation(member: Partial<Member>): Promise<any> {
  const reqData = {
    inviteeName: member.fullName,
    inviteeEmail: member.emailAddress,
    userRole: member.userRole,
    teamId: member.teamId,
  };

  const response = await apiPost({
    url: createInvitationEndpoint,
    data: reqData,
  });
  return response.data;
}

export async function fetchInvitation(invitationToken: string): Promise<any> {
  const response = await apiGet({
    url: `${invitationEndpoint}${
      invitationToken ? `?invitationToken=${invitationToken}` : ''
    }`,
  });
  return response?.data;
}

export async function updateInvitation(
  invitation: Partial<Invitation>
): Promise<any> {
  const reqData = {
    status: invitation.status ?? '',
  };
  const response = await apiPatch({
    url: `${updateInvitationEndpoint}${invitation.id}`,
    data: reqData,
  });
  return response.data;
}
