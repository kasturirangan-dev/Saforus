import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import ErrorCodesContainer from '@web-workspace/api-docs/pages/error-codes';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';

export const ERROR_CODES = {
  path: API_DOCS_ROUTES.ERROR_CODES.path,
  element: (
    <MainLayout>
      <ErrorCodesContainer />
    </MainLayout>
  ),
};
