import { styled, Box, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { menus } from '../../data';
import { IMenu } from '../../data/interface';
import LanguageMenu from '@web-workspace/shared/components/widgets/langmenu';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: pxToVw(['12px', '18px']),
  fontSize: pxToVw(15),
  fontWeight: '600',
  textTransform: 'none',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--base-white)',
}));

const DesktopToolbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>, menu: IMenu) {
    if (!menu?.children) {
      navigate(menu.link);
      setAnchorEl(null);
    } else {
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
      }
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {menus.map((menu) => {
        if (menu.children) {
          return (
            <Box key={menu.key}>
              <StyledButton
                variant="text"
                key={menu.key}
                onClick={(e) => handleClick(e, menu)}
              >
                {t(`menu.${menu.key}`)}
                <Icon
                  iconStyle={{ marginLeft: pxToVw('12px') }}
                  name="chevron_down"
                  color="var(--gray-700)"
                />
              </StyledButton>
              <Menu
                id="menu-horizontal"
                aria-labelledby="menu-horizontal"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {menu.children.map((item) => (
                  <MenuItem
                    key={item.key}
                    onClick={(e) => handleClick(e, item)}
                  >
                    {t(`menu.${item.key}`)}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          );
        }

        return (
          <StyledButton
            variant="text"
            key={menu.key}
            onClick={(e) => handleClick(e, menu)}
          >
            {t(`menu.${menu.key}`)}
          </StyledButton>
        );
      })}
    </Box>
  );
};

export interface DesktopNavbarActionsProps {
  children?: React.ReactNode;
}

export const DesktopNavbarActions = (props: DesktopNavbarActionsProps) => {
  const { children } = props;

  return (
    <Box
      sx={{
        justifyContent: 'flex-end',
        display: { xs: 'none', tab: 'flex' },
        alignItems: 'center',
        marginLeft: 'auto',
      }}
    >
      <LanguageMenu />
      {children}
    </Box>
  );
};

export default React.memo(DesktopToolbar);
