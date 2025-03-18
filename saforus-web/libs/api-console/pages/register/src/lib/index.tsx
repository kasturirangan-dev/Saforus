import ApiConsoleContainersRegister from '@web-workspace/api-console/containers/register';

export interface ApiConsoleRegisterProps {
  [key: string]: any;
}

export function ApiConsoleRegisterPage(props: ApiConsoleRegisterProps) {
  return <ApiConsoleContainersRegister />
}

export default ApiConsoleRegisterPage;
