import { proxy } from 'valtio';
import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';

type ExtendedSxProps = CSSProperties & SxProps<Theme>;
interface MainLayoutStoreType {
  openLNB: boolean;
  setOpenLNB: (value: boolean) => void;
  mainLayoutCss: ExtendedSxProps;
  setMainLayoutCss: (data: ExtendedSxProps) => void;
  setResponsiveLayout: (theme: Theme) => void;
  resetMainLayoutCss: () => void;
}

function createMainLayoutStore() {
  const store: MainLayoutStoreType = {
    openLNB: true,
    mainLayoutCss: {},
    setOpenLNB: (value: boolean) => {
      MainLayoutStore.openLNB = value;
    },
    setMainLayoutCss: (data) => {
      MainLayoutStore.mainLayoutCss = data;
    },
    setResponsiveLayout: (theme: Theme) => {
      const ResponsiveLayoutCss = {
        background: 'var(--neutral-50)',
        padding: '24px 24px 40px 24px',
        [theme.breakpoints.up('desk')]: {
          padding: '24px 80px 40px 80px',
        },
        [theme.breakpoints.up('xl')]: {
          padding: '24px 200px 40px 200px',
        },
      };
      MainLayoutStore.setMainLayoutCss(ResponsiveLayoutCss);
    },
    resetMainLayoutCss: () => {
      MainLayoutStore.mainLayoutCss = {};
    },
  };
  return store;
}

const MainLayoutStore = proxy<MainLayoutStoreType>(createMainLayoutStore());

export default MainLayoutStore;
