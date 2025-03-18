import {
  AppBar,
  AppBarProps,
  Box,
  PaletteMode,
  styled,
  SxProps,
  Theme,
  Toolbar,
  ToolbarProps,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { DesktopNavbarActions } from './desktop';
import MobileToolbar from './mobile';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { Link } from 'react-router-dom';
import ImageLight from '../assets/logo_image_light.png';
import ImageDark from '../assets/logo_image_dark.png';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import i18next, { use } from 'i18next';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode?: PaletteMode } & AppBarProps>(({ mode }) => ({
  // position: 'sticky',
  backgroundColor: mode === 'light' ? 'var(--base-white)' : 'var(--gray-950)',
  boxShadow: `none`,
  justifyContent: 'center',
  height: pxToVw('58px'),
  borderBottom: `${pxToVw('1px')} solid var(--neutral-600)`,
}));

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode?: PaletteMode } & ToolbarProps>(({ theme, mode }) => ({
  display: 'flex',
  backgroundColor: mode === 'light' ? 'var(--base-white)' : 'var(--gray-950)',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: pxToVw(['0px', '2rem']),
    minHeight: pxToVw('56px'),
  },
}));

export interface NavbarViewProps extends ToolbarProps {
  sxContainer?: SxProps<Theme>;
  mode?: PaletteMode;
  logo?: 'light' | 'dark' | 'none';
}

const LogoBeta = ({ logo }: { logo: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'end',
        gap: '8px',
        height: `${pxToVw(38)}`,
      }}
    >
      <img
        src={logo}
        alt="logo"
        title="logo"
        style={{
          height: '100%',
        }}
        loading="lazy"
      />
      <Typography
        variant="caption"
        sx={{
          color: 'var(--purple-600)',
          backgroundColor: 'var(--purple-25)',
          padding: pxToVw(['0.125rem', '0.5rem']),
          borderRadius: pxToVw('5px'),
          fontWeight: 500,
          fontSize: pxToVw('13px'),
          lineHeight: pxToVw('18px'),
        }}
      >
        Beta
      </Typography>
    </Box>
  );
};
const NavbarView = (props: NavbarViewProps) => {
  const { sx, sxContainer, mode, logo, children, ...otherProps } = props;
  const theme = useTheme();

  let _mode = mode;
  if (!mode) {
    _mode = theme.palette.mode;
  }

  let logoSrc;
  switch (logo) {
    case 'light':
      logoSrc = ImageLight;
      break;
    case 'dark':
      logoSrc = ImageDark;
      break;
    case 'none':
      logoSrc = null;
      break;
    default:
      logoSrc = _mode === 'light' ? ImageLight : ImageDark;
  }

  return (
    <StyledAppBar sx={sxContainer} mode={_mode}>
      <StyledToolbar sx={sx} mode={_mode} {...otherProps}>
        {logoSrc && (
          <Link
            to={getEnvVar(
              i18next.language === 'en' ? 'VITE_HOME_URL' : 'VITE_HOME_KO_URL'
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <LogoBeta logo={logoSrc} />
          </Link>
        )}
        {/* <DesktopToolbar /> */}
        <DesktopNavbarActions>{children}</DesktopNavbarActions>
        <MobileToolbar />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default React.memo(NavbarView);
