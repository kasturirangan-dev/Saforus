import { NOT_AUTH_ROUTES } from './not-auth';
import { DASHBOARD_ROUTES } from './dashboard';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import SaforusPagesNotfound from '@web-workspace/saforus/pages/notfound';
import { USER_MANAGEMENT_ROUTES } from './user-management';
import { ADMIN_ROUTES } from './admin';

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: (
      <Navigate
        to={API_BO_ROUTES.USER_MANAGEMENT.MANAGE_ACCOUNT.path}
        replace
      />
    ),
  },
  { ...NOT_AUTH_ROUTES },
  { ...USER_MANAGEMENT_ROUTES },
  { ...DASHBOARD_ROUTES },
  { ...ADMIN_ROUTES },
  {
    path: API_BO_ROUTES.NOTFOUND.path,
    element: <SaforusPagesNotfound />,
  },
]);

export default AppRouter;
