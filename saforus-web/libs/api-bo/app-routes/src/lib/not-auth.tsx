import { Outlet } from 'react-router-dom';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import CsApiBoLoginPage from '@web-workspace/api-bo/pages/login';
import WithNotCsApiBoAuth from '@web-workspace/shared/components/hocs/with-not-csapi-bo-auth';

export const NOT_AUTH_ROUTES = {
  path: '',
  element: (
    <WithNotCsApiBoAuth>
      <Outlet />
    </WithNotCsApiBoAuth>
  ),
  children: [
    {
      path: API_BO_ROUTES.LOGIN.path,
      element: <CsApiBoLoginPage />,
    },
  ],
};
