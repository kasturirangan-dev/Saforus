import {
  AppBar,
  AppBarProps,
  PaletteMode,
  styled,
  SxProps,
  Theme,
  Toolbar,
  ToolbarProps,
  useTheme,
} from '@mui/material';
import React from 'react';
import { DesktopNavbarActions } from './desktop';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { Link } from 'react-router-dom';
import ImageLight from '../assets/logo_image_light.png';
import ImageDark from '../assets/logo_image_dark.png';
import i18next from 'i18next';
import { LogoCsApiBo } from '@web-workspace/api-bo/common/views';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode?: PaletteMode } & AppBarProps>(({ mode }) => ({
  position: 'sticky',
  backgroundColor: mode === 'light' ? 'var(--base-white)' : 'var(--gray-950)',
  boxShadow: `none`,
  justifyContent: 'center',
  height: '58px',
  borderBottom: '1px solid var(--neutral-600)',
}));

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode?: PaletteMode } & ToolbarProps>(({ theme, mode }) => ({
  display: 'flex',
  backgroundColor: mode === 'light' ? 'var(--base-white)' : 'var(--gray-950)',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: '0px 2rem',
    minHeight: '56px',
  },
}));

export interface NavbarViewProps extends ToolbarProps {
  sxContainer?: SxProps<Theme>;
  mode?: PaletteMode;
  logo?: 'light' | 'dark' | 'none';
}

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
            <LogoCsApiBo logo={logoSrc} />
          </Link>
        )}
        <DesktopNavbarActions>{children}</DesktopNavbarActions>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default React.memo(NavbarView);
