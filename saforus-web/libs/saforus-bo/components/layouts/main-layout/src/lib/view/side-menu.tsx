import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { menuData, MenuItem } from '../data/side-menu';
import {
  StyledButtonBase,
  StyledDrawer,
  StyledListItemIcon,
  StyledListItemText,
  StyledSubButtonBase,
  StyledBoxContainer,
  StyledButtonCollapse,
  StyledTooltip,
} from './styled-elements';
import SideMenuIcons from './icons';
import { subArrowId } from './icons/sub-arrow';
import { useTranslation } from 'react-i18next';
import { subArrowActiveId } from './icons/sub-arrow-purple';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import i18next from 'i18next';

const SubMenu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const handleSubMenuNavigation = (item: MenuItem) => {
    navigate(item.path);
    if (item.linkEn && item.linkKo) {
      window.open(
        i18next.language === 'en' ? item.linkEn : item.linkKo,
        '_blank'
      );
    }
  };
  return (
    <List component="div" disablePadding>
      {menuItems.map((item) => (
        <ListItem key={item.id} sx={{ px: 2, py: 0 }}>
          <StyledSubButtonBase
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 0,
            }}
            onClick={() => handleSubMenuNavigation(item)}
            className={isActive(item.path) ? 'active' : ''}
          >
            <StyledListItemIcon>
              <svg style={{ width: 24, height: 24 }}>
                <use
                  xlinkHref={`#${
                    isActive(item.path) ? subArrowActiveId : subArrowId
                  }`}
                ></use>
              </svg>
            </StyledListItemIcon>
            <StyledListItemText
              primary={t(item.name)}
              sx={{
                color: isActive(item.path)
                  ? 'var(--purple-200)'
                  : 'var(--base-white)',
                '& .MuiTypography-root': {
                  fontWeight: isActive(item.path) ? 600 : 400,
                },
              }}
            />
          </StyledSubButtonBase>
        </ListItem>
      ))}
    </List>
  );
};

const SideMenuView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { openLNB, setOpenLNB } = useSnapshot(LayoutStore);
  const showMasterMenu =
    !AuthStore?.userInfo?.devMode || AuthStore?.userInfo?.master;

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const findActiveParentMenuId = () => {
    if (showMasterMenu) {
      for (const menuItem of menuData) {
        if (menuItem.children) {
          for (const subMenuItem of menuItem.children) {
            if (isActive(subMenuItem.path)) {
              return menuItem.id;
            }
          }
        }
      }
    } else {
      for (const menuItem of menuData) {
        if (menuItem.children) {
          for (const subMenuItem of menuItem.children) {
            if (isActive(subMenuItem.path)) {
              return menuItem.id;
            }
          }
        }
      }
    }
    return null;
  };

  const [expandedMenuId, setExpandedMenuId] = React.useState(
    findActiveParentMenuId()
  );

  const [showButton, setShowButton] = React.useState(false);

  const handleDrawerClose = () => {
    setOpenLNB(!openLNB);
  };

  useEffect(() => {
    setExpandedMenuId(findActiveParentMenuId());
  }, [showMasterMenu]);

  useEffect(() => {
    setExpandedMenuId(findActiveParentMenuId());
  }, [location.pathname]);

  const handleMenuNavigation = (item: MenuItem) => {
    if (!item) {
      return;
    }
    navigate(item.path);
    setExpandedMenuId(expandedMenuId === item.id ? null : item.id);
  };

  return (
    <StyledBoxContainer
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      visibility={openLNB ? 'visible' : 'collapse'}
    >
      <SideMenuIcons />
      <StyledDrawer variant="permanent" open={openLNB} anchor="left">
        <List sx={{ height: 'auto', marginBottom: '32px', flexGrow: 1 }}>
          {menuData.map((item) =>
            item.children ? (
              <React.Fragment key={item.id}>
                <StyledTooltip
                  title={!openLNB ? `${t(item.name)}` : ''}
                  arrow
                  placement="right"
                >
                  <ListItem sx={{ my: 1, px: 1, py: 0 }}>
                    <StyledButtonBase
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: 0,
                      }}
                      onClick={() => {
                        handleMenuNavigation(item);
                      }}
                      className={
                        isActive(item.path)
                          ? 'active'
                          : openLNB
                          ? ''
                          : 'inactive'
                      }
                    >
                      <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                      {openLNB && (
                        <StyledListItemText
                          primary={t(item.name)}
                          sx={{
                            '& .MuiTypography-root': {
                              fontWeight: isActive(item.path) ? 600 : 400,
                            },
                          }}
                        />
                      )}
                    </StyledButtonBase>
                  </ListItem>
                </StyledTooltip>
                {openLNB && expandedMenuId === item.id && (
                  <SubMenu menuItems={item.children} />
                )}
              </React.Fragment>
            ) : (
              <StyledTooltip
                title={!openLNB ? `${t(item.name)}` : ''}
                arrow
                placement="right"
                key={item.id}
              >
                <ListItem sx={{ my: 1, px: 2, py: 0 }}>
                  <StyledButtonBase
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingLeft: 0,
                    }}
                    onClick={() => handleMenuNavigation(item)}
                    className={
                      isActive(item.path) ? 'active' : openLNB ? '' : 'inactive'
                    }
                  >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    {openLNB && (
                      <StyledListItemText
                        primary={t(item.name)}
                        sx={{
                          '& .MuiTypography-root': {
                            fontWeight: isActive(item.path) ? 600 : 400,
                          },
                        }}
                      />
                    )}
                  </StyledButtonBase>
                </ListItem>
              </StyledTooltip>
            )
          )}
        </List>
      </StyledDrawer>
      {showButton && (
        <StyledButtonCollapse
          visibility={openLNB ? 'visible' : 'collapse'}
          onClick={() => {
            handleDrawerClose();
          }}
        >
          {openLNB ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </StyledButtonCollapse>
      )}
    </StyledBoxContainer>
  );
};

export default SideMenuView;
