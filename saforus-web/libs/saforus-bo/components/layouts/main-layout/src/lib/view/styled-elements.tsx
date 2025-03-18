import { Box, CSSObject, IconButton, Theme, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase from '@mui/material/ButtonBase';

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const openedMixin = (theme: Theme): CSSObject => ({
  width: SIDEBAR_WIDTH,
  background: 'var(--gray-900)',
  color: 'var(--base-white)',
  top: 'unset',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  top: 'unset',
  background: 'var(--gray-900)',
  color: 'var(--base-white)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(16)} + 1px)`,
});

export const SIDEBAR_WIDTH = '300px';

export const StyledBoxContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'visibility',
})(({ theme, visibility }) => ({
  width: SIDEBAR_WIDTH,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: '0 0 auto',
  ...(visibility === 'visible' && {
    ...openedMixin(theme),
  }),
  ...(visibility === 'collapse' && {
    ...closedMixin(theme),
  }),
}));

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: SIDEBAR_WIDTH,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  '&:hover': {
    background: 'var(--gray-300)',
  },
  height: '58px',
  '&.active': {
    background: 'var(--main-brand-color3)',
  },
  '&.inactive': {
    background: 'var(--gray-300)',
  },
  padding: '1rem',
  borderRadius: 'var(--space-8)',
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginLeft: '1rem',
  marginRight: '0.5rem',
  minWidth: '1.5rem',
  padding: '0.2 rem 0 0.2rem 0',
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'var(Noto Sans KR)',
  color: theme.palette.primary.contrastText,
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: 'var(--gray-900)',
    maxWidth: 287,
    fontSize: pxToVw(14),
    '&::before': {
      backgroundColor: 'var(--gray-900)',
      border: '1px solid #1c2534',
    },
  },
  '& .MuiTooltip-tooltipArrow': {
    backgroundColor: 'var(--gray-900)',
    color: 'var(--neutral-200)',
    maxWidth: 287,
    fontSize: pxToVw(14),
    fontWeight: 500,
    padding: '8px 12px',
    border: '1px solid #1c2534',
    borderRadius: 5,
  },
}));

export const StyledSubButtonBase = styled(ButtonBase)(({ theme }) => ({
  // '&:hover': {
  //   backgroundColor: 'var(--gray-500)',
  // },
  '&.active': {
    backgroundColor: 'var(--gray-300)',
  },
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  marginLeft: '1rem',
  borderRadius: 'var(--space-8)',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'var(--gray-500)',
  },
  position: 'fixed',
  left: '280px',
  mt: '1.5rem',
  top: '5rem',
  zIndex: 2000,
  backgroundColor: 'var(--gray-200)',
}));

const openedIcon = (theme: Theme): CSSObject => ({
  left: '285px',
  transition: theme.transitions.create('left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedIcon = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  left: `calc(${theme.spacing(11)} + 1px)`,
});

export const StyledButtonCollapse = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'visibility',
})(({ theme, visibility }) => ({
  position: 'fixed',
  left: '285px',
  mt: '1.5rem',
  top: '5rem',
  zIndex: 1200,
  backgroundColor: 'var(--gray-500)',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  ...(visibility === 'visible' && {
    ...openedIcon(theme),
  }),
  ...(visibility === 'collapse' && {
    ...closedIcon(theme),
  }),
}));
