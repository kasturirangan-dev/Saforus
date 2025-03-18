import { createBrowserRouter, Navigate } from 'react-router-dom';
import { NOT_AUTH_ROUTES } from './not-auth';
import { USER_MANAGEMENT_ROUTES } from './user-management';
import { ADMIN_DASHBOARD_ROUTES } from './admin-dashboard';
import { ORDER_MANAGEMENT_ROUTES } from './order-management';
import { CUSTOMER_SUPPORT_ROUTES } from './customer-support';
import { SETTINGS_ROUTES } from './settings';
import { SERVICE_MANAGEMENT_ROUTES } from './service-management';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';

// const Login = lazy(() => import('@web-workspace/saforus-bo/pages/login'));

// const ResetPassword = lazy(
//   () => import('@web-workspace/saforus-bo/pages/resetpassword')
// );

// const UserManagementSearchUserPage = lazy(
//   () =>
//     import('@web-workspace/saforus-bo/pages/user-management/search-and-list')
// );

// const UserManagementUserDetailPage = lazy(
//   () => import('@web-workspace/saforus-bo/pages/user-management/user-detail')
// );

// const UserManagementSearchTeamAndMembersPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/user-management/search-team-and-members'
//     )
// );

// const DashboardForensicWatermarkingPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/admin-dashboard/forensic-watermarking'
//     )
// );

// const DashboardPiracyDetectionPage = lazy(
//   () =>
//     import('@web-workspace/saforus-bo/pages/admin-dashboard/piracy-detection')
// );

// const DashboardSearchOrdersPage = lazy(
//   () => import('@web-workspace/saforus-bo/pages/admin-dashboard/search-orders')
// );

// const OrderManagementWatermarkingOrdersPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/order-management/watermarking-orders'
//     )
// );

// const OrderManagementWatermarkingDetailPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/order-management/watermarking-detail'
//     )
// );

// const OrderManagementWatermarkingDownloadFilesPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/order-management/watermarking-download-files'
//     )
// );

// const OrderManagementPiracyDetectionRequestsPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/order-management/piracy-detection-requests'
//     )
// );

// const PiracyOrderDetailPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/order-management/piracy-detection-detail'
//     )
// );

// const CustomerSupportSearchUsersPage = lazy(
//   () => import('@web-workspace/saforus-bo/pages/customer-support/search-users')
// );

// const CustomerSupportSearchInquiriesPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/customer-support/search-1-1-inquiries'
//     )
// );

// const CustomerSupportInquiryDetailPage = lazy(
//   () =>
//     import('@web-workspace/saforus-bo/pages/customer-support/inquiry-detail')
// );

// const ConfigurationForensicWatermarkingPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-configuration/forensic-watermarking'
//     )
// );

// const ConfigurationPiracyDetectionPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-configuration/piracy-detection'
//     )
// );

// const ConfigurationInquiryPage = lazy(
//   () => import('@web-workspace/saforus-bo/pages/service-configuration/inquiry')
// );

// const ConfigurationServicePlanManagerPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-configuration/service-plan-manager'
//     )
// );

// const SettingsAdminUserManagementPage = lazy(
//   () => import('@web-workspace/saforus-bo/pages/settings/admin-user-management')
// );

// const ServiceManagementNotificationManagementPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-management/notification-list'
//     )
// );

// const ServiceManagementCreateNotificationPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-management/create-notification'
//     )
// );

// const ServiceManagementEditNotificationPage = lazy(
//   () =>
//     import(
//       '@web-workspace/saforus-bo/pages/service-management/edit-notification'
//     )
// );

const AppRouter = createBrowserRouter(
  [
    {
      path: '',
      element: <Navigate to={BO_ROUTES.ADMIN_DASHBOARD.path} replace />,
    },
    // routes for visitor
    { ...NOT_AUTH_ROUTES },
    /////////////////////////////////////////////////////

    // routes for user(protected routes)
    { ...ADMIN_DASHBOARD_ROUTES },
    { ...ORDER_MANAGEMENT_ROUTES },
    { ...SERVICE_MANAGEMENT_ROUTES },
    { ...USER_MANAGEMENT_ROUTES },
    { ...CUSTOMER_SUPPORT_ROUTES },
    // { ...SERVICE_CONFIGURATION_ROUTES },
    { ...SETTINGS_ROUTES },
    ////////////////////////////////////////////////////////////
  ],
  {
    basename: '/web/bo/',
  }
);

export default AppRouter;
