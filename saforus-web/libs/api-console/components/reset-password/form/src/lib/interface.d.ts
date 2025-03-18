import { UseFormHandleSubmit } from "react-hook-form";

export interface ResetPasswordProps {
  handleSubmit: UseFormHandleSubmit<ResetPassword>;
  onSubmit: (data: ResetPassword) => void;
  register: UseFormRegister<ResetPassword>
  errors: FieldErrors<ResetPassword>
  loading: boolean;
}
export interface UserResetPasswordApi {
  getResetPassword: (params: ResetPassword) => Promise<any>;
}
