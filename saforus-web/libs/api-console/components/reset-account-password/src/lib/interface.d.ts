import { NewPassword } from "./data/utils";

export interface NewPasswordProps {
  handleSubmit: UseFormHandleSubmit<NewPassword>;
  onSubmit: (data: NewPassword) => void;
  register: UseFormRegister<NewPassword>
  watch: UseFormWatch<NewPassword>
  errors: FieldErrors<NewPassword>
  loading: boolean;
  email?: string;
}

export interface UserNewPasswordApi {
  putNewPassword: (params: any, email?: string) => Promise<any>;
}
