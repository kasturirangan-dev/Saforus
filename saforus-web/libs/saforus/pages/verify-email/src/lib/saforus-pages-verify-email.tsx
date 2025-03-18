import { useSearchParams } from 'react-router-dom';
import VerifyEmailContainer from '@web-workspace/saforus/containers/verify-email';

export function SaforusVerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  return (
    <VerifyEmailContainer
      token={paramsAsObject.token}
      email={paramsAsObject.email}
    />
  );
}

export default SaforusVerifyEmailPage;
