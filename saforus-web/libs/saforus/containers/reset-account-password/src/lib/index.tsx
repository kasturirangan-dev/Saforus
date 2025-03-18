import NewPasswordView from './view';

export interface ContainersNewPasswordProps {
  token?: string;
  email?: string;
}

export function ContainersNewPassword(props: ContainersNewPasswordProps) {
  return <NewPasswordView {...props}/>;
}

export default ContainersNewPassword;