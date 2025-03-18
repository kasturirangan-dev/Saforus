import {
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Fade,
  IconButton,
  Container,
} from '@mui/material';

import BoLogo from '../assets/logo.svg';
import Avatar from '@web-workspace/shared/components/widgets/avatar';
import UserTypeLabel from './user-type-label';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import LanguageMenu from '@web-workspace/shared/components/widgets/langmenu';

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearBoAuthState } = useSnapshot(BoAuthStore);
  const [gnbMenuEl, setGnbMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(gnbMenuEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setGnbMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setGnbMenuEl(null);
  };

  const handleLogout = () => {
    handleClose();
    clearBoAuthState();
    navigate(BO_ROUTES.LOGIN.path, { replace: true });
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

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'var(--gray-950)',
        display: 'flex',
        boxShadow: `none`,
        justifyContent: 'center',
        padding: '0 7%',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: '10px',
            gap: '10px',
          }}
        >
          <Toolbar disableGutters>
            <IconButton sx={{ p: 0 }}>
              <img src={BoLogo} alt="saforus backoffice" />
            </IconButton>
          </Toolbar>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16px',
              gap: '16px',
              cursor: 'pointer',
            }}
          >
            <LanguageMenu />

            <Avatar
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              showName={true}
              showStatus={false}
              size={40}
              name={BoAuthStore.userInfo?.fullName || 'Guest'}
              nameStyle={{ color: 'var(--base-white)' }}
            />
            <UserTypeLabel />
          </Box>
          <Menu
            anchorEl={gnbMenuEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              'aria-labelledby': 'fade-button',
              sx: {
                padding: 0,
              },
            }}
            TransitionComponent={Fade}
            PaperProps={{
              elevation: 0,
              sx: {
                // overflow: 'visible',
                width: '200px',
                filter: 'var(--shadow-xsm)',
                mt: 1.5,
                marginTop: '0.5rem',
                border: '1px solid var(--neutral-700)',
                boxShadow: 'var(--shadow-xsm)',
                borderRadius: '5px',
              },
            }}
            keepMounted
          >
            <MenuItem
              onClick={handlelogoutConfirmation}
              sx={{ padding: '0.7rem 1rem', color: 'var(--red-500)' }}
            >
              {t('gnbmenu.logout')}
            </MenuItem>
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
