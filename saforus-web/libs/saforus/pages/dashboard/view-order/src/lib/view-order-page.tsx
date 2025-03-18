import DashboardViewOrderContainer from '@web-workspace/saforus/containers/dashboard/view-order';
import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import { useTranslation } from 'react-i18next';

export function DashboardViewOrderPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.dashboard.search-order.title')}
        desc={t('pageHeader.dashboard.search-order.desc')}
      />
      <DashboardViewOrderContainer />
    </div>
  );
}

export default DashboardViewOrderPage;
