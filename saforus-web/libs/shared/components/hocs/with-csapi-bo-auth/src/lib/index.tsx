import { Navigate, RouteProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithCsApiAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading, clearAuthState } =
    useSnapshot(CsApiBoAuthStore);
  const expiredTime = localStorage.getItem('Expired');
  const currentTime = Math.floor(Date.now() / 1000);
  const hasVisitedBefore = localStorage.getItem('hasVisited');

  if (!hasVisitedBefore && expiredTime && currentTime > +expiredTime) {
    console.warn('clearAuthState at WithAuth');
    clearAuthState();
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('hasVisited');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={{ pathname: API_BO_ROUTES.LOGIN.path }} replace />
  );
};

export default WithCsApiAuth;
