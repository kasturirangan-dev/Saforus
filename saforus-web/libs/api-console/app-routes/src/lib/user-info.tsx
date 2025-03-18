import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import MainLayout from '@web-workspace/api-console/components/layouts/main-layout';
import WithCsApiAuth from '@web-workspace/shared/components/hocs/with-csapi-auth';
import MyAccountPage from '@web-workspace/api-console/pages/my-account';
import { Outlet } from 'react-router-dom';
import ServicePlanPage from '@web-workspace/api-console/pages/myplan';
import PaymentManagementpage from '@web-workspace/api-console/pages/payment-management';

export const USER_INFO_ROUTES = {
  path: API_ROUTES.USER_INFO.ROOT,
  element: (
    <WithCsApiAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithCsApiAuth>
  ),
  children: [
    {
      path: '',
      element: <MyAccountPage />,
    },
    {
      path: API_ROUTES.USER_INFO.CURRENT_PLAN.path,
      element: <ServicePlanPage />,
    },
    {
      path: API_ROUTES.USER_INFO.PAYMENT_MANAGEMENT.path,
      element: <PaymentManagementpage />,
    },
  ],
};
