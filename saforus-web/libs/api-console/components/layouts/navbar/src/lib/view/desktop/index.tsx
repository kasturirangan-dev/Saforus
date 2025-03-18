import { Box, styled } from '@mui/material';
import React, { useMemo } from 'react';
import LanguageMenu from '@web-workspace/shared/components/widgets/langmenu';
import { useTranslation } from 'react-i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import MuiButton from '@mui/material/Button';
import NonLoginActions from './non-login-action';

export interface TabItem {
  name: string;
  path: string;
  appName?: string;
}

const translateTabPrefix = 'apiTabmenu';

const TabButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 'var(--space-8)',

  fontWeight: 400,
  color: 'var(--gray-100)',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: 'var(--neutral-100)',
  },
  '&.active': {
    fontWeight: 600,
    color: 'var(--purple-500)',
  },
}));

export interface DesktopNavbarActionsProps {
  type?: 'login' | 'non-login';
  showTabs?: boolean;
  children?: React.ReactNode;
}

export const DesktopNavbarActions = (props: DesktopNavbarActionsProps) => {
  const { type = 'non-login', showTabs = true, children } = props;
  const { t, i18n } = useTranslation();

  const appName = getEnvVar('VITE_APP_NAME');
  const linkDocs = getEnvVar('VITE_API_DOC_URL');
  const linkConsole = getEnvVar('VITE_API_CONSOLE_URL');
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const tabRoutes: TabItem[] = [
    // { name: 'introduction', path: '' },
    { name: 'docs', path: linkDocs, appName: 'Saforus-api-docs' },
    {
      name: 'console',
      path: linkConsole,
      appName: 'Saforus-cs-api',
    },
    { name: 'contact-us', path: linkSupport },
  ];
  const currentTab = useMemo(() => {
    const tab = tabRoutes.find((tab) => tab.appName === appName);
    return tab?.name;
  }, []);

  const tabClick = (tab: TabItem) => {
    if (currentTab === tab.name || !tab.path) return;
    window.open(tab.path, '_blank');
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {showTabs && (
        <Box
          sx={{
            marginLeft: '16px',
            marginRight: 'auto',
            display: 'flex',
            gap: '4px',
          }}
        >
          {tabRoutes.map((tab, index) => (
            <TabButton
              key={index}
              className={currentTab === tab.name ? 'active' : ''}
              onClick={() => {
                tabClick(tab);
              }}
            >
              {t(`${translateTabPrefix}.${tab.name}`)}
            </TabButton>
          ))}
        </Box>
      )}
      {type === 'non-login' && <NonLoginActions />}
      <LanguageMenu type="dropdown" />
      {children}
    </Box>
  );
};

export default React.memo(DesktopNavbarActions);
