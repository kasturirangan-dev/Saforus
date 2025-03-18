import WithNotAuth from '@web-workspace/shared/components/hocs/with-not-auth';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import SaforusPagesLogin from '@web-workspace/saforus/pages/login';
import SaforusPagesRegister from '@web-workspace/saforus/pages/register';
import SaforusRegisterDonePage from '@web-workspace/saforus/pages/register-done';
import SaforusRegisterCompletedPage from '@web-workspace/saforus/pages/register-completed';
import SaforusPageResetPassword from '@web-workspace/saforus/pages/resetpassword';
import SaforusPageResetAccountPassword from '@web-workspace/saforus/pages/reset-account-password';
import SaforusPageVerifyEmail from '@web-workspace/saforus/pages/verify-email';
import SaforusPageResetDone from '@web-workspace/saforus/pages/reset-password-done';

export const NOT_AUTH_ROUTES = {
  path: '',
  element: (
    <WithNotAuth>
      <Outlet />
    </WithNotAuth>
  ),
  children: [
    {
      path: ROUTES.LOGIN.path,
      element: <SaforusPagesLogin />,
    },
    {
      path: ROUTES.REGISTER.path,
      element: <SaforusPagesRegister />,
    },
    {
      path: ROUTES.REGISTER_DONE.path,
      element: <SaforusRegisterDonePage />,
    },
    {
      path: ROUTES.REGISTER_COMPLETED.path,
      element: <SaforusRegisterCompletedPage />,
    },
    {
      path: ROUTES.RESET.path,
      element: <SaforusPageResetPassword />,
    },
    {
      path: ROUTES.RESET_ACCOUNT_PASS.path,
      element: <SaforusPageResetAccountPassword />,
    },
    {
      path: ROUTES.VERIFY_EMAIL.path,
      element: <SaforusPageVerifyEmail />,
    },
    {
      path: ROUTES.RESET_DONE.path,
      element: <SaforusPageResetDone />,
    },
  ],
};
