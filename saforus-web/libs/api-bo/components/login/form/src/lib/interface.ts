import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Login } from './data/utils';

export interface LoginProps {
  handleSubmit: UseFormHandleSubmit<Login>;
  onSubmit: (data: Login) => void;
  register: UseFormRegister<Login>;
  watch: UseFormWatch<Login>;
  errors: FieldErrors<Login>;
  loading: boolean;
}

export interface ILoginInfoRequest {
  email: string;
  password: string;
}

export interface UserLoginApi {
  postLogin: (userInfo: ILoginInfoRequest) => Promise<any>;
}

export interface UserTokenInfo {
  jti: string;
  sub: string;
  type: string;
  email: string;
  exp: number;
  accountName?: string;
  roles?: string[];
  subscriptionTier?: string;
  zoneId?: string;
}
