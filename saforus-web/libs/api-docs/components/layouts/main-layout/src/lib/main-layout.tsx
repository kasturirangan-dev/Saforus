import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useSnapshot } from 'valtio';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useLocation } from 'react-router-dom';
import NavbarContainer from '@web-workspace/api-docs/components/layouts/navbar';
import SideMenuContainer from '@web-workspace/api-docs/components/layouts/side-menu';
import { Footer } from '@web-workspace/api-console/common/views';

export type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { mainLayoutCss } = useSnapshot(MainLayoutStore);
  const location = useLocation();

  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView();
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavbarContainer />

      <Box sx={{ display: 'flex', overflow: 'auto', height: '100%' }}>
        <SideMenuContainer />

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Box
            ref={refToTop}
            component="main"
            sx={{
              width: '100%',
              minHeight: 'calc(100% - 130px)',
              padding: '40px 24px 0px 24px',
              backgroundColor: 'var(--base-white)',
              ...mainLayoutCss,
            }}
          >
            {children}
          </Box>
          <Box
            maxWidth={{ xs: '820px', desk: '1100px' }}
            marginTop="60px"
            marginX="auto"
            paddingRight={{ xs: 0, desk: '280px' }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
