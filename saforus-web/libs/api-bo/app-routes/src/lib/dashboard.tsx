import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import MainLayout from '@web-workspace/api-bo/components/layouts/main-layout';
import CsApiBoDashboardPage from '@web-workspace/api-bo/pages/dashboard';
import WithCsApiBoAuth from '@web-workspace/shared/components/hocs/with-csapi-bo-auth';

export const DASHBOARD_ROUTES = {
  path: API_BO_ROUTES.DASHBOARD.path,
  element: (
    <WithCsApiBoAuth>
      <MainLayout>
        <CsApiBoDashboardPage />
      </MainLayout>
    </WithCsApiBoAuth>
  ),
};
