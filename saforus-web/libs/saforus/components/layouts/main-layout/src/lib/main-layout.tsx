import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
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
import NavbarContainer from '@web-workspace/saforus/components/layouts/navbar';
import SideMenuContainer from '@web-workspace/saforus/components/layouts/side-menu';
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
import WatermarkingStore from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
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
import useSubscription from '@web-workspace/shared/hooks/use-subscription';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

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

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navbarCss,
  additionalNavbarCss,
  sideBarCss,
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
  } = useSnapshot(AuthStore);
  const { subscriptionPlanDetailList = [] } = userInfo || {};
  const { loginInformation, setIncorrectPasswordCount } =
    useSnapshot(MyAccountStore);
  const { subscriptionPlanDetail } = useSnapshot(useSubscription);
  const isFree =
    subscriptionPlanDetail?.subscriptionCostType?.toLowerCase() === 'free';
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
    setIncorrectPasswordCount(0);
    navigate(ROUTES.LOGIN.path, { replace: true });
    handleClose();
    localStorage.removeItem('popUpShown');
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
    if (isExpired) {
      DialogStore.openDialog({ name: DialogType.ExpiredToken });
    }
    if (is24Expired) {
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
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    const hasVisitedBefore = localStorage.getItem('hasVisited');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisited', 'true');
    }
    localStorage.removeItem('popUpShown');
    return () => {
      clearInterval(interval);
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

  const dontShowDialog = (delay: '1day') => {
    const now = new Date();
    let endDate;
    if (delay === '1day') {
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      localStorage.setItem(
        'ANNOUNCEMENT_POPUP_COOLDOWN',
        endDate.toISOString()
      );
    }
  };

  const featureEnabled = isFeatureEnabled(FeatureFlag.SHOW_ANNOUCEMENT);
  useEffect(() => {
    const popUpShown = localStorage.getItem('popUpShown');
    const hideDialogUntil = localStorage.getItem('ANNOUNCEMENT_POPUP_COOLDOWN');
    const now = new Date();
    const timeoutExpired = new Date(hideDialogUntil) <= now;
    if (featureEnabled) {
      if (!popUpShown && featureEnabled && timeoutExpired && !isLoading) {
        localStorage.setItem('popUpShown', 'true');
        DialogStore.openDialog({
          name: DialogType.Announcement,
          props: { onclose, dontShowDialog },
        });
      }
    }
  }, [isLoading, featureEnabled]);
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

  // this is used for scroll to top of page when change step in watermarking create
  const { createStep } = useSnapshot(WatermarkingStore);

  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView();
  }, [location.pathname, createStep]);
  ///////////////////////////////////////////////////////////

  // this is used for set up notification
  useEffect(() => {
    DialogStore.openDialog({
      name: DialogType.Notification,
      props: { locationPath: location.pathname },
    });
  }, [location]);
  ///////////////////////////////////////////////////////

  // Track page-view event after data loading success for location
  useEffect(() => {
    if (!isLoading) {
      logEventAnalytics(TrackingEvent.Default, undefined, location.pathname);
    }
  }, [location, isLoading]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideMenuContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          background: 'var(--neutral-500)',
        }}
      >
        <NavbarContainer logo={'none'} sx={additionalNavbarCss} mode={'light'}>
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
              avatarUrl={loginInformation?.avatar}
              // falback to default icon
              avatarIcon={
                <Icon name={'fav-icon'} size={pxToVw(18)} color="none" />
              }
            />
            <UserTypeLabel />
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
                marginTop: '20px',
                border: '1px solid var(--neutral-750)',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: '5px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {MENU_ITEMS.map((item) => {
              if (
                (hasAMP || isFree) &&
                item.path === ROUTES.USER_INFO.SERVICE_PLAN.path
              ) {
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
              onClick={handlelogoutConfirmation}
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
        </NavbarContainer>
        <NotificationBanner />
        <Box sx={{ flexGrow: 1, overflow: 'auto', scrollbarGutter: 'stable' }}>
          <Box
            ref={refToTop}
            component="main"
            sx={{
              width: '100%',
              minHeight: '100%',
              padding: 10,
              paddingTop: 6,
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
