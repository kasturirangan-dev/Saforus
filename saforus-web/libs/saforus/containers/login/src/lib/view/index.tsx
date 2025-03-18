import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import NavbarContainer, {
  NavbarActions,
} from '@web-workspace/saforus/components/layouts/navbar';
import LoginForm from '@web-workspace/saforus/components/login/form';
import NotificationBanner from '@web-workspace/saforus/components/layouts/notification-banner';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import { useSnapshot } from 'valtio';
import RouteStore from '@web-workspace/shared/helpers/routes';
import { FeatureFlagStore } from '@web-workspace/shared/feature-flag';
import { is } from 'cypress/types/bluebird';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

const LoginView = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { returnUrl } = useSnapshot(RouteStore);
  const [fromNonLoggged, setFromNonLogged] = useState(false);
  const { isFetched } = useSnapshot(FeatureFlagStore);

  useEffect(() => {
    DialogStore.openDialog({
      name: DialogType.Notification,
      props: { locationPath: location.pathname },
    });
    localStorage.removeItem('DashboardServiceUsageStoreState');
  }, []);

  // non-logged user direct to login path from returnUrl
  useEffect(() => {
    if (returnUrl) {
      searchParams.set('returnUrl', returnUrl);
      setSearchParams(searchParams, { replace: true });
      RouteStore.clearRouteStore();
      setFromNonLogged(true);
    }
  }, [returnUrl]);

  // Add tracking event for non-logged user direct to login path
  // after feature flags are loaded
  useEffect(() => {
    if (fromNonLoggged && isFetched) {
      logEventAnalytics(TrackingEvent.User_Nonlogged);
    }
  }, [fromNonLoggged, isFetched]);

  return (
    <StyledBox>
      <NavbarContainer logo={'light'}>
        <NavbarActions />
      </NavbarContainer>
      <NotificationBanner />
      <Box display="flex" width="100%" height="100%">
        <LoginForm />
      </Box>
    </StyledBox>
  );
};

export default React.memo(LoginView);
