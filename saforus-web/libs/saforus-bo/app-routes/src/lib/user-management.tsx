import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import UserManagementSearchUserPage from '@web-workspace/saforus-bo/pages/user-management/search-and-list';
import UserManagementUserDetailPage from '@web-workspace/saforus-bo/pages/user-management/user-detail';
import UserManagementSearchTeamAndMembersPage from '@web-workspace/saforus-bo/pages/user-management/search-team-and-members';

export const USER_MANAGEMENT_ROUTES = {
  path: BO_ROUTES.USER_MANAGEMENT.ROOT,
  element: (
    <WithBoAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </WithBoAuth>
  ),
  children: [
    {
      index: true,
      path: BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path,
      element: <UserManagementSearchUserPage />,
    },
    {
      path: `${BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.children.USER_DETAIL.path}/:id`,
      element: <UserManagementUserDetailPage />,
    },
    // {
    //   path: BO_ROUTES.USER_MANAGEMENT.SEARCH_TEAM_AND_MEMBERS.path,
    //   element: <UserManagementSearchTeamAndMembersPage />,
    // },
    {
      path: '', // Empty path to match the root
      element: <Navigate to={BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path} />,
    },
  ],
};
