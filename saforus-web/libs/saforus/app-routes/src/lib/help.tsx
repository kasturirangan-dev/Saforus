import { ROUTES } from '@web-workspace/saforus/constants/routes';
import WithAuth from '@web-workspace/shared/components/hocs/with-auth';
import MainLayout from '@web-workspace/saforus/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import SaforusPageMyInquiry from '@web-workspace/saforus/pages/help/inquiry';
import SaforusPageCreateInquiry from '@web-workspace/saforus/pages/help/create-inquiry-auth';
import SaforusPageDetailInquiry from '@web-workspace/saforus/pages/help/inquiry-detail';

export const HELP_ROUTES = {
  path: ROUTES.HELP.ROOT,
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
      path: ROUTES.HELP.HELP_CENTER.path,
      element: <SaforusPageMyInquiry />,
    },
    {
      path: ROUTES.HELP.INQUIRY.path,
      element: <SaforusPageCreateInquiry />,
      // element: <SaforusPageMyInquiry />,
    },
    {
      path: `${ROUTES.HELP.HELP_CENTER.children.INQUIRY_DETAIL.path}/:id`,
      element: <SaforusPageDetailInquiry />,
    },
    {
      path: '',
      element: <Navigate to={ROUTES.HELP.HELP_CENTER.path} />,
    },
  ],
};
