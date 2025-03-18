import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import OrderManagementWatermarkingOrdersPage from '@web-workspace/saforus-bo/pages/order-management/watermarking-orders';
import OrderManagementWatermarkingDetailPage from '@web-workspace/saforus-bo/pages/order-management/watermarking-detail';
import OrderManagementWatermarkingDownloadFilesPage from '@web-workspace/saforus-bo/pages/order-management/watermarking-download-files';
import OrderManagementPiracyDetectionRequestsPage from '@web-workspace/saforus-bo/pages/order-management/piracy-detection-requests';
import PiracyOrderDetailPage from '@web-workspace/saforus-bo/pages/order-management/piracy-detection-detail';

export const ORDER_MANAGEMENT_ROUTES = {
  path: BO_ROUTES.ORDER_MANAGEMENT.ROOT,
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
          path: BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.path,
          element: <OrderManagementWatermarkingOrdersPage />,
        },
        {
          path: `${BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.children.WATERMARKING_DETAIL.path}/:id`,
          element: <OrderManagementWatermarkingDetailPage />,
        },
        {
          path: `${BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.children.WATERMARKING_DETAIL.children.WATERMARKING_DOWNLOAD_FILES.path}/:id`,
          element: <OrderManagementWatermarkingDownloadFilesPage />,
        },
        {
          path: BO_ROUTES.ORDER_MANAGEMENT.PIRACY_DETECTION_REQUESTS.path,
          element: <OrderManagementPiracyDetectionRequestsPage />,
        },
        {
          path: `${BO_ROUTES.ORDER_MANAGEMENT.PIRACY_DETECTION_REQUESTS.children.PIRACY_ORDER_DETAIL.path}/:id`,
          element: <PiracyOrderDetailPage />,
        },
        {
          path: '', // Empty path to match the root
          element: (
            <Navigate
              to={BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.path}
            />
          ),
        },
      ],
};
