import ContainerVerifyEmailView from './view';
import { ContainerVerifyEmailProps } from './interface';

export function ApiConsoleVerifyEmailContainer(props: ContainerVerifyEmailProps) {
  return <ContainerVerifyEmailView {...props} />;
}

export default ApiConsoleVerifyEmailContainer;
