import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Login } from './data/utils';
import { User } from '@web-workspace/shared/hooks/use-csapi-auth';

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

export interface UserTokenInfo extends User {
  jti: string;
  sub: string;
  type: string;
  exp: number;
}
