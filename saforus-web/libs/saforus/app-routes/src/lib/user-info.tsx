import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import SaforusMyAccountPage from '@web-workspace/saforus/pages/user-info/my-account';
import SaforusTeamMemberPage from '@web-workspace/saforus/pages/user-info/team-member/team-member-info';
import SaforusTeamDetailPage from '@web-workspace/saforus/pages/user-info/team-member/team-detail';
import { Box } from '@mui/material';
import ServicePlanPage from '@web-workspace/saforus/pages/user-info/service-plan';
import BillingDetail from '@web-workspace/saforus/pages/user-info/billing-detail';
import MonthlyUsage from '@web-workspace/saforus/pages/user-info/monthly-usage';
import SaforusAdminUserCreditPage from '@web-workspace/saforus/pages/user-info/admin-user-credit';
import { SaforusTeamExpiredView } from '@web-workspace/saforus/components/expired-view';

export const USER_INFO_ROUTES = {
  path: '',
  element: (
    <WithAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithAuth>
  ),
  children: [
    {
      index: true,
      path: ROUTES.USER_INFO.ROOT,
      element: <SaforusMyAccountPage />,
    },
    {
      path: ROUTES.USER_INFO.TEAM.path,
      element: (
        <SaforusTeamExpiredView>
          <SaforusTeamMemberPage />
        </SaforusTeamExpiredView>
      ),
    },
    {
      path: `${ROUTES.USER_INFO.TEAM.children.TEAM_DETAIL.path}/:id`,
      element: (
        <SaforusTeamExpiredView>
          <SaforusTeamDetailPage />
        </SaforusTeamExpiredView>
      ),
    },
    {
      path: ROUTES.USER_INFO.SERVICE_BILLING.path,
      element: <Box>{ROUTES.USER_INFO.SERVICE_BILLING.name}</Box>,
    },
    {
      path: ROUTES.CUSTOMER_SUPPORT.path,
      element: <Box>{ROUTES.CUSTOMER_SUPPORT.name}</Box>,
    },
    {
      path: ROUTES.USER_INFO.SERVICE_PLAN.path,
      element: <ServicePlanPage />,
    },
    {
      path: ROUTES.USER_INFO.BILLING_DETAIL.path,
      element: <BillingDetail />,
    },
    {
      path: ROUTES.USER_INFO.MONTHLY_USAGE.path,
      element: <MonthlyUsage />,
    },
    {
      path: ROUTES.USER_INFO.ADMIN_PAGE.path,
      element: <SaforusAdminUserCreditPage />,
    },
    {
      path: '',
      element: <Navigate to={ROUTES.USER_INFO.ROOT} />, // Redirect to /user-info
    },
  ],
};
