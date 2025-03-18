import React, { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Collapse, List, ListItem } from '@mui/material';
import { menuData, MenuItem } from '../data';
import {
  MenuContainer,
  MenuTitle,
  StyledButtonBase,
  StyledListItemText,
  StyledSubButtonBase,
} from './styled-elements';
import { useTranslation } from 'react-i18next';
import Icon from '@web-workspace/shared/components/widgets/icon';

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
        margin: '8px 8px 0px 12px',
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
  const [expand, setExpand] = React.useState(hasChildren && isActive(item));

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (item: MenuItem) => {
    return path.startsWith(item.path);
  };

  const handleMenuNavigation = (item: MenuItem) => {
    if (!item) return;
    navigate(item.path);
  };

  return (
    <MenuContainer>
      <List
        disablePadding
        sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {Object.entries(menuData).map(([key, menu]) => {
          return (
            <Fragment key={key}>
              <MenuTitle
                sx={{ textTransform: 'uppercase', padding: '8px 12px' }}
              >
                {t(`apiDocsSidemenu.${key}`)}
              </MenuTitle>
              {menu.map((item) => {
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
            </Fragment>
          );
        })}
      </List>

      <Box
        sx={{
          borderTop: '1px solid var(--neutral-500)',
          padding: '4px 12px',
          fontWeight: 400,
          color: 'var(--gray-25)',
          backgroundColor: 'inherit',
          position: 'sticky',
          bottom: -16,
          left: 0,
          paddingBottom: '20px',
          marginTop: '8px',
          marginBottom: '-16px',
        }}
      >
        <MenuTitle>{t('apiDocsSidemenu.version')}</MenuTitle>
      </Box>
    </MenuContainer>
  );
};

export default SideMenuView;
