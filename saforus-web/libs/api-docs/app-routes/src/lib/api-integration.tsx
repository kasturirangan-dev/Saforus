import ApiIntegrationBasicConceptsPage from '@web-workspace/api-docs/pages/api-integration/basic-concepts';
import ApiIntegrationQuickStartPage from '@web-workspace/api-docs/pages/api-integration/quick-start';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

export const API_INTEGRATION_ROUTES = {
  path: API_DOCS_ROUTES.API_INTEGRATION.ROOT,
  element: (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  children: [
    {
      path: '',
      element: (
        <Navigate
          to={API_DOCS_ROUTES.API_INTEGRATION.BASIC_CONCEPTS.path}
          replace
        />
      ),
    },
    {
      path: API_DOCS_ROUTES.API_INTEGRATION.BASIC_CONCEPTS.path,
      element: <ApiIntegrationBasicConceptsPage />,
    },
    {
      path: API_DOCS_ROUTES.API_INTEGRATION.QUICK_START.path,
      element: <ApiIntegrationQuickStartPage />,
    },
  ],
};
