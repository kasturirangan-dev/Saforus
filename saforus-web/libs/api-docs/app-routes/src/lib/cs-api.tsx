import AuthenticationApiPage from '@web-workspace/api-docs/pages/csapi/authentication';
import ApiKeysManagementPage from '@web-workspace/api-docs/pages/csapi/api-keys';
import WatermarkingApiPage from '@web-workspace/api-docs/pages/csapi/watermarking';
import DetectionApiPage from '@web-workspace/api-docs/pages/csapi/detection';
import ShareFileApiPage from '@web-workspace/api-docs/pages/csapi/share-file';
import DeleteFileApiPage from '@web-workspace/api-docs/pages/csapi/delete-file';
import MainLayout from '@web-workspace/api-docs/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

export const CS_API_ROUTES = {
  path: API_DOCS_ROUTES.CS_API.ROOT,
  element: (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  children: [
    {
      path: '',
      element: (
        <Navigate to={API_DOCS_ROUTES.CS_API.AUTHENTICATION.path} replace />
      ),
    },
    {
      path: API_DOCS_ROUTES.CS_API.AUTHENTICATION.path,
      element: <AuthenticationApiPage />,
    },
    {
      path: API_DOCS_ROUTES.CS_API.API_KEYS.path,
      element: <ApiKeysManagementPage />,
    },
    {
      path: API_DOCS_ROUTES.CS_API.WATERMARKING.path,
      element: <WatermarkingApiPage />,
    },
    {
      path: API_DOCS_ROUTES.CS_API.DETECTION.path,
      element: <DetectionApiPage />,
    },

    {
      path: API_DOCS_ROUTES.CS_API.SHARE_FILE.path,
      element: <ShareFileApiPage />,
    },
    {
      path: API_DOCS_ROUTES.CS_API.DELETE_FILE.path,
      element: <DeleteFileApiPage />,
    },
  ],
};
