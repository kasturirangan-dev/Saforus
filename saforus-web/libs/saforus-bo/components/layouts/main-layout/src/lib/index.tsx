import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';

import SideMenu from './view/side-menu';
// import { MainLayoutProps } from './interface';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import Navbar from './view/navbar';
import CommonStore, {
  QUERY_COMMON_KEY,
} from '@web-workspace/saforus-bo/common/data';
import { useQueryClient } from 'react-query';
import useLayoutData from './data';
import { useLocation } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import LangBanner from '@web-workspace/saforus-bo/components/service-management/create-notification/select-language';

const StyledButtonSupport = styled(Button)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '22px',
  color: 'var(--neutral-600)',
  textTransform: 'none',
}));

const customNavbarCss = {
  padding: '0 2rem !important',
  background: 'var(--main-brand-color3)',
};

export type MainLayoutProps = {
  children: React.ReactNode;
  navbarCss?: React.CSSProperties;
  additionalNavbarCss?: React.CSSProperties;
  sideBarCss?: React.CSSProperties;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navbarCss = customNavbarCss,
  additionalNavbarCss,
  sideBarCss,
}) => {
  const { i18n } = useTranslation();
  const { isLoading } = useLayoutData();
  const queryClient = useQueryClient();
  const { setLoading } = useSnapshot(CommonStore);
  const { mainLayoutCss } = useSnapshot(MainLayoutStore);
  const location = useLocation();
  const { isExpired } = useSnapshot(BoAuthStore);

  useEffect(() => {
    if (isExpired) {
      DialogStore.openDialog({ name: DialogType.BoExpiredToken });
    }
  }, [isExpired]);

  useEffect(() => {
    queryClient.invalidateQueries(QUERY_COMMON_KEY.META_DATA);
  }, [i18n.language]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const matchPath = () => {
    const createNewNoticePath =
      BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children
        .CREATE_NEW_NOTICE.path;
    const EditNoticePath =
      BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children.EDIT_NOTICE
        .path;
    if (
      location.pathname === createNewNoticePath ||
      location.pathname.includes(EditNoticePath)
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--neutral-500)',
      }}
    >
      <Navbar />
      <Box sx={{ display: 'flex', overflow: 'auto', height: '100%' }}>
        <SideMenu />
        <Box
          id="main-container"
          sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexGrow: 1,
            padding: matchPath() ? 0 : '3.125rem 2.8125rem',
            ...mainLayoutCss,
          }}
        >
          {matchPath() && <LangBanner />}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
