import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import CustomerSupportSearchUsersPage from '@web-workspace/saforus-bo/pages/customer-support/search-users';
import CustomerSupportSearchInquiriesPage from '@web-workspace/saforus-bo/pages/customer-support/search-1-1-inquiries';
import CustomerSupportInquiryDetailPage from '@web-workspace/saforus-bo/pages/customer-support/inquiry-detail';

export const CUSTOMER_SUPPORT_ROUTES = {
  path: BO_ROUTES.CUSTOMER_SUPPORT.ROOT,
      element: (
        <WithBoAuth>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </WithBoAuth>
      ),
      children: [
        // {
        //   index: true,
        //   path: BO_ROUTES.CUSTOMER_SUPPORT.SEARCH_USERS.path,
        //   element: <CustomerSupportSearchUsersPage />,
        // },
        {
          path: BO_ROUTES.CUSTOMER_SUPPORT.SEARCH_INQUIRIES.path,
          element: <CustomerSupportSearchInquiriesPage />,
        },
        {
          path: `${BO_ROUTES.CUSTOMER_SUPPORT.SEARCH_INQUIRIES.children.INQUIRY_DETAIL.path}/:id`,
          element: <CustomerSupportInquiryDetailPage />,
        },
        {
          path: '', // Empty path to match the root
          element: (
            <Navigate to={BO_ROUTES.CUSTOMER_SUPPORT.SEARCH_INQUIRIES.path} />
          ),
        },
      ],
};
