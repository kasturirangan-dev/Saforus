import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import ApiConsolePagesDashboard from '@web-workspace/api-console/pages/dashboard';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';

export const DASHBOARD_ROUTES = {
  path: API_ROUTES.DASHBOARD.path,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <ApiConsolePagesDashboard />
      </MainLayout>
    </WithCsApiAuth>
  ),
};
