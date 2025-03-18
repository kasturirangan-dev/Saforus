import { Navigate, Outlet } from 'react-router-dom';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import MainLayout from '@web-workspace/api-bo/components/layouts/main-layout';
import CsApiBoManageAccountPage from '@web-workspace/api-bo/pages/user-management/manage-account';
import CsApiBoServicePlanPage from '@web-workspace/api-bo/pages/user-management/service-plan';
import WithCsApiBoAuth from '@web-workspace/shared/components/hocs/with-csapi-bo-auth';

export const USER_MANAGEMENT_ROUTES = {
  path: API_BO_ROUTES.USER_MANAGEMENT.ROOT,
  element: (
    <WithCsApiBoAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithCsApiBoAuth>
  ),
  children: [
    {
      path: '', // Empty path to match the root
      element: (
        <Navigate to={API_BO_ROUTES.USER_MANAGEMENT.MANAGE_ACCOUNT.path} />
      ),
    },
    {
      path: API_BO_ROUTES.USER_MANAGEMENT.MANAGE_ACCOUNT.path,
      element: <CsApiBoManageAccountPage />,
    },
    {
      path: API_BO_ROUTES.USER_MANAGEMENT.SERVICE_PLAN.path,
      element: <CsApiBoServicePlanPage />,
    },
  ],
};
