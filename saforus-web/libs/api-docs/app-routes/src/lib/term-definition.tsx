import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import ApiDocsTermDefinitionPage from '@web-workspace/api-docs/pages/term-definition';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';

export const TERM_DEFINITION = {
  path: API_DOCS_ROUTES.TERM_DEFINITION.path,
  element: (
    <MainLayout>
      <ApiDocsTermDefinitionPage />
    </MainLayout>
  ),
};
