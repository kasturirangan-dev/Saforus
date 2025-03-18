import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';
import { PiracyFiles } from './view/piracy-files';
import { WatermarkFiles } from './view/wartermark-files';

export function DeleteFileApiContainer() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      guide={[t('csApi.title'), t('csApi.deleteFile.title')]}
      description={t('csApi.deleteFile.description')}
    >
      {/* Delete Original/Watermarked Files */}
      <GuideSection
        id="watermark-files"
        label={t('csApi.deleteFile.watermark.title')}
      >
        <WatermarkFiles />
      </GuideSection>

      {/* Delete Piracy Files*/}
      <GuideSection
        id="piracy-files"
        label={t('csApi.deleteFile.piracy.title')}
      >
        <PiracyFiles />
      </GuideSection>
    </GuideLayout>
  );
}

export default DeleteFileApiContainer;
