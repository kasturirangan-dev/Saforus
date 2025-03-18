import { Navigate, RouteProps } from 'react-router-dom';
import React from 'react';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithSubscription: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { status } = useSnapshot(UseSubscription);

  return status === 'active' ? (
    children
  ) : (
    <Navigate to={{ pathname: ROUTES.NOTFOUND.path }} replace />
  );
};
export default WithSubscription;
