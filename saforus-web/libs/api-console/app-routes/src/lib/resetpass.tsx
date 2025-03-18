import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import ResetAccountPasswordPage from '@web-workspace/api-console/pages/reset-account-password';
import ApiConsleResetPasswordPage from '@web-workspace/api-console/pages/reset-password';
import ResrtPasswordDonePage from '@web-workspace/api-console/pages/reset-password-done';

export const RESETPASS_ROUTES = [
  {
    path: API_ROUTES.RESET.path,
    element: <ApiConsleResetPasswordPage />,
  },
  {
    path: API_ROUTES.RESET_ACCOUNT_PASS.path,
    element: <ResetAccountPasswordPage />,
  },
  {
    path: API_ROUTES.RESET_DONE.path,
    element: <ResrtPasswordDonePage />,
  },
];
