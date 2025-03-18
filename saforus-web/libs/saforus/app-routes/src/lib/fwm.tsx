import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import SaforusExpiredView from '@web-workspace/saforus/components/expired-view';
import { Navigate, Outlet } from 'react-router-dom';
import WaterMarkingCreatePage from '@web-workspace/saforus/pages/forensic-watermarking/create';
import WaterMarkingViewOrderPage from '@web-workspace/saforus/pages/forensic-watermarking/view-order';
import WatermarkOrderDetailPage from '@web-workspace/saforus/pages/forensic-watermarking/order-detail';
import WatermarkDownloadFilesPage from '@web-workspace/saforus/pages/forensic-watermarking/download-files';
import { FeatureFlag } from '@web-workspace/shared/feature-flag';
import FeatureGuard from '@web-workspace/feature-flag-guard';

export const FORENSIC_WATERMARKING_ROUTES = {
  path: ROUTES.FORENSIC_WATERMARKING.ROOT,
  element: (
    <WithAuth>
      <MainLayout>
        <FeatureGuard feature={FeatureFlag.FWM}>
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
      path: ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path,
      element: <WaterMarkingCreatePage />,
    },
    {
      path: ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path,
      element: <WaterMarkingViewOrderPage />,
    },
    {
      path: `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children.WATERMARKING_HISTORY_DETAIL.path}/:id`,
      element: <WatermarkOrderDetailPage />,
    },
    {
      path: `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children.WATERMARKING_HISTORY_DETAIL.children.WATERMARKING_DOWNLOAD_FILES.path}/:id`,
      element: <WatermarkDownloadFilesPage />,
    },
    {
      path: '', // Empty path to match the root path
      element: (
        <Navigate
          to={ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path}
        />
      ),
    },
  ],
};
