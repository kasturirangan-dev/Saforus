import ContainerVerifyEmailView from './view';
import { ContainerVerifyEmailProps } from './interface';

export function SaforusVerifyEmailContainer(props: ContainerVerifyEmailProps) {
  return <ContainerVerifyEmailView {...props} />;
}

export default SaforusVerifyEmailContainer;
