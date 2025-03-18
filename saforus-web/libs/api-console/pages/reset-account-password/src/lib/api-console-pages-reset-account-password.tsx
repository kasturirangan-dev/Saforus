import { useSearchParams } from 'react-router-dom';
import ContainerNewPassword from '@web-workspace/api-console/containers/reset-account-password';

export function ResetAccountPasswordPage() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  
  return (
    <ContainerNewPassword
      token={paramsAsObject.token}
    />
  );
}

export default ResetAccountPasswordPage;
