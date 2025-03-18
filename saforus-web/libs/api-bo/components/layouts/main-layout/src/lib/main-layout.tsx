import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';
import Avatar from '@web-workspace/shared/components/widgets/avatar';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import NavbarContainer from '@web-workspace/api-bo/components/layouts/navbar';
import SideMenuContainer from '@web-workspace/api-bo/components/layouts/side-menu';
// For check expired token
import useSetExpiredTime from './hook-use-set-expried-time';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

export type MainLayoutProps = {
  children: React.ReactNode;
  navbarCss?: React.CSSProperties;
  sideBarCss?: React.CSSProperties;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navbarCss,
  sideBarCss,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { mainLayoutCss } = useSnapshot(MainLayoutStore);
  const [gnbMenuEl, setGnbMenuEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setGnbMenuEl(event.currentTarget);
  };
  const handleClose = () => {
    setGnbMenuEl(null);
  };

  const { userInfo, isExpired, setIsExpired, clearAuthState } =
    useSnapshot(CsApiBoAuthStore);

  const handleLogout = () => {
    clearAuthState();
    navigate(API_BO_ROUTES.LOGIN.path, { replace: true });
  };

  const handlelogoutConfirmation = () => {
    DialogStore.openDialog({
      name: DialogType.LogoutConfirm,
      props: {
        onLogout: () => {
          handleLogout();
        },
      },
    });
  };

  const [remaining24, is24Expired] = useSetExpiredTime(
    Number(localStorage.getItem('Expired'))
  );

  useEffect(() => {
    if (isExpired || is24Expired) {
      DialogStore.openDialog({
        name: DialogType.SessionExpired,
        props: {
          handleLogout: () => {
            setIsExpired(false);
            handleLogout();
          },
        },
      });
    }
  }, [isExpired, is24Expired]);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisited');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisited', 'true');
    }

    return () => {
      localStorage.removeItem('hasVisited');
    };
  }, []);

  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView();
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideMenuContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          background: 'var(--base-white)',
        }}
      >
        <NavbarContainer logo="none" sx={navbarCss}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '8px',
              gap: '8px',
            }}
          >
            <Avatar
              showName={true}
              showStatus={false}
              disabled={true} // Disable click action
              size={32}
              name={userInfo?.accountName || 'Guest'}
              nameStyle={{
                color: 'var(--gray-700)',
                fontWeight: 700,
                maxWidth: '80px',
              }}
              avatarUrl={''}
              // falback to default icon
              avatarIcon={<Icon name={'fav-icon'} size={18} color="none" />}
            />
            <Button
              sx={{
                minWidth: '36px',
                padding: 0,
                background: 'var(--neutral-100)',
              }}
              onClick={handleClick}
            >
              <Icon name="burger-menu-big" color="var(--gray-50)" />
            </Button>
          </Box>
          <Menu
            anchorEl={gnbMenuEl}
            open={Boolean(gnbMenuEl)}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              'aria-labelledby': 'GNB Menu',
              sx: {
                padding: 0,
              },
            }}
            PaperProps={{
              sx: {
                marginTop: '1rem',
                border: '1px solid var(--neutral-700)',
                boxShadow: 'var(--shadow-xsm)',
                borderRadius: '5px',
                minWidth: '150px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              onClick={handlelogoutConfirmation}
              sx={{ padding: '0.7rem 1rem', color: 'var(--red-500)' }}
            >
              {t('gnbmenu.logout')}
            </MenuItem>
          </Menu>
        </NavbarContainer>

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Box
            ref={refToTop}
            component="main"
            sx={{
              width: '100%',
              minHeight: '100%',
              padding: {
                xs: '24px 24px 40px 24px',
                desk: '24px 80px 40px 80px',
                xl: '24px 200px 40px 200px',
              },
              backgroundColor: 'var(--neutral-25)',
              ...mainLayoutCss,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
