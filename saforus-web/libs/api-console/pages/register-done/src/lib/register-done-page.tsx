import RegisterDoneContainer from '@web-workspace/api-console/containers/register-done';
import { useLocation } from 'react-router-dom';

export function ApiConsoleRegisterDonePage() {
  const { state } = useLocation();
  const { email } = state || {};

  return <RegisterDoneContainer email={email} />;
}

export default ApiConsoleRegisterDonePage;
