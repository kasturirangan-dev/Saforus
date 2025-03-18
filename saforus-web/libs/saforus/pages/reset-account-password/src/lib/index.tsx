import { useSearchParams } from 'react-router-dom';
import ContainerNewPassword from '@web-workspace/saforus/containers/reset-account-password';

export function SaforusResetAccountPasswordPage() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  return (
    <ContainerNewPassword
      token={paramsAsObject.token}
      email={paramsAsObject.email}
    />
  );
}

export default SaforusResetAccountPasswordPage;
