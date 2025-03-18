import React, { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Collapse, List, ListItem } from '@mui/material';
import { menuData, MenuItem } from '../data';
import {
  MenuContainer,
  MenuTitle,
  StyledButtonBase,
  StyledListItemIcon,
  StyledListItemText,
  StyledSubButtonBase,
} from './styled-elements';
import SideMenuIcons from './icons';
import { useTranslation } from 'react-i18next';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import RedirectIcon from '../assets/redirect.svg';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const SubMenu: React.FC<{
  menuItems: MenuItem[];
  isActive: (item: MenuItem) => boolean;
  handleMenuSelection: (item: MenuItem) => void;
}> = ({ menuItems, isActive, handleMenuSelection }) => {
  const { t } = useTranslation();

  return (
    <List
      disablePadding
      sx={{
        margin: '8px 8px 0px 22px',
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        borderLeft: '2px solid var(--neutral-500)',
      }}
    >
      {menuItems.map((item) => (
        <ListItem key={item.id} disablePadding>
          <StyledSubButtonBase
            onClick={() => handleMenuSelection(item)}
            className={isActive(item) ? 'active' : ''}
          >
            <StyledListItemText primary={t(item.name)} />
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
  const hasChildren = Boolean(item.children?.length);
  const [expand, setExpand] = React.useState(hasChildren);

  const handleClick = () => {
    if (hasChildren) {
      setExpand(!expand);
    } else {
      handleMenuSelection(item);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <StyledButtonBase
        onClick={handleClick}
        className={isActive(item) ? 'active' : expand ? 'expand' : ''}
      >
        <StyledListItemIcon className={isActive(item) ? 'active' : ''}>
          {item.icon}
        </StyledListItemIcon>
        <StyledListItemText primary={t(item.name)} />
        {hasChildren && (
          <Icon name={expand ? 'chevron_up' : 'chevron_down'} size={16} />
        )}
      </StyledButtonBase>

      {hasChildren && (
        <Collapse in={expand}>
          <SubMenu
            menuItems={item.children}
            isActive={isActive}
            handleMenuSelection={handleMenuSelection}
          />
        </Collapse>
      )}
    </Box>
  );
};

const SideMenuView = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isGuest = path.startsWith(API_ROUTES.GUEST.ROOT);

  const isActive = (item: MenuItem) => {
    const activePath = isGuest ? path.replace(API_ROUTES.GUEST.ROOT, '') : path;
    return activePath.startsWith(item.path);
  };
  const linkAPITest = getEnvVar(
    i18n.language === 'en' ? 'VITE_API_TEST_URL' : 'VITE_API_TEST_KO_URL'
  );

  const handleButtonClick = () => {
    window.open(linkAPITest, '_blank');
  };
  const handleMenuNavigation = (item: MenuItem) => {
    if (!item) return;
    const itemPath = isGuest
      ? `${API_ROUTES.GUEST.ROOT}${item.path}`
      : item.path;
    navigate(itemPath);
  };

  return (
    <MenuContainer>
      <SideMenuIcons />

      <List
        disablePadding
        sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {menuData.console.map((item) => {
          return (
            <ListItem key={item.id} disablePadding>
              <SideMenuItem
                item={item}
                isActive={isActive}
                handleMenuSelection={handleMenuNavigation}
              />
            </ListItem>
          );
        })}
        <MenuTitle sx={{ textTransform: 'uppercase', padding: '8px 12px' }}>
          {t(`apiSidemenu.developer-api`)}
        </MenuTitle>
        {menuData.api.map((item) => {
          return (
            <ListItem key={item.id} disablePadding>
              <SideMenuItem
                item={item}
                isActive={isActive}
                handleMenuSelection={handleMenuNavigation}
              />
            </ListItem>
          );
        })}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleButtonClick}
            sx={{
              textTransform: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
            }}
          >
            {t('apiSidemenu.req-api-test')}
            <img
              src={RedirectIcon}
              alt="Redirect"
              style={{ marginLeft: '8px' }}
            />
          </Button>
        </Box>
      </List>

      <Box
        sx={{
          marginTop: '8px',
          borderTop: '1px solid var(--neutral-500)',
          padding: '4px 12px',
          fontWeight: 400,
          color: 'var(--gray-25)',
        }}
      >
        <MenuTitle>{t('apiSidemenu.version')}</MenuTitle>
      </Box>
    </MenuContainer>
  );
};

export default SideMenuView;
