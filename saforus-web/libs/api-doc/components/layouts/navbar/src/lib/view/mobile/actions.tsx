import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Icon from '@web-workspace/shared/components/widgets/icon';
import { menus } from '../../data';
import { IMenu } from '../../data/interface';

const NavbarActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const _theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const displayMenu = () => false;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (menu: IMenu) => {
    navigate(menu.link);
  };

  return displayMenu() ? (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <Icon
          name="burger-menu-big"
          color={
            _theme.palette.mode === 'light'
              ? 'var(--gray-700)'
              : 'var(--base-white)'
          }
        />
      </IconButton>

      {/* FIXME: need update right menu list sub menu item */}
      <Menu
        id="menu-horizontal"
        aria-labelledby="menu-horizontal"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {menus.map((menu) => (
          <MenuItem key={menu.key} onClick={() => handleClickMenu(menu)}>
            {t(`menu.${menu.key}`)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  ) : (
    <> </>
  );
};

export default React.memo(NavbarActions);
