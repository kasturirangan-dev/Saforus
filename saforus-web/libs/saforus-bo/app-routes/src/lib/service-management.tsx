import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import ServiceManagementNotificationManagementPage from '@web-workspace/saforus-bo/pages/service-management/notification-list';
import ServiceManagementCreateNotificationPage from '@web-workspace/saforus-bo/pages/service-management/create-notification';
import ServiceManagementEditNotificationPage from '@web-workspace/saforus-bo/pages/service-management/edit-notification';

export const SERVICE_MANAGEMENT_ROUTES = {
  path: BO_ROUTES.SERVICE_MANAGEMENT.ROOT,
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
      path: BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path,
      element: <ServiceManagementNotificationManagementPage />,
    },
    {
      index: true,
      path: BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children
        .CREATE_NEW_NOTICE.path,
      element: <ServiceManagementCreateNotificationPage />,
    },
    {
      index: true,
      path: `${BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children.EDIT_NOTICE.path}/:id`,
      element: <ServiceManagementEditNotificationPage />,
    },
    {
      path: '', // Empty path to match the root
      element: (
        <Navigate
          to={BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path}
        />
      ),
    },
  ],
};
