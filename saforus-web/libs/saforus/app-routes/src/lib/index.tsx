import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { Box } from '@mui/material';
import SaforusPagesNotfound from '@web-workspace/saforus/pages/notfound';
import WatermarkingDownloadPage from '@web-workspace/saforus/pages/watermarking-download';
import { NOT_AUTH_ROUTES } from './not-auth';
import { HELP_ROUTES } from './help';
import { DASHBOARD_ROUTES } from './dashboard';
import { MULTI_DRM_PACKAGING_ROUTES } from './multi-drm';
import { FORENSIC_WATERMARKING_ROUTES } from './fwm';
import { PIRACY_DETECTION_ROUTES } from './pd';
import { SETTINGS_ROUTES } from './settings';
import { USER_INFO_ROUTES } from './user-info';

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: <Navigate to={ROUTES.DASHBOARD.PACKAGES_DELIVERY.path} replace />,
  },
  { ...HELP_ROUTES },
  { ...NOT_AUTH_ROUTES },
  { ...DASHBOARD_ROUTES },
  { ...MULTI_DRM_PACKAGING_ROUTES },
  { ...FORENSIC_WATERMARKING_ROUTES },
  { ...PIRACY_DETECTION_ROUTES },
  { ...SETTINGS_ROUTES },
  { ...USER_INFO_ROUTES },
  {
    path: ROUTES.CUSTOMER_SUPPORT.path,
    element: <Box>{ROUTES.CUSTOMER_SUPPORT.name}</Box>,
  },
  {
    path: ROUTES.WATERMAKING_DOWNLOAD.path,
    element: <WatermarkingDownloadPage />,
  },
  {
    path: ROUTES.NOTFOUND.path,
    element: <SaforusPagesNotfound />,
  },
]);

export default AppRouter;
