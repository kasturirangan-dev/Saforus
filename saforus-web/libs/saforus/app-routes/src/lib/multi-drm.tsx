import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import MultiDrmCreateOrderPage from '@web-workspace/saforus/pages/multi-drm/create-order';
import MultiDrmViewOrdersPage from '@web-workspace/saforus/pages/multi-drm/view-orders';
import MultiDrmOrdersDetailPage from '@web-workspace/saforus/pages/multi-drm/order-detail';
import MultiDrmPackagingConfigurationPage from '@web-workspace/saforus/pages/multi-drm/packaging-configuration';

export const MULTI_DRM_PACKAGING_ROUTES = {
  path: ROUTES.MULTI_DRM_PACKAGING.ROOT,
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
      path: ROUTES.MULTI_DRM_PACKAGING.CREATE_ORDER.path,
      element: <MultiDrmCreateOrderPage />,
    },
    {
      path: ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.path,
      element: <MultiDrmViewOrdersPage />,
    },
    {
      path: `${ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.children.MULTI_DMR_PACKING_DETAIL.path}/:id`,
      element: <MultiDrmOrdersDetailPage />,
    },
    {
      path: `${ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.children.MULTI_DMR_PACKING_DETAIL.children.MULTI_DMR_PACKING_CONFIGURATION.path}/:id`,
      element: <MultiDrmPackagingConfigurationPage />,
    },
    {
      path: '', // Empty path to match the root path
      element: <Navigate to={ROUTES.MULTI_DRM_PACKAGING.CREATE_ORDER.path} />,
    },
  ],
};
