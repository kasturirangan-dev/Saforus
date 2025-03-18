import { Member } from "@web-workspace/shared/hooks/use-auth";

export type InviteValidation = Pick<Member, 'fullName' | 'emailAddress' | 'userRole'>;