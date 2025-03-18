import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import MainLayout from '@web-workspace/api-bo/components/layouts/main-layout';
import CsApiAdminPage from '@web-workspace/api-bo/pages/admin';
import WithCsApiBoAuth from '@web-workspace/shared/components/hocs/with-csapi-bo-auth';

export const ADMIN_ROUTES = {
  path: API_BO_ROUTES.ADMIN.path,
  element: (
    <WithCsApiBoAuth>
      <MainLayout>
        <CsApiAdminPage />
      </MainLayout>
    </WithCsApiBoAuth>
  ),
};
