import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { setReturnLocation } from '@web-workspace/shared/helpers/routes';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithCsApiAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, isLoading, clearAuthState, syncUserInfoCookies } =
    useSnapshot(CsApiAuthStore);
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

  // Sync user info across tabs
  // Listen for user info changes in local storage
  useEffect(() => {
    const handleUserChange = (event) => {
      if (event.key === 'cs_api_userInfo') {
        const userInfo = localStorage.getItem('cs_api_userInfo');
        if (userInfo) {
          syncUserInfoCookies();
        } else {
          clearAuthState();
        }
      }
    };
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Set return location for current plan page
  if (
    !isLoggedIn &&
    location.pathname === API_ROUTES.USER_INFO.CURRENT_PLAN.path
  ) {
    setReturnLocation(location);
  }

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={{ pathname: API_ROUTES.LOGIN.path }} replace />
  );
};

export default WithCsApiAuth;
