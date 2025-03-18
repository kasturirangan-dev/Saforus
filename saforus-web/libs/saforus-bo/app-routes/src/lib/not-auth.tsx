import { Outlet } from 'react-router-dom';
import WithNotBoAuth from '@web-workspace/shared/components/hocs/with-not-bo-auth';
import PublicLayout from '@web-workspace/saforus-bo/components/layouts/public-layout';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import Login from '@web-workspace/saforus-bo/pages/login';
import ResetPassword from '@web-workspace/saforus-bo/pages/resetpassword';

export const NOT_AUTH_ROUTES = {
  path: '',
  element: (
    <WithNotBoAuth>
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    </WithNotBoAuth>
  ),
  children: [
    {
      path: BO_ROUTES.LOGIN.path,
      element: <Login />,
    },
    {
      path: BO_ROUTES.RESET.path,
      element: <ResetPassword />,
    },
  ],
};
