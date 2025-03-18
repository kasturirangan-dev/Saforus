import { User } from '@web-workspace/shared/hooks/use-auth';

export interface ILoginInfoRequest {
  email: string;
  password: string;
}


export interface UserTokenInfo {
  sub: string
  teamId: number
  roles: string
  iss: string
  ipAddress: string
  exp: number
  userName: string
  tokenType: string
  iat: number
  userId: number
}