import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { MenuItem, getMenuMaster, ASTNode } from '../data';
import {
  StyledButtonBase,
  StyledDrawer,
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
import { Link } from 'react-router-dom';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import ImageLight from '../assets/logo_image_light.png';
import subArrow from '../assets/sub-arrow.png';

const LogoBeta = ({ logo }: { logo: string }) => {
  return (
    <Link
      to={getEnvVar(
        i18next.language === 'en' ? 'VITE_HOME_URL' : 'VITE_HOME_KO_URL'
      )}
      style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
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
        CS API
      </Typography>
    </Box>
        </Link>
  );
};


const SubMenu: React.FC<{
  menuItems: MenuItem[];
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
  level?: number; // Add a level prop to adjust styling for nested submenus
}> = ({ menuItems, isActive, handleMenuSelection, level = 0 }) => {
  const { t } = useTranslation();

  return (
    <List component="div" disablePadding sx={{ pl: level * 2 }}> {/* Adjust padding based on level */}
      {menuItems.map((item) => (
        <ListItem key={item.id} sx={{ paddingLeft: level === 1 ? 10 : 0, paddingRight: level === 1 ? 2 : 0, py: 0, alignItems: 'start', display: 'flex', flexDirection: level === 0 ? 'column' : 'row' }} className={(level !== 1 ? 'subHeadingMain' : '')}>
          <a href={`docs#${item.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ width: '100%', textDecoration: 'none' }}>
            <StyledSubButtonBase
              onClick={() => handleMenuSelection(item)}
              className={`${isActive(item) ? 'active' : ''} ${level !== 1 ? 'subHeading' : ''}`}
              level={level}
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              {level === 0 && (
                <StyledSubItemArrow>
                  <img src={subArrow} alt="subArrow" />
                </StyledSubItemArrow>
              )}
              <StyledSubItemText primary={item.name} level={level} />
              {item.children && <ChevronRightIcon sx={{ marginRight: pxToVw('8px'), fontSize: pxToVw('18px'), color: 'var(--gray-25)' }} />}
            </StyledSubButtonBase>
          </a>
          {item.children && (
            <SubMenu
              menuItems={item.children}
              isActive={isActive}
              handleMenuSelection={handleMenuSelection}
              level={level + 1} // Increment level for nested submenus
            />
          )}
        </ListItem>
      ))}
    </List>
  );
};

const SideMenuItem: React.FC<{
  item: MenuItem;
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
  isFirstItem: boolean; //To check if this is the first item specifically to remove/adding style for the "Version History"
}> = ({ item, isActive, handleMenuSelection, isFirstItem }) => {
  const { t } = useTranslation();

  return (
    <Box width={'100%'} className={'mainMenu'}>
      <StyledButtonBase
        onClick={() => {
          handleMenuSelection(item);
        }}
        className={isActive(item) ? 'active' : 'subMainMenu'}
        isFirst={isFirstItem}
      >
        {/* <StyledListItemIcon sx={{ marginLeft: pxToVw('12px') }}>
          {item.icon}
        </StyledListItemIcon> */}
        <StyledListItemText primary={item.name}/>
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

  return (
    <StyledTooltip
      disableFocusListener
      key={item.id}
      title={
        <Box width={pxToVw('210px')}>
          <Typography fontWeight={700} padding={pxToVw(['8px', '16px'])}>
            {item.name}
          </Typography>
          {item.children && (
            <SubMenu
              menuItems={item.children}
              isActive={isActive}
              handleMenuSelection={handleTooltipSelection}
            />
          )}
        </Box>
      }
      arrow
      placement="right"
      open={open}
      onClick={() => setOpen(true)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
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

interface SideMenuViewProps {
  ast?: ASTNode;
}

const SideMenuView: React.FC<SideMenuViewProps> = ({ ast }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { openLNB, setOpenLNB } = useSnapshot(LayoutStore);
  const [baseMenu, setBaseMenu] = useState(getMenuMaster(ast));

  useEffect(() => {
    setBaseMenu(getMenuMaster(ast));
  }, [i18next.language, ast]);

  const showMasterMenu =
    !AuthStore?.userInfo?.devMode || AuthStore?.userInfo?.master;

  const { featureFlags } = useSnapshot(FeatureFlagStore);
  // Decided menu to display based on the dev mode and feature flags
  const menuWithFeatureFlag = useMemo(() => {
    // const baseMenu = showMasterMenu ? getMenuMaster(ast) : getMenuData(ast);

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
  }, [showMasterMenu, featureFlags, baseMenu]);

  const handleDrawerClose = () => {
    setOpenLNB(!openLNB);
  };

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

  // const theme = useTheme();
  // enableCollape in desktop view
  // const enableCollape = useMediaQuery(theme.breakpoints.up('desk'));
  // // close collape for some screen
  // useEffect(() => {
  //   if (!enableCollape && openLNB) {
  //     setOpenLNB(false);
  //   }
  // }, [enableCollape]);

  return (
    <Box>
      <SideMenuIcons color="var(--purple-950)" />
      <StyledDrawer variant="permanent" open={openLNB} anchor="left">
        <Box
          sx={{
            display: 'flex',
            // visibility: enableCollape ? 'visible' : 'hidden',
            visibility: 'visible',
            justifyContent: openLNB ? 'space-between' : 'center',
            alignItems: 'center',
            padding: pxToVw(['10px', '8px']),
          }}
        >
          {openLNB && <LogoBeta logo={ImageLight} />}
          {/* <StyledButtonCollapse onClick={handleDrawerClose}>
            {openLNB ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </StyledButtonCollapse> */}
        </Box>

        <List disablePadding>
          {menuWithFeatureFlag.map((item, index) => {
            return openLNB ? (
              <ListItem key={item.id} sx={{ padding: pxToVw('8px'), paddingLeft: pxToVw('12px') }}>
                <SideMenuItem
                  item={item}
                  isActive={isActive}
                  handleMenuSelection={handleMenuNavigation}
                  isFirstItem={index === 0}
                />
              </ListItem>
            ) : (
              <ListItem key={item.id} sx={{ padding: pxToVw('8px 4px') }}>
                <FoledMenuItem
                  item={item}
                  isActive={isActive}
                  handleMenuSelection={handleMenuNavigation}
                />
              </ListItem>
            );
          })}
        </List>
      </StyledDrawer>
    </Box>
  );
};

export default SideMenuView;
