import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import ApiDocsUserGuidePage from '@web-workspace/api-docs/pages/user-guide';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';

export const USER_GUIDE = {
  path: API_DOCS_ROUTES.USER_GUIDE.path,
  element: (
    <MainLayout>
      <ApiDocsUserGuidePage />
    </MainLayout>
  ),
};
