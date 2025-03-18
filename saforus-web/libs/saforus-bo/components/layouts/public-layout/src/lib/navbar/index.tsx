import { styled, Box, AppBar, Toolbar, Button } from '@mui/material';
import BoLogo from '../assets/logo.svg';

const Navbar = () => {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'sticky',
    backgroundColor: 'var(--gray-950)',
    boxShadow: `none`,
    justifyContent: 'center',
    height: '57px',
    padding: '0 7%',
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <Button color="inherit">
            <img src={BoLogo} alt="saforus backoffice" />
          </Button>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navbar;
