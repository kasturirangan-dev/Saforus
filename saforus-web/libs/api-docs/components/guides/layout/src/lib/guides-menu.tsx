import { MenuTitle, MenuItem, MenuBox } from './styled-elements';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { GuideStore } from '@web-workspace/api-docs/components/guides/data';
import i18next from 'i18next';

export interface SectionItem {
  id: string;
  name: string;
  level: number;
  children?: SectionItem[];
}

interface GuideMenuProps {
  sections?: SectionItem[];
}

const useSections = () => {
  const [sections, setSections] = useState<SectionItem[]>([]);
  useEffect(() => {
    const flatSections = Array.from(document.querySelectorAll('h2, h3'))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        name: element.textContent ?? '',
        level: Number(element.tagName.substring(1)) - 1,
      }));
    const nestedSections = flatSections.reduce<SectionItem[]>(
      (acc, element) => {
        if (element.level === 1) {
          acc.push(element);
        } else if (acc.length > 0) {
          // Nested sections (h3) only if there's a parent (h2)
          const parent = acc[acc.length - 1];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(element);
        }
        return acc;
      },
      []
    );
    setSections(nestedSections);
  }, [i18next.language]);
  return sections;
};

const useVisibleSection = (sectionIds: string[]) => {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    // Observer section on top of viewport
    const options = {
      root: null, // viewport
      rootMargin: `0px 0px -${window.innerHeight - 140}px  0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, [sectionIds]);

  return activeId;
};

// Using sections prop or auto generate sections list  to render menu
export function GuideMenu({ sections }: GuideMenuProps) {
  const { t } = useTranslation();
  const headingSections = useSections();
  const guideSections = sections || headingSections;
  const { activeSectionId, setActiveSectionId, isObserving, setIsObserving } =
    useSnapshot(GuideStore);

  const observeSectionIds = guideSections.flatMap((section) => [
    section.id,
    ...(section.children?.map((child) => child.id) || []),
  ]);
  const activeId = useVisibleSection(observeSectionIds);

  //If have scroll event update active section by intersection observer
  useEffect(() => {
    if (isObserving && activeId) {
      setActiveSectionId(activeId);
    }
  }, [isObserving, activeId]);

  // isObserving: true
  // Detect scroll event of main component
  useEffect(() => {
    const mainParent = document.querySelector('main')?.parentElement;
    if (mainParent) {
      const handleScroll = () => {
        setIsObserving(true);
      };
      mainParent.addEventListener('scroll', handleScroll);

      return () => {
        mainParent.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <MenuBox>
      <MenuTitle>{t('guide-menu.contents')}</MenuTitle>
      {guideSections.map((section) => (
        <MenuBox key={section.id}>
          <MenuItem className={section.id === activeSectionId ? 'active' : ''}>
            <Link to={`#${section.id}`}>{section.name}</Link>
          </MenuItem>
          {section?.children && section.children.length > 0 && (
            <MenuBox
              paddingLeft="10px"
              borderLeft="2px solid var(--neutral-600)"
            >
              {section.children?.map((child) => (
                <MenuItem
                  key={child.id}
                  className={child.id === activeSectionId ? 'active' : ''}
                >
                  <Link to={`#${child.id}`}>{child.name}</Link>
                </MenuItem>
              ))}
            </MenuBox>
          )}
        </MenuBox>
      ))}
    </MenuBox>
  );
}

export default GuideMenu;
