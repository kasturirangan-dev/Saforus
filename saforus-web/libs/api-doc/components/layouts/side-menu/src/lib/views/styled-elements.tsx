import { Box, CSSObject, IconButton, Theme, styled, ListItemTextProps } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase , {ButtonBaseProps} from '@mui/material/ButtonBase';
import { pxToVw } from '@web-workspace/saforus/common/utils';

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

interface StyledButtonBaseProps {
  isFirst?: boolean;
}


const openedMixin = (theme: Theme): CSSObject => ({
  width: pxToVw('260px'),
  top: 'unset',
  background: 'var(--base-white)',
  color: 'var(--gray-700)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto', // Enable vertical scrolling
  scrollbarWidth: 'none', // For Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // For WebKit browsers
  },
  paddingBottom: pxToVw('80px'),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: pxToVw('60px'),
  top: 'unset',
  background: 'var(--base-white)',
  color: 'var(--gray-700)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: pxToVw('260px'),
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

// Styled menu
export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  '& svg': {
    fill: 'var(--purple-50)',
    width: pxToVw(20),
    height: pxToVw(20),
  },
  background: 'var(--purple-25)',

  minWidth: pxToVw('28px'),
  width: pxToVw('28px'),
  height: pxToVw('28px'),

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'var(--space-4)',
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: 'var(--gray-700)',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  '& .MuiTypography-root': {
    fontWeight: 500,
    fontSize: pxToVw('16px'),
    lineHeight: pxToVw('24px'),
    marginLeft: pxToVw('10px'),
  },
}));

export const StyledButtonBase = styled(ButtonBase)<StyledButtonBaseProps>(({ theme, isFirst = false }) => ({
  height: pxToVw('52px'),
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: pxToVw('8px'),
  borderRadius: 'var(--space-8)',

  ...(isFirst && {
    '&:hover': {
      background: 'transparent',
      cursor: 'default',
    }
  }),
  ...(!isFirst && {
    '&:hover': {
      background: 'var(--purple-25)',
      '& .MuiListItemIcon-root': { background: 'var(--purple-50)' },
      '& svg': { fill: 'var(--purple-50)' },
    },

    '&.active': {
      background: 'var(--purple-50)',
      '& .MuiListItemIcon-root': { background: 'var(--purple-50)' },
      '& svg': { fill: 'var(--purple-200)' },
      '& .MuiTypography-root': {
        color: 'var(--purple-400)',
        fontWeight: 600,
        fontSize: pxToVw('16px'),
        lineHeight: pxToVw('24px'),
      },
    },
  }),
}));

// Styled sub menu
export const StyledSubItemArrow = styled(ListItemIcon)(({ theme }) => ({
  height: '100%',
  minWidth: pxToVw('20px'),
  width: pxToVw('25px'),
  marginLeft: pxToVw('5px'),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

interface CustomSubItemTextProps extends ListItemTextProps {
  theme?: Theme; // Make theme optional as it might not be needed for StyledSubItemText
  level: number;
}

interface CustomStyledSubButtonBase extends ButtonBaseProps{
  theme?: Theme; // Make theme optional as it might not be needed for StyledSubItemText
  level: number;

}

export const StyledSubItemText = styled(ListItemText)<CustomSubItemTextProps>(({ theme, level }) => ({
  color: 'var(--gray-700)',
  textAlign: 'left',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& .MuiTypography-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    fontSize: level === 1 ? pxToVw('13px') : pxToVw('14px'),
    lineHeight: pxToVw('20px'),
    width: level === 1 ? pxToVw('146px') : 'auto',
    maxWidth: '100%',
    marginLeft: level === 1 ? pxToVw('10px') : 'auto',
  },
}));

export const StyledSubButtonBase = styled(ButtonBase)<CustomStyledSubButtonBase>(({ theme, level }) => ({
  height: pxToVw('36px'),
  width: level === 1 ? pxToVw('100px') : 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: pxToVw('8px'),
  borderRadius: 'var(--space-8)',
  '&:hover': {
    '& .MuiTypography-root': { color: 'var(--purple-300)', fontWeight: 400 },
  },

  '&.active': {
    '& .MuiTypography-root': { color: 'var(--purple-400)', fontWeight: 600 },
  },
}));

export const StyledButtonCollapse = styled(Box)(({ theme }) => ({
  width: pxToVw('32px'),
  height: pxToVw('32px'),
  margin: `${pxToVw(['0px', '4px'])}`,
  borderRadius: '50%',
  border: '1px solid var(--neutral-700)',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  cursor: 'pointer',
  '& svg': {
    width: pxToVw('18px'),
    height: pxToVw('18px'),
    color: 'var(--gray-25)',
  },
}));

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: 'var(--gray-200)',
    '&::before': {
      backgroundColor: 'var(--base-white)',
      border: `${pxToVw('1px')} solid var(--neutral-600)`,
    },
  },
  '& .MuiTooltip-tooltipArrow': {
    backgroundColor: 'var(--base-white)',
    color: 'var(--gray-700)',
    fontSize: pxToVw(14),
    padding: pxToVw(['8px', '0px']),
    border: `${pxToVw('1px')} solid var(--neutral-600)`,
    borderRadius: pxToVw(8),
  },
}));
