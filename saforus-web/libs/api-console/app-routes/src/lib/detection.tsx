import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';
import DetectWatermarkPage from '@web-workspace/api-console/pages/detect-watermark';

export const DETECTION_ROUTES = {
  path: API_ROUTES.DETECT_WATERMARK.path,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <DetectWatermarkPage />
      </MainLayout>
    </WithCsApiAuth>
  ),
};
