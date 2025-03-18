import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';
import { Outlet } from 'react-router-dom';
import OrderListPage from '@web-workspace/api-console/pages/view-orders/order-list';
import WtrOrderPage from '@web-workspace/api-console/pages/view-orders/wtr-order';
import WtrOrderFilePage from '@web-workspace/api-console/pages/view-orders/wtr-order-file';
import PdOrderPage from '@web-workspace/api-console/pages/view-orders/pd-order';
import PdOrderFilePage from '@web-workspace/api-console/pages/view-orders/pd-order-file';

export const VIEW_ORDERS_ROUTES = {
  path: API_ROUTES.VIEW_ORDERS.ROOT,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithCsApiAuth>
  ),
  children: [
    {
      path: '',
      element: <OrderListPage />,
    },
    {
      path: `${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/:orderId`,
      element: <WtrOrderPage />,
    },
    {
      path: `${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/:orderId/files/:fileId`,
      element: <WtrOrderFilePage />,
    },
    {
      path: `${API_ROUTES.VIEW_ORDERS.PD_ORDERS.path}/:orderId`,
      element: <PdOrderPage />,
    },
    {
      path: `${API_ROUTES.VIEW_ORDERS.PD_ORDERS.path}/:orderId/files/:fileId`,
      element: <PdOrderFilePage />,
    },
  ],
};
