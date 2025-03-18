import { Navigate, RouteProps } from 'react-router-dom';
import React from 'react';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithNotAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useSnapshot(CsApiBoAuthStore);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isLoggedIn ? (
    <Navigate to={API_BO_ROUTES.USER_MANAGEMENT.MANAGE_ACCOUNT.path} replace />
  ) : (
    children
  );
};

export default WithNotAuth;
