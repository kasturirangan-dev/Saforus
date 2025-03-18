import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import MyInquiryContainer from '@web-workspace/saforus/containers/help/inquiry';
import { useTranslation } from 'react-i18next';

export function SaforusMyInquiryPage() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.help-center.title')}
        desc={t('pageHeader.help-center.desc')}
      />
      <MyInquiryContainer />
    </div>
  );
}

export default SaforusMyInquiryPage;
