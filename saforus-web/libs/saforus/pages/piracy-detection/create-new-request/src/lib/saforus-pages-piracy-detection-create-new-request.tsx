/* eslint-disable-next-line */
import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import SaforusContainersPiracyDetectionCreateNewRequest from '@web-workspace/saforus/containers/piracy-detection/create-new-request';
import { useTranslation } from 'react-i18next';

export function SaforusPagesPiracyDetectionCreateNewRequest() {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.piracy-detection.create-request.title')}
        desc={t('pageHeader.piracy-detection.create-request.desc')}
      />
      <SaforusContainersPiracyDetectionCreateNewRequest />
    </div>
  );
}

export default SaforusPagesPiracyDetectionCreateNewRequest;
