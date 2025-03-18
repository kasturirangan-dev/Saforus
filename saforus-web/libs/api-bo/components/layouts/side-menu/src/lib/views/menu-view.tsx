import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, List, ListItem } from '@mui/material';
import { menuData, MenuItem } from '../data';
import {
  StyledButtonBase,
  StyledListItemIcon,
  StyledListItemText,
  StyledSubButtonBase,
  StyledSubItemArrow,
  StyledSubItemText,
} from './styled-elements';
import SideMenuIcons from './icons';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { LogoCsApiBo } from '@web-workspace/api-bo/common/views';
import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import subArrow from '../assets/sub-arrow.png';

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
                marginRight: '8px',
                fontSize: '18px',
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
        <StyledListItemIcon sx={{ marginLeft: '12px' }}>
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

const SideMenuView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (item: MenuItem) => {
    return path.startsWith(item.path);
  };

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const handleMenuNavigation = (item: MenuItem) => {
    if (!item) return;

    if (item.path === API_BO_ROUTES.HELP.path) {
      // Link Help menu to saforus help page
      window.open(linkSupport, '_blank');
    } else {
      navigate(item.path);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        gap: '16px',
        height: '100%',
        width: '260px',
        padding: '10px 8px',
        backgroundColor: 'var(--base-white)',
        borderRight: '1px solid var(--neutral-750)',
      }}
    >
      <SideMenuIcons color="var(--purple-950)" />

      <Link
        to={getEnvVar(
          i18next.language === 'en' ? 'VITE_HOME_URL' : 'VITE_HOME_KO_URL'
        )}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <LogoCsApiBo sx={{ margin: '0px 8px' }} />
      </Link>

      <List disablePadding>
        {menuData.map((item) => {
          return (
            <ListItem key={item.id} sx={{ padding: '6px 0px' }}>
              <SideMenuItem
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
