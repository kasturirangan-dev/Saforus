import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import SettingsAdminUserManagementPage from '@web-workspace/saforus-bo/pages/settings/admin-user-management';

export const SETTINGS_ROUTES = {
  path: BO_ROUTES.SETTINGS.ROOT,
  element: (
    <WithBoAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithBoAuth>
  ),
  children: [
    {
      index: true,
      path: BO_ROUTES.SETTINGS.ADMIN_USER_MANAGEMENT.path,
      element: <SettingsAdminUserManagementPage />,
    },
    {
      path: '', // Empty path to match the root
      element: <Navigate to={BO_ROUTES.SETTINGS.ADMIN_USER_MANAGEMENT.path} />,
    },
  ],
};
