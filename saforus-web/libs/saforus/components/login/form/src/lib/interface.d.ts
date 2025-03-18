import { Login } from './data/utils';
import { User } from '@web-workspace/shared/hooks/use-auth';

export interface LoginProps {
  handleSubmit: UseFormHandleSubmit<Login>;
  onSubmit: (data: Login) => void;
  register: UseFormRegister<Login>;
  errors: FieldErrors<Login>;
  loading: boolean;
  disabled: boolean;
}

export interface ILoginInfoRequest {
  email: string;
  password: string;
  teamInvitationToken?: string | null | undefined;
  awsToken?: string | null | undefined; // for AWS
  googleToken? : string | null | undefined; // for Google
}

export interface ILoginInfoRequestGoogle {
  googleToken? : string | null | undefined; // for Google
}

export interface UserLoginApi {
  postLogin: (userInfo: ILoginInfoRequest, isGoogleLogin: boolean) => Promise<any>;
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