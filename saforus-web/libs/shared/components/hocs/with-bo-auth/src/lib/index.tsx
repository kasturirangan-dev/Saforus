import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import React from 'react';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithBoAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useSnapshot(BoAuthStore);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to={{ pathname: BO_ROUTES.LOGIN.path, search: location?.search }}
      replace
    />
  );
};

export default WithBoAuth;
