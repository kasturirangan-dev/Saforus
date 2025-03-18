import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import ApiKeyPage from '@web-workspace/api-console/pages/api-key';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';

export const API_KEY_ROUTES = {
  path: API_ROUTES.KEY_MANAGEMENT.path,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <ApiKeyPage />
      </MainLayout>
    </WithCsApiAuth>
  ),
};
