import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import WebHooksContainer from '@web-workspace/api-docs/pages/webhooks';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';

export const WEBHOOKS = {
  path: API_DOCS_ROUTES.WEBHOOKS.path,
  element: (
    <MainLayout>
      <WebHooksContainer />
    </MainLayout>
  ),
};