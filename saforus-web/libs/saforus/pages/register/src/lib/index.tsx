import SaforusContainersRegister from '@web-workspace/saforus/containers/register';

export interface SaforusPagesRegisterProps {
  [key: string]: any;
}

export function SaforusPagesRegister(props: SaforusPagesRegisterProps) {
  return <SaforusContainersRegister />
}

export default SaforusPagesRegister;
