import React, { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { PaymentProvider } from '@web-workspace/saforus/common/model';
import NavbarContainer, {NavbarActions} from '@web-workspace/api-doc/components/layouts/navbar';
import SideMenuContainer from '@web-workspace/api-doc/components/layouts/side-menu';
import Avatar from '@web-workspace/shared/components/widgets/avatar';
import { MainLayoutProps } from './interface';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useIdleTimer } from 'react-idle-timer';
import UserTypeLabel from './views/user-type-label';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import useSetExpiredTime from '@web-workspace/saforus/components/layouts/hook-use-set-expried-time';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import CommonStore, {
  QUERY_COMMON_KEY,
} from '@web-workspace/saforus/common/data';
import { useQueryClient } from 'react-query';
import useLayoutData from './data';
import NotificationBanner from '@web-workspace/saforus/components/layouts/notification-banner';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import { setReturnLocation } from '@web-workspace/shared/helpers/routes';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

const translatePrefix = 'gnbmenu';

const MENU_ITEMS = [
  {
    path: ROUTES.USER_INFO.ROOT,
    translationKey: `${translatePrefix}.user-info`,
  },
  {
    path: ROUTES.USER_INFO.TEAM.path,
    translationKey: `${translatePrefix}.team-members`,
  },
  {
    path: ROUTES.USER_INFO.SERVICE_PLAN.path,
    translationKey: `${translatePrefix}.service-plan`,
  },
  // {
  //   path: ROUTES.USER_INFO.ADMIN_PAGE.path,
  //   translationKey: `${translatePrefix}.admin-page`,
  // },
  {
    path: ROUTES.HELP.HELP_CENTER.path,
    translationKey: `${translatePrefix}.my-inquiries`,
  },
];

