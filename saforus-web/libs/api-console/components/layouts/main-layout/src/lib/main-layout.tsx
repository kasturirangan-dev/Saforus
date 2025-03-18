import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import Avatar from '@web-workspace/shared/components/widgets/avatar';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import SideMenuContainer from '@web-workspace/api-console/components/layouts/side-menu';
import useLayoutData from './data';
// For check expired token
import useSetExpiredTime from './hook-use-set-expried-time';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import MyAccountStore from '@web-workspace/api-console/components/my-account/data';
import { isGuestUser } from './utils';
import { ViewOrderStore } from '@web-workspace/api-console/components/view-orders/data';
import { setReturnLocation } from '@web-workspace/shared/helpers/routes';

export type MainLayoutProps = {
  children: React.ReactNode;
  navbarCss?: React.CSSProperties;
  sideBarCss?: React.CSSProperties;
};

const translatePrefix = 'apiGnbmenu';

const MENU_ITEMS = [
  {
    path: API_ROUTES.USER_INFO.CURRENT_PLAN.path,
    translationKey: `${translatePrefix}.currentPlan`,
  },
  {
    path: API_ROUTES.USER_INFO.PAYMENT_MANAGEMENT.path,
    translationKey: `${translatePrefix}.paymentManagement`,
  },
];

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '16px',
    border: '1px solid var(--neutral-750)',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: '5px',
    minWidth: '150px',
  },
  '& .MuiList-root': {
    padding: '4px 0px',
  },
  '& .MuiMenuItem-root': {
    justifyContent: 'space-between',
    gap: '8px',

    height: '40px',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.1px',
  },
}));

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
    if (isGuestUser()) {
      onGuestInteraction(event);
    } else {
      setGnbMenuEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setGnbMenuEl(null);
  };

  const { userInfo, isExpired, setIsExpired, clearAuthState } =
    useSnapshot(CsApiAuthStore);
  const { profile, setIncorrectPasswordCount } = useSnapshot(MyAccountStore);
  const { isLoading } = useLayoutData();
  const handleLogout = () => {
    clearAuthState();
    setIncorrectPasswordCount(0);
    navigate(API_ROUTES.LOGIN.path, { replace: true });
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
    const isGuest = isGuestUser();
    if ((isExpired || is24Expired) && !isGuest) {
      DialogStore.openDialog({
        name: DialogType.SessionExpired,
        props: {
          handleLogout: () => {
            setIsExpired(false);
            // Set return location for current plan page
            if (location.pathname === API_ROUTES.USER_INFO.CURRENT_PLAN.path) {
              setReturnLocation(location);
            }
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

  const { resetViewOrderStore } = useSnapshot(ViewOrderStore);
  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView();

    // Reset view order store when navigating to other pages
    if (!location.pathname.startsWith(API_ROUTES.VIEW_ORDERS.ROOT)) {
      resetViewOrderStore();
    }
  }, [location.pathname]);

  const onGuestInteraction = (e: MouseEventHandler) => {
    const target = e.target as HTMLElement;

    const button = Boolean(target.closest('button'));
    const isSelection =
      target.classList.contains('MuiMenuItem-root') ||
      target.classList.contains('MuiAutocomplete-option') ||
      target.classList.contains('MuiIconButton-root');

    if (button || isSelection) {
      DialogStore.openDialog({
        name: DialogType.GuestRedirect,
      });
      if (!isSelection) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavbarContainer type="login" sx={navbarCss}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '8px',
            gap: '8px',
          }}
        >
          <IconButton
            className={gnbMenuEl ? 'active' : ''}
            sx={{
              minWidth: '24px',
              padding: '4px',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'var(--neutral-500)',
              },
              '&.active': {
                backgroundColor: 'var(--neutral-100)',
              },
            }}
            onClick={handleClick}
          >
            <Icon name="burger-menu-big" color="var(--gray-50)" />
          </IconButton>
        </Box>
        <StyledMenu
          anchorEl={gnbMenuEl}
          open={Boolean(gnbMenuEl)}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'GNB Menu',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem component={Link} to={API_ROUTES.USER_INFO.ROOT}>
            <Avatar
              showName={true}
              showStatus={false}
              size={32}
              name={profile?.accountName || 'Guest'}
              style={{ gap: '8px' }}
              nameStyle={{
                color: 'var(--gray-700)',
                fontWeight: 400,
                maxWidth: '160px',
              }}
              avatarUrl={profile?.avatarPreview}
              avatarIcon={
                <Icon name={'avatar'} size={18} color="var(--base-white)" />
              }
            />
            <ChevronRightIcon
              sx={{
                fontSize: '16px',
                color: 'var(--gray-25)',
              }}
            />
          </MenuItem>
          {MENU_ITEMS.map((item) => {
            return (
              <MenuItem
                key={item.translationKey}
                onClick={handleClose}
                component={Link}
                to={item.path}
              >
                {t(item.translationKey)}
              </MenuItem>
            );
          })}

          <MenuItem
            onClick={handlelogoutConfirmation}
            sx={{ color: 'var(--red-500)' }}
          >
            {t('gnbmenu.logout')}
          </MenuItem>
        </StyledMenu>
      </NavbarContainer>
      <Box sx={{ display: 'flex', overflow: 'auto', height: '100%' }}>
        <SideMenuContainer />

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
              backgroundColor: 'var(--neutral-50)',
              ...mainLayoutCss,
            }}
            // if is guess user, disable all event
            onClickCapture={(e) => {
              if (isGuestUser()) {
                onGuestInteraction(e);
              }
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
