import { Outlet } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import WithNotCsApiAuth from '@web-workspace/shared/components/hocs/with-not-csapi-auth';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import ApiConsoleDashboardPage from '@web-workspace/api-console/pages/dashboard';
import DetectWatermarkPage from '@web-workspace/api-console/pages/detect-watermark';
import InsertWatermarkPage from '@web-workspace/api-console/pages/insert-watermark';
import OrderListPage from '@web-workspace/api-console/pages/view-orders/order-list';
import ApiKeyPage from '@web-workspace/api-console/pages/api-key';

export const GUEST_ROUTES = {
  path: API_ROUTES.GUEST.ROOT,
  element: (
    <WithNotCsApiAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithNotCsApiAuth>
  ),
  children: [
    {
      path: API_ROUTES.GUEST.DASHBOARD.path,
      element: <ApiConsoleDashboardPage />,
    },
    {
      path: API_ROUTES.GUEST.INSERT_WATERMARK.path,
      element: <InsertWatermarkPage />,
    },
    {
      path: API_ROUTES.GUEST.DETECT_WATERMARK.path,
      element: <DetectWatermarkPage />,
    },
    {
      path: API_ROUTES.GUEST.VIEW_ORDERS.path,
      element: <OrderListPage />,
    },
    {
      path: API_ROUTES.GUEST.KEY_MANAGEMENT.path,
      element: <ApiKeyPage />,
    },
  ],
};
