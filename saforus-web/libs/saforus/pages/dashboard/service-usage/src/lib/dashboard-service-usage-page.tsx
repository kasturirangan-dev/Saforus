import DashboardServiceUsageContainer from '@web-workspace/saforus/containers/dashboard/service-usage';
import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import { useTranslation } from 'react-i18next';

export function ServiceUsagePage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.dashboard.service-usage.title')}
        desc={t('pageHeader.dashboard.service-usage.desc')}
      />
      <DashboardServiceUsageContainer />
    </div>
  );
}

export default ServiceUsagePage;
