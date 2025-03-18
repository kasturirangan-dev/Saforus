import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import MyAccountContainer from '@web-workspace/saforus/containers/user-info/my-account';
import { useTranslation } from 'react-i18next';

export function MyAccountPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.user-info.my-account.title')}
        desc={t('pageHeader.user-info.my-account.desc')}
      />
      <MyAccountContainer />
    </div>
  );
}

export default MyAccountPage;
