import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export interface DynamicMetatagContainerProps {
  title?: string | null;
  desc?: string | null;
  keywords?: string | null;
  image?: string | null;
}

export function DynamicMetatagContainer({
  title,
  desc,
  keywords,
  image,
}: DynamicMetatagContainerProps) {
  const { t } = useTranslation();

  const metaTitle = title || t('pageHeader.home.title') || '';
  const metaDescription = desc || t('pageHeader.home.desc') || '';
  const metaKeywords = keywords || t('pageHeader.home.keywords') || '';
  /*
  SF-2678: Added meta image tags.
  Available meta images:
  - https://de6nscivdttxy.cloudfront.net/common/meta-600x315.png
  - https://de6nscivdttxy.cloudfront.net/common/meta-200x200.png
  - https://de6nscivdttxy.cloudfront.net/common/meta-1200x630.png
  Currently, the same image link is used across all environments (development, staging, and production).
  */
  const metaImage =
    image || 'https://de6nscivdttxy.cloudfront.net/common/meta-1200x630.png';

  return (
    <Helmet defer={false}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
    </Helmet>
  );
}

export default DynamicMetatagContainer;
