import { Member } from "@web-workspace/saforus/components/user-info/team-member/data";

export type InviteValidation = Pick<Member, 'fullName' | 'email' | 'role'>;