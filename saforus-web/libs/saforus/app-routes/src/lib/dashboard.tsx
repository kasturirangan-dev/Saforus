import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import SaforusExpiredView from '@web-workspace/saforus/components/expired-view';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardViewOrderPage from '@web-workspace/saforus/pages/dashboard/view-order';
import DashboardServiceUsagePage from '@web-workspace/saforus/pages/dashboard/service-usage';

export const DASHBOARD_ROUTES = {
  path: ROUTES.DASHBOARD.ROOT,
  element: (
    <WithAuth>
      <MainLayout>
        <SaforusExpiredView>
          <Outlet />
        </SaforusExpiredView>
      </MainLayout>
    </WithAuth>
  ),
  children: [
    {
      path: ROUTES.DASHBOARD.SEARCH_ORDERS.path,
      element: <DashboardViewOrderPage />,
    },
    {
      index: true,
      path: ROUTES.DASHBOARD.PACKAGES_DELIVERY.path,
      element: <DashboardServiceUsagePage />,
    },
    {
      path: '', // Empty path to match the root path
      element: <Navigate to={ROUTES.DASHBOARD.PACKAGES_DELIVERY.path} />,
    },
  ],
};
