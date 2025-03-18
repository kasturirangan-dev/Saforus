export interface UserNewPasswordApi {
  putNewPassword: (params: any, email?: string) => Promise<any>;
}
