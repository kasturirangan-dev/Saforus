import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import SettingsSitesPage from '@web-workspace/saforus/pages/settings/sites';
import { Box } from '@mui/material';

export const SETTINGS_ROUTES = {
  path: ROUTES.SETTINGS.ROOT,
  element: (
    <WithAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithAuth>
  ),
  children: [
    {
      index: true,
      path: ROUTES.SETTINGS.SITES.path,
      element: <SettingsSitesPage />,
    },
    {
      path: ROUTES.SETTINGS.MULTI_DRM.path,
      element: <Box>Multi-DRM Settings</Box>,
    },
    {
      path: '', // Empty path to match the root settings path
      element: <Navigate to={ROUTES.SETTINGS.SITES.path} />, // Redirect to /settings/sites
    },
  ],
};
