import { BaseResponseData } from '@web-workspace/saforus/common/model';
import { Member, Team } from '@web-workspace/shared/hooks/use-auth';
import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export interface SearchMemberValues {
  nameOrEmail: string,
  status: string,
  role: string,
  startDate: Date | string,
  endDate: Date | string,
  pageNo: number,
  elementPerPage: number
}

export interface MembersResponseData extends BaseResponseData {
  data: {
    pageNo: number;
    elementPerPage: number;
    totalElements: number;
    totalPages: number;
    elementList: Member[];
  }
}

type SchemaOfType<T> = T extends string
  ? StringSchema
  : T extends number
  ? NumberSchema
  : T extends boolean
  ? BooleanSchema
  : T extends Array<infer U>
  ? ArraySchema<U, any>
  : T extends object
  ? ObjectSchema<T>
  : T extends Date
  ? DateSchema
  : never;

export type TeamValidationSchema<T> = {
  [K in keyof T]: SchemaOfType<T[K]>;
};

export type SearchMemberValidation = Omit<
  SearchMemberValues,
  | 'nameOrEmail'
  | 'status'
  | 'role'
  | 'startDate'
  | 'endDate'
  | 'fromRow'
  | 'rowCount'
>;

export type TeamValidation = Pick<Team, 'name' | 'description' | 'teamOwnerId' | 'teamOwnerName' | 'teamOwnerEmail'>;

export enum MemberSearchType {
  STATUS = 'status',
  ROLE = 'role',
}

export interface MemberExt extends Member {
  id: string;
  joinedDate?: JoinedDate | null | undefined;
}

export interface JoinedDate {
  status: string | null;
  invitationSentAt: string | null;
  invitationAcceptedAt: string | null;
  invitationExpiredAt: string | null;
}

export type CreateTeamValidation = Pick<Team, 'name' | 'description'>;

export interface RequestTeamOrder {
  pageNo: number,
  elementPerPage: number
}

export interface ResponseTeamOrder {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: TeamOrder[];
}

export interface TeamOrder {
  id: string;
  orderNo: string;
  psnStartNum: number;
  psnEndNum: number;
  orderStatus: string;
  contentType: string;
  serviceType: string;
  summary: string;
  extension: string;
  userEmail: string;
  userFullName: string;
  requestDate: string;
  formatList: FormatObj[];
  // contentTypeStr: string;
  formatStr: string;
}


// export interface ContentTypeObj {
//   value: string;
// }

export interface FormatObj {
  extension: string;
  id: number;
  type: string;
}

export interface Invitation {
  id: number;
  inviteeEmail: string;
  status: string;
  teamId: number;
  teamName: string;
  userRole: string;
}

export const enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
}

export const enum InvitationErrorCode {
  MEMBER_OF_ANOTHER_TEAM = 401031,
  TEAM_DELETED = 401027,
  INVALID_INVITEE = 401058,
}
