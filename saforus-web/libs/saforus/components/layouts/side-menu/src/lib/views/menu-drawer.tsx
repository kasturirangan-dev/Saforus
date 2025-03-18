import React, { useEffect, useState } from 'react';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { StyledDrawer } from './styled-elements';
import { useSnapshot } from 'valtio';

import SideMenuView from './menu-view';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import { useLocation } from 'react-router-dom';

const SideMenuDrawer: React.FC = () => {
  const location = useLocation();

  const { openLNB, setOpenLNB } = useSnapshot(LayoutStore);
  const handleCollapse = () => {
    setOpenLNB(!openLNB);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMobileCollapse = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('desk'));
  // Default close collape on mobile/tablet view
  useEffect(() => {
    if (!isDesktopView && openLNB) {
      setOpenLNB(false);
    }
    if (!isDesktopView && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isDesktopView, location.pathname]);

  return (
    <Box>
      {/* Permanent side menu, can spread in desktop view*/}
      <StyledDrawer
        variant="permanent"
        anchor="left"
        open={isDesktopView && openLNB}
      >
        <SideMenuView
          isSpread={isDesktopView && openLNB}
          handleCollapse={isDesktopView ? handleCollapse : handleMobileCollapse}
        />
      </StyledDrawer>
      {/* Temporary side menu for mobile/tablet view */}
      <Drawer
        variant="temporary"
        anchor="left"
        sx={{
          display: { xs: 'flex', desk: 'none' },
          '& .MuiDrawer-paper': { width: pxToVw('260px') },
        }}
        open={mobileOpen}
        onClose={handleMobileCollapse}
      >
        <SideMenuView isSpread={true} handleCollapse={handleMobileCollapse} />
      </Drawer>
    </Box>
  );
};

export default SideMenuDrawer;