const MainLayout: React.FC<MainLayoutProps> =  ({
  children,
  navbarCss,
  additionalNavbarCss,
  sideBarCss,
  ast,
}) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const { setLoading } = useSnapshot(CommonStore);
  const { refetch, isLoading } = useLayoutData();

  const { mainLayoutCss } = useSnapshot(MainLayoutStore);
  const { setTeam } = useSnapshot(UserTeamStore);
  const {
    setDevMode,
    userInfo,
    isExpired,
    timeIdle,
    timeBeforeIdle,
    setLastApiTime,
    clearAuthState,
    getUserObject,
    isLoggedIn
  } = useSnapshot(AuthStore);
  const { subscriptionPlanDetailList = [] } = userInfo || {};

  //eslint-disable-next-line
  // console.log("Received AST", ast);

  const [remaining, setRemaining] = useState<number>(timeIdle);
  // const linkSupport = getEnvVar(
  //   i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  // );
  const location = useLocation();

  const navigate = useNavigate();
  const [gnbMenuEl, setGnbMenuEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setTeam();
    clearAuthState();
    navigate(ROUTES.LOGIN.path, { replace: true });
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setGnbMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setGnbMenuEl(null);
  };

  const handleChangeDevMode = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    handleClose();
    setDevMode(checked);

    navigate(ROUTES.DASHBOARD.PACKAGES_DELIVERY.path, {
      replace: true,
    });
  };

  const hasAMP = useMemo(() => {
    if (!subscriptionPlanDetailList || !subscriptionPlanDetailList.length) {
      return null;
    }
    // check if there is any subscription plan with payment service provider AMP
    const ampSubscription = subscriptionPlanDetailList.filter(
      (e) =>
        e.paymentServiceProvider === PaymentProvider.AMP &&
        e.subscriptionStatus === 'ACTIVE'
    );
    // if there is any subscription plan with payment service provider AMP, return true
    const hasAMP = ampSubscription && ampSubscription.length > 0;
    return hasAMP;
  }, [subscriptionPlanDetailList]);

  const [remaining24, is24Expired] = useSetExpiredTime(
    Number(localStorage.getItem('Expired'))
  );

  useEffect(() => {
    if (isExpired && !ROUTES.API_DOC.path) {
      DialogStore.openDialog({ name: DialogType.ExpiredToken });
    }
    if (is24Expired && !ROUTES.API_DOC.path) {
      DialogStore.openDialog({
        name: DialogType.Session24Timeout,
        props: {
          onLogout: () => {
            setReturnLocation(location);
            handleLogout();
          },
        },
      });
    }
  }, [isExpired, is24Expired]);

  useEffect(() => {
    if (!isNotEmpty(AuthStore?.userInfo?.email)) {
      getUserObject();
    }
    // const interval = setInterval(() => {
    //   setRemaining(Math.ceil(getRemainingTime() / 1000));
    // }, 500);

    const hasVisitedBefore = localStorage.getItem('hasVisited');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisited', 'true');
    }

    return () => {
      // clearInterval(interval);
      localStorage.removeItem('hasVisited');
    };
  }, []);

  // ---- common data load meta data ----
  useEffect(() => {
    queryClient.invalidateQueries(QUERY_COMMON_KEY.META_DATA);
  }, [i18n.language]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  // common data

  const onIdle = () => {
    // NOTE: The dialog work depends on the another component, so this function is not working.
    // const now = new Date();
    // const lastApiDateTime = parseISO(lastApiTime);
    // if (differenceInMilliseconds(now, lastApiDateTime) >= timeIdle) {
    // }
    // handleLogout();
  };

  const onActive = () => {
    setLastApiTime(`${new Date()}`);
  };

  const handleStillHere = () => {
    setLastApiTime(`${new Date()}`);
    activate();
  };

  const onPrompt = () => {
    DialogStore.openDialog({
      name: DialogType.Inactive,
      props: {
        timeout: Math.ceil(timeBeforeIdle / 1000),
        onLogout: () => {
          setReturnLocation(location);
          handleLogout();
        },
        onStay: () => {
          handleStillHere();
        },
      },
    });
  };

  const { getRemainingTime, activate } = useIdleTimer({
    timeout: timeIdle,
    onActive,
    onIdle,
    onPrompt,
    promptBeforeIdle: timeBeforeIdle,
    // support cross tab
    crossTab: true,
    leaderElection: true,
    // sync time cross tab
    syncTimers: 200,
  });

  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView();
  }, [location.pathname]);
  ///////////////////////////////////////////////////////////

  // this is used for set up notification

  useEffect(() => {
    DialogStore.openDialog({
      name: DialogType.Notification,
      props: { locationPath: location.pathname },
    });
  }, [location]);
  ///////////////////////////////////////////////////////
  // get avatar url
  const { loginInformation } = useSnapshot(MyAccountStore);
  /////

  // Track page-view event after data loading success for location
  useEffect(() => {
    if (!isLoading) {
      logEventAnalytics(TrackingEvent.Default, undefined, location.pathname);
    }
  }, [location, isLoading]);

  const isFeatureEnable = false; // Added to remove certain features


  const Footer = () => {
    return (
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 1200,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'var(--base-white)', 
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="body2"
            color="var(--gray-50)"
            sx={{
              // fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              marginRight: '8px',
            }}
            component="span"
          >
            <Link to={getEnvVar(
              i18next.language === 'en' ? 'VITE_TERMS_URL' : 'VITE_TERMS_KO_URL'
            )} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('apidoc.api-footer.termsofservice')}
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              // fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              color: 'var(--neutral-750)',
              marginRight: '8px',
            }}
            component="span"
          >
            {' | '}
          </Typography>
          <Typography
            variant="body2"
            color="var(--gray-50)"
            sx={{
              // fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              // marginLeft: '8px', // Optionally add space to the left of the last item if needed
            }}
            component="span"
          >
            <Link to={getEnvVar(
              i18next.language === 'en' ? 'VITE_PRIVACY_URL' : 'VITE_PRIVACY_KO_URL'
            )} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('apidoc.api-footer.privacypolicy')}
            </Link>
          </Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="var(--gray-25)" align="center"
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '18px',
            letterSpacing: '-0.1px',
            marginRight: '8px', 
          }}
        >
        {t('apidoc.api-footer.address')}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            // fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '-0.1px',
            color: 'var(--neutral-750)',
            marginRight: '8px',
          }}
          component="span"
        >
          {' | '}
        </Typography>
        <Typography variant="body2" color="var(--gray-25)" align="center"
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '18px',
            letterSpacing: '-0.1px',
            // marginLeft: '8px', 
            textTransform: 'capitalize'
          }}
        >
          {t('apidoc.api-footer.contact')}
        </Typography>
        </Box> */}
        <Typography variant="body2" color="var(--gray-25)" align="center"
          sx={{
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: '18px',
            letterSpacing: '-0.1px',
            // marginLeft: '8px', 
          }}
        >
          ©{new Date().getFullYear()} {t('apidoc.api-footer.allrightsreserved')}
        </Typography>
      </Box>
    );
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <SideMenuContainer ast={ast} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          background: 'var(--base-white)',
        }}
      >
        <NavbarContainer logo={'none'} sx={additionalNavbarCss} mode={'light'}>
          {isFeatureEnable && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: pxToVw('16px'),
              gap: pxToVw('8px'),
              cursor: 'pointer',
            }}
          >
            <Avatar
              showName={true}
              showStatus={false}
              size={32}
              name={AuthStore.userInfo?.fullName || 'Guest'}
              nameStyle={{
                color: 'var(--gray-700)',
                fontWeight: 700,
                maxWidth: pxToVw('80px'),
              }}
              avatarUrl={loginInformation.avatar}
              // fallback to default icon
              avatarIcon={
                <Icon name={'fav-icon'} size={pxToVw(18)} color="none" />
              }
            />
            <UserTypeLabel />
            {isLoggedIn && ( // Check if user is logged in
              <>
                <Button
                  sx={{
                    minWidth: pxToVw('36px'),
                    padding: 0,
                    background: 'var(--neutral-100)',
                  }}
                  onClick={handleClick}
                >
                  <Icon name="burger-menu-big" color="var(--gray-50)" />
                </Button>
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
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {MENU_ITEMS.map((item) => {
                    if (hasAMP && item.path === ROUTES.USER_INFO.SERVICE_PLAN.path) {
                      return null;
                    }
                    return (
                      <MenuItem
                        key={item.translationKey}
                        onClick={handleClose}
                        component={Link}
                        to={item.path}
                        sx={{ padding: '0.7rem 1rem' }}
                      >
                        {t(item.translationKey)}
                      </MenuItem>
                    );
                  })}
                  <Divider sx={{ margin: '0 !important' }} />
                  <MenuItem
                    onClick={() => handleLogout()}
                    sx={{ padding: '0.7rem 1rem', color: 'var(--red-500)' }}
                  >
                    {t('gnbmenu.logout')}
                  </MenuItem>
                  {!userInfo?.master && (
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to={ROUTES.USER_INFO.ADMIN_PAGE.path}
                      sx={{ padding: '0.7rem 1rem' }}
                    >
                      {t('gnbmenu.admin-page')}
                    </MenuItem>
                  )}
                  {!userInfo?.master && (
                    <FormControlLabel
                      sx={{ paddingBottom: '0.5rem' }}
                      control={
                        <Switch
                          checked={userInfo?.devMode ?? false}
                          color="primary"
                          onChange={handleChangeDevMode}
                        />
                      }
                      label={<Typography variant="body2">Debug Mode</Typography>}
                      labelPlacement="start"
                    />
                  )}
                </Menu>
              </>
            )}
            </Box>
          )}
          {!isLoggedIn && isFeatureEnable && (
            <NavbarActions
              buttonStyles={{
                signUpButton: {
                  backgroundColor: 'var(--base-white)', color: 'var(--purple-500) !important', '&:hover': {
                    color: 'var(--purple-400) !important',
                  },
                },
                loginButton: {
                  backgroundColor: 'var(--purple-500)', color: 'var(--base-white) !important', '&:hover': {
                    backgroundColor: 'var(--purple-400)',
                  },
                }
              }}
            />
          )}
        </NavbarContainer>
        <NotificationBanner />
        <Box
          ref={refToTop}
          component="main"
          sx={{
            width: '100%',
            flexGrow: 1,
            overflow: 'auto',
            // padding: 10,
            paddingTop: pxToVw('6px'),
            // ...mainLayoutCss,
            height: '85vh',
          }}
        >
          {children}
        </Box>
      <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
