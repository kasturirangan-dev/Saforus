import MainLayout from '@web-workspace/saforus-bo/components/layouts/main-layout';
import { Navigate, Outlet } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import WithBoAuth from '@web-workspace/shared/components/hocs/with-bo-auth';
import ConfigurationForensicWatermarkingPage from '@web-workspace/saforus-bo/pages/service-configuration/forensic-watermarking';
import ConfigurationPiracyDetectionPage from '@web-workspace/saforus-bo/pages/service-configuration/piracy-detection';
import ConfigurationInquiryPage from '@web-workspace/saforus-bo/pages/service-configuration/inquiry';
import ConfigurationServicePlanManagerPage from '@web-workspace/saforus-bo/pages/service-configuration/service-plan-manager';

export const SERVICE_CONFIGURATION_ROUTES = {
  path: BO_ROUTES.SERVICE_CONFIGURATION.ROOT,
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
      path: BO_ROUTES.SERVICE_CONFIGURATION.FORENSIC_WATERMARKING.path,
      element: <ConfigurationForensicWatermarkingPage />,
    },
    {
      path: BO_ROUTES.SERVICE_CONFIGURATION.PIRACY_DETECTION.path,
      element: <ConfigurationPiracyDetectionPage />,
    },
    {
      path: BO_ROUTES.SERVICE_CONFIGURATION.INQUIRY.path,
      element: <ConfigurationInquiryPage />,
    },
    {
      path: BO_ROUTES.SERVICE_CONFIGURATION.SERVICE_PLAN_MANAGER.path,
      element: <ConfigurationServicePlanManagerPage />,
    },
    {
      path: '', // Empty path to match the root
      element: (
        <Navigate
          to={BO_ROUTES.SERVICE_CONFIGURATION.FORENSIC_WATERMARKING.path}
        />
      ),
    },
  ],
};
