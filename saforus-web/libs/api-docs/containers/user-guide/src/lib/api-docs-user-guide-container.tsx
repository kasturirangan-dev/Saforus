import GuideLayout from '@web-workspace/api-docs/components/guides/layout';
import GuideSection, {
  SectionContent,
  StyledAlert,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import { Trans, useTranslation } from 'react-i18next';
import { SupportedInfo } from './view/supported-info';
import { EnvironmentInfo } from './view/environment-info';
import { StructureInfo } from './view/structure-info';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

export function UserGuideContainer() {
  const { t } = useTranslation();
  return (
    <GuideLayout
      guide={[t('userGuide.title')]}
      description={t('userGuide.description')}
    >
      {/* Version */}
      <GuideSection id="version" label={t('userGuide.version.title')}>
        {t('userGuide.version.content-1')}
      </GuideSection>

      {/* Introduction */}
      <GuideSection id="introduction" label={t('userGuide.introduction.title')}>
        <SectionContent
          contentKey="userGuide.introduction.content-1"
          link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#application`}
        />
      </GuideSection>

      {/* Supported formats */}
      <GuideSection
        id="supported"
        label={t('userGuide.supported.title')}
        description={t('userGuide.supported.description')}
      >
        <SupportedInfo />
        <StyledAlert severity="info">
          <TransContent i18nKey="userGuide.supported.alert" />
        </StyledAlert>
      </GuideSection>

      {/* Serve environments */}
      <GuideSection
        id="environments"
        label={t('userGuide.environments.title')}
        description={t('userGuide.environments.description')}
      >
        <EnvironmentInfo />
        <StyledAlert severity="warning">
          <Trans i18nKey="userGuide.environments.alert" />
        </StyledAlert>
      </GuideSection>

      {/* API doc structure */}
      <GuideSection
        id="structure"
        label={t('userGuide.structure.title')}
        description={t('userGuide.structure.description')}
      >
        <StructureInfo />
      </GuideSection>
    </GuideLayout>
  );
}

export default UserGuideContainer;
