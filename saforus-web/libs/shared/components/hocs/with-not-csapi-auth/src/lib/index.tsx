import { Navigate, RouteProps } from 'react-router-dom';
import React from 'react';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSearchParams } from 'react-router-dom';
import { getReturnPath } from '@web-workspace/shared/helpers/routes';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithNotAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useSnapshot(CsApiAuthStore);
  const [searchParams] = useSearchParams();
  // Return to the previous page if isLoggedIn
  const returnPath = getReturnPath(searchParams);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isLoggedIn ? (
    <Navigate to={returnPath ?? API_ROUTES.INSERT_WATERMARK.path} replace />
  ) : (
    children
  );
};

export default WithNotAuth;
