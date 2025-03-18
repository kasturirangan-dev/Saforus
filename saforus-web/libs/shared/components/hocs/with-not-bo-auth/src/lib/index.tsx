import { Navigate, RouteProps } from 'react-router-dom';
import React from 'react';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithNotBoAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useSnapshot(BoAuthStore);
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isLoggedIn ? (
    <Navigate to={BO_ROUTES.ADMIN_DASHBOARD.path} replace />
  ) : (
    children
  );
};

export default WithNotBoAuth;
