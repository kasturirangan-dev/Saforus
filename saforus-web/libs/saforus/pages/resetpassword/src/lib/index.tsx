import SaforusContainersResetPassword from "@web-workspace/saforus/containers/resetpassword";

export interface SaforusPagesResetpasswordProps {
  [key: string]: any;
}

export function SaforusPageResetPassword(
  props: SaforusPagesResetpasswordProps
) {
  return <SaforusContainersResetPassword />;
}

export default SaforusPageResetPassword;
