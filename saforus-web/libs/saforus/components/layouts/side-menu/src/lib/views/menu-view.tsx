import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { menuData, MenuItem, menuMaster } from '../data';
import {
  StyledButtonBase,
  StyledButtonCollapse,
  StyledListItemIcon,
  StyledListItemText,
  StyledSubButtonBase,
  StyledSubItemArrow,
  StyledSubItemText,
  StyledTooltip,
} from './styled-elements';
import SideMenuIcons from './icons';
import { useTranslation } from 'react-i18next';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import i18next from 'i18next';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  FeatureFlag,
  FeatureFlagStore,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

import { pxToVw } from '@web-workspace/saforus/common/utils';
import ImageLight from '../assets/logo_image_light.png';
import subArrow from '../assets/sub-arrow.png';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import ButtonBase from '@mui/material/ButtonBase';

const LogoBeta = ({ logo }: { logo: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'end',
        gap: '8px',
        height: `${pxToVw(38)}`,
        margin: `${pxToVw(['0px', '8px'])}`,
      }}
    >
      <img
        src={logo}
        alt="logo"
        title="logo"
        style={{
          height: '100%',
        }}
        loading="lazy"
      />
      <Typography
        variant="caption"
        sx={{
          color: 'var(--purple-600)',
          backgroundColor: 'var(--purple-25)',
          padding: pxToVw(['0.125rem', '0.5rem']),
          borderRadius: pxToVw('5px'),
          fontWeight: 500,
          fontSize: pxToVw('13px'),
          lineHeight: pxToVw('18px'),
        }}
      >
        Beta
      </Typography>
    </Box>
  );
};

const SubMenu: React.FC<{
  menuItems: MenuItem[];
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
}> = ({ menuItems, isActive, handleMenuSelection }) => {
  const { t } = useTranslation();

  return (
    <List disablePadding>
      {menuItems.map((item) => (
        <ListItem key={item.id} sx={{ px: 0, py: 0 }}>
          <StyledSubButtonBase
            onClick={() => handleMenuSelection(item)}
            className={isActive(item) ? 'active' : ''}
          >
            <StyledSubItemArrow>
              <img src={subArrow} alt="subArrow" />
            </StyledSubItemArrow>
            <StyledSubItemText primary={t(item.name)} />
            <ChevronRightIcon
              sx={{
                marginRight: pxToVw('8px'),
                fontSize: pxToVw('18px'),
                color: 'var(--gray-25)',
              }}
            />
          </StyledSubButtonBase>
        </ListItem>
      ))}
    </List>
  );
};

const SideMenuItem: React.FC<{
  item: MenuItem;
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
}> = ({ item, isActive, handleMenuSelection }) => {
  const { t } = useTranslation();

  return (
    <Box width={'100%'}>
      <StyledButtonBase
        onClick={() => {
          handleMenuSelection(item);
        }}
        className={isActive(item) ? 'active' : ''}
      >
        <StyledListItemIcon sx={{ marginLeft: pxToVw('12px') }}>
          {item.icon}
        </StyledListItemIcon>
        <StyledListItemText primary={t(item.name)} />
      </StyledButtonBase>
      {item.children && (
        <SubMenu
          menuItems={item.children}
          isActive={isActive}
          handleMenuSelection={handleMenuSelection}
        />
      )}
    </Box>
  );
};
const FoledMenuItem: React.FC<{
  item: MenuItem;
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
}> = ({ item, isActive, handleMenuSelection }) => {
  const { t } = useTranslation();

  // Use the open state to control the tooltip visibility
  const [open, setOpen] = React.useState(false);
  // Close the tooltip when the selected subMenu
  const handleTooltipSelection = (item: MenuItem) => {
    setOpen(false);
    handleMenuSelection(item);
  };

  const hasChildren = item.children && item.children.length > 0;
  return (
    <StyledTooltip
      disableFocusListener
      key={item.id}
      title={
        <Box width={pxToVw('210px')}>
          {hasChildren ? (
            <>
              <Typography fontWeight={700} padding={pxToVw(['8px', '16px'])}>
                {t(item.name)}
              </Typography>
              <SubMenu
                menuItems={item.children}
                isActive={isActive}
                handleMenuSelection={handleTooltipSelection}
              />
            </>
          ) : (
            <ButtonBase onClick={() => handleTooltipSelection(item)}>
              <Typography fontWeight={700} padding={pxToVw(['8px', '16px'])}>
                {t(item.name)}
              </Typography>
            </ButtonBase>
          )}
        </Box>
      }
      arrow
      placement="right"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(true)}
      // Set the enterTouchDelay
      // The tooltip appears immediately after tapping the informational element.
      enterTouchDelay={50}
      leaveTouchDelay={5000}
    >
      <StyledButtonBase className={isActive(item) ? 'active' : ''}>
        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
      </StyledButtonBase>
    </StyledTooltip>
  );
};

const SideMenuView: React.FC<{
  isSpread: boolean;
  handleCollapse: () => void;
}> = ({ isSpread, handleCollapse }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const showMasterMenu =
    !AuthStore?.userInfo?.devMode || AuthStore?.userInfo?.master;

  const { featureFlags } = useSnapshot(FeatureFlagStore);
  // Decided menu to display based on the dev mode and feature flags
  const menuWithFeatureFlag = useMemo(() => {
    const baseMenu = showMasterMenu ? menuMaster : menuData;
    return baseMenu.filter((route) => {
      if (
        route.path === ROUTES.FORENSIC_WATERMARKING.ROOT &&
        !isFeatureEnabled(FeatureFlag.FWM)
      ) {
        return false;
      }
      if (
        route.path === ROUTES.PIRACY_DETECTION.ROOT &&
        !isFeatureEnabled(FeatureFlag.PD)
      ) {
        return false;
      }
      return true;
    });
  }, [showMasterMenu, featureFlags]);

  const isActive = (item: MenuItem) => {
    return path.startsWith(item.path);
  };

  const handleMenuNavigation = (item: MenuItem) => {
    if (!item) {
      return;
    }

    navigate(item.path);
    if (item.linkEn && item.linkKo && !AuthStore?.userInfo?.devMode) {
      window.open(
        i18next.language === 'en' ? item.linkEn : item.linkKo,
        '_blank'
      );
    }
  };

  return (
    <Box height={'100%'} width={'100%'}>
      <SideMenuIcons color="var(--purple-950)" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: isSpread ? 'space-between' : 'center',
          alignItems: 'center',
          padding: pxToVw(['10px', '8px']),
        }}
      >
        {isSpread && (
          <Link
            to={getEnvVar(
              i18next.language === 'en' ? 'VITE_HOME_URL' : 'VITE_HOME_KO_URL'
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <LogoBeta logo={ImageLight} />
          </Link>
        )}

        <StyledButtonCollapse onClick={handleCollapse}>
          {isSpread ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </StyledButtonCollapse>
      </Box>

      <List disablePadding>
        {menuWithFeatureFlag.map((item) => {
          return isSpread ? (
            <ListItem key={item.id} sx={{ padding: pxToVw('8px') }}>
              <SideMenuItem
                item={item}
                isActive={isActive}
                handleMenuSelection={handleMenuNavigation}
              />
            </ListItem>
          ) : (
            <ListItem key={item.id} sx={{ padding: pxToVw(['8px', '4px']) }}>
              <FoledMenuItem
                item={item}
                isActive={isActive}
                handleMenuSelection={handleMenuNavigation}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideMenuView;
