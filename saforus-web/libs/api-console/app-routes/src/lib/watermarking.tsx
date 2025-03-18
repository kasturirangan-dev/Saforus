import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';
import InsertWatermarkPage from '@web-workspace/api-console/pages/insert-watermark';

export const WATERMARKING_ROUTES = {
  path: API_ROUTES.INSERT_WATERMARK.path,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <InsertWatermarkPage />
      </MainLayout>
    </WithCsApiAuth>
  ),
};
