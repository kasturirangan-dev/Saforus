import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import SaforusExpiredView from '@web-workspace/saforus/components/expired-view';
import { Navigate, Outlet } from 'react-router-dom';
import PiracyCreateRequestPage from '@web-workspace/saforus/pages/piracy-detection/create-new-request';
import PiracyViewOrderPage from '@web-workspace/saforus/pages/piracy-detection/view-order';
import PiracyOrdersDetailPage from '@web-workspace/saforus/pages/piracy-detection/order-detail';
import { FeatureFlag } from '@web-workspace/shared/feature-flag';
import FeatureGuard from '@web-workspace/feature-flag-guard';

export const PIRACY_DETECTION_ROUTES = {
  path: ROUTES.PIRACY_DETECTION.ROOT,
  element: (
    <WithAuth>
      <MainLayout>
        <FeatureGuard feature={FeatureFlag.PD}>
          <SaforusExpiredView>
            <Outlet />
          </SaforusExpiredView>
        </FeatureGuard>
      </MainLayout>
    </WithAuth>
  ),
  children: [
    {
      index: true,
      path: ROUTES.PIRACY_DETECTION.NEW_REQUEST.path,
      element: <PiracyCreateRequestPage />,
    },
    {
      path: ROUTES.PIRACY_DETECTION.VIEW_ORDER.path,
      element: <PiracyViewOrderPage />,
    },
    {
      path: `${ROUTES.PIRACY_DETECTION.VIEW_ORDER.children.PIRACY_ORDER_DETAIL.path}/:id`,
      element: <PiracyOrdersDetailPage />,
    },
    {
      path: '', // Empty path to match the root
      element: <Navigate to={ROUTES.PIRACY_DETECTION.NEW_REQUEST.path} />,
    },
  ],
};
