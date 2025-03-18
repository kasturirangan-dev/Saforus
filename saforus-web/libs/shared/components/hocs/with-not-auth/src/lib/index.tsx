import { Navigate, RouteProps } from 'react-router-dom';
import React from 'react';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSearchParams } from 'react-router-dom';
import { getReturnPath } from '@web-workspace/shared/helpers/routes';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithNotAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading, userInfo } = useSnapshot(AuthStore);
  const [searchParams] = useSearchParams();
  // Return to the previous page after login
  const returnPath = getReturnPath(searchParams);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // let rootPath = ROUTES.DASHBOARD.PACKAGES_DELIVERY.path;
  // if (userInfo?.master || !userInfo?.devMode) {
  //   rootPath = ROUTES.HOME.path;
  // }

  return isLoggedIn ? (
    <Navigate
      to={returnPath ?? ROUTES.DASHBOARD.PACKAGES_DELIVERY.path}
      replace
    />
  ) : (
    children
  );
};

export default WithNotAuth;
