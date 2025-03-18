import RegisterView from './view';


export interface ApiConsoleContainersRegisterProps {
  [key: string]: any;
}

export function ApiConsoleContainersRegister(
  props: ApiConsoleContainersRegisterProps 
) {
  return <RegisterView />
}

export default ApiConsoleContainersRegister;
