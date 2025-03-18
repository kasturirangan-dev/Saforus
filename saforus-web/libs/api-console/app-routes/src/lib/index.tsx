import { NOT_AUTH_ROUTES } from './not-auth';
import { DASHBOARD_ROUTES } from './dashboard';
import { API_KEY_ROUTES } from './api-key';
import { USER_INFO_ROUTES } from './user-info';
import { WATERMARKING_ROUTES } from './watermarking';
import { DETECTION_ROUTES } from './detection';
import { VIEW_ORDERS_ROUTES } from './view-order';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import SaforusPagesNotfound from '@web-workspace/saforus/pages/notfound';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { GUEST_ROUTES } from './guest-routes';
import { RESETPASS_ROUTES } from './resetpass';


const ExternalDoc = () => {
  window.location.replace(getEnvVar('VITE_API_DOC_URL'));
  return null;
};

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: <Navigate to={API_ROUTES.DASHBOARD.path} replace />,
  },
  {
    path: API_ROUTES.API_DOC.path,
    element: <ExternalDoc />,
  },
  { ...NOT_AUTH_ROUTES },
  { ...DASHBOARD_ROUTES },
  { ...API_KEY_ROUTES },
  { ...USER_INFO_ROUTES },
  { ...WATERMARKING_ROUTES },
  { ...DETECTION_ROUTES },
  { ...VIEW_ORDERS_ROUTES },
  { ...GUEST_ROUTES },
  ...RESETPASS_ROUTES,
  {
    path: API_ROUTES.NOTFOUND.path,
    element: <SaforusPagesNotfound />,
  },
]);

export default AppRouter;
