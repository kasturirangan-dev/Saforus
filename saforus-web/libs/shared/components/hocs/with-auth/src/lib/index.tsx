import { useLocation, Navigate, RouteProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { setReturnLocation } from '@web-workspace/shared/helpers/routes';

interface ProtectedRouteProps extends Omit<RouteProps, 'children'> {
  children: React.ReactElement;
}

const WithAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, isLoading, clearAuthState } = useSnapshot(AuthStore);
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

  // Set current location as return location to return after login
  if (!isLoggedIn) {
    setReturnLocation(location);
  }

  // Check if user is logged in or App is in prerendering mode
  return isLoggedIn || window.__PRERENDER_INJECTED?.isPrerendering ? (
    children
  ) : (
    <Navigate
      to={{ pathname: ROUTES.LOGIN.path, search: location.search }}
      replace
    />
  );
};

export default WithAuth;
