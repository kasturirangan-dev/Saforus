import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import ServicePlanContainer from '@web-workspace/saforus/containers/user-info/service-plan';
import { useTranslation } from 'react-i18next';

export function ServicePlanPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.user-info.service-plan.title')}
        desc={t('pageHeader.user-info.service-plan.desc')}
      />
      <ServicePlanContainer />
    </div>
  );
}

export default ServicePlanPage;
