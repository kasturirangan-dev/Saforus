import { Outlet } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import ApiConsoleLoginPage from '@web-workspace/api-console/pages/login';
import WithNotCsApiAuth from '@web-workspace/shared/components/hocs/with-not-csapi-auth';
import ApiConsleResetPasswordPage from '@web-workspace/api-console/pages/reset-password';
import ResrtPasswordDonePage from '@web-workspace/api-console/pages/reset-password-done';
import ResetAccountPasswordPage from '@web-workspace/api-console/pages/reset-account-password';
import ApiConsoleRegisterPage from '@web-workspace/api-console/pages/register';
import ApiConsoleRegisterDonePage from '@web-workspace/api-console/pages/register-done';
import ApiConsoleRegisterCompletedPage from '@web-workspace/api-console/pages/register-completed';
import ApiConsoleVerifyEmailPage from '@web-workspace/api-console/pages/verify-email';

export const NOT_AUTH_ROUTES = {
  path: '',
  element: (
    <WithNotCsApiAuth>
      <Outlet />
    </WithNotCsApiAuth>
  ),
  children: [
    {
      path: API_ROUTES.LOGIN.path,
      element: <ApiConsoleLoginPage />,
    },
    { path: API_ROUTES.REGISTER.path, element: <ApiConsoleRegisterPage /> },
    {
      path: API_ROUTES.REGISTER_DONE.path,
      element: <ApiConsoleRegisterDonePage />,
    },
    {
      path: API_ROUTES.REGISTER_COMPLETED.path,
      element: <ApiConsoleRegisterCompletedPage />,
    },
    {
      path: API_ROUTES.VERIFY_EMAIL.path,
      element: <ApiConsoleVerifyEmailPage />,
    },
    {
      path: API_ROUTES.VERIFY_EMAIL.path,
      element: <ApiConsoleVerifyEmailPage />,
    },
  ],
};
