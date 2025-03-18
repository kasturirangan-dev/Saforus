import './css/railscasts.css'; // Style for code blocks
//import 'highlight.js/styles/atom-one-dark.css'; // For Atom One Dark theme
// import 'highlight.js/styles/a11y-dark.min.css'; // Note the correct path and minified version

import { Box } from '@mui/material';
import GuideMenu, { SectionItem } from './guides-menu';
import { GuideTitle, GuideContainer } from './styled-elements';
import { useTranslation } from 'react-i18next';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Fragment, useEffect } from 'react';
import { GuideStore } from '@web-workspace/api-docs/components/guides/data';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { TextContent } from '@web-workspace/api-docs/components/guides/section';

interface GuideLayoutProps {
  guide: string[];
  description?: string | null;
  children: React.ReactNode;
  sections?: SectionItem[];
}

export function GuideLayout({
  guide,
  description,
  children,
  sections,
}: GuideLayoutProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const { setActiveSectionId, setIsObserving } = useSnapshot(GuideStore);

  // Update coded language, active section from URL
  useEffect(() => {
    if (location.hash) {
      const activeId = location.hash.slice(1);
      const element = document.getElementById(activeId);
      if (activeId && element) {
        setTimeout(() => {
          element.scrollIntoView();
          setIsObserving(false);
          setActiveSectionId(activeId);
        }, 100);
      }
    } else {
      setActiveSectionId(null);
    }
  }, [location]);

  return (
    <GuideContainer
      maxWidth={{ xs: '820px', desk: '1100px' }}
      paddingRight={{ xs: 0, desk: '280px' }}
      marginX="auto"
    >
      {/* Headedr */}
      <Box display="flex" flexDirection="column" gap="10px">
        <GuideTitle>
          <span>{t('guide-menu.guide')}</span>
          {guide.map((page, index) => (
            <Fragment key={index}>
              <ChevronRightIcon fontSize="small" />
              <span>{page}</span>
            </Fragment>
          ))}
        </GuideTitle>
        {description && <TextContent>{description}</TextContent>}
      </Box>

      {/* Menu */}
      <Box
        position="fixed"
        top="98px"
        left="calc(50% + 440px)"
        width="240px"
        display={{ xs: 'none', desk: 'block' }}
      >
        <GuideMenu sections={sections} />
      </Box>

      {/* Content */}
      <GuideContainer>{children}</GuideContainer>
    </GuideContainer>
  );
}

export default GuideLayout;
