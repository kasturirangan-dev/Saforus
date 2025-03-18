import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import DashboardForensicWatermarkingPage from '@web-workspace/saforus-bo/pages/admin-dashboard/forensic-watermarking';

export const ADMIN_DASHBOARD_ROUTES = {
  path: BO_ROUTES.ADMIN_DASHBOARD.path,
  element: (
    <WithBoAuth>
      <MainLayout>
        <DashboardForensicWatermarkingPage />
      </MainLayout>
    </WithBoAuth>
  ),
};
