import { useSearchParams } from 'react-router-dom';
import VerifyEmailContainer from '@web-workspace/api-console/containers/verify-email';

export function ApiConsoleVerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  return (
    <VerifyEmailContainer
      token={paramsAsObject.token}
      email={paramsAsObject.email}
    />
  );
}

export default ApiConsoleVerifyEmailPage;
