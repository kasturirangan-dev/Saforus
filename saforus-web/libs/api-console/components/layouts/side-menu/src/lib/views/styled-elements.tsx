import { Box, Typography, styled } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';

export const MenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  overflow: 'auto',
  gap: '24px',
  justifyContent: 'space-between',
  height: '100%',
  width: '260px',
  padding: '40px 8px 16px 8px',
  backgroundColor: 'var(--base-white)',
  borderRight: '1px solid var(--neutral-750)',
}));

export const MenuTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '18px',
  color: 'var(--neutral-950)',
}));

// Styled menu
export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto',

  '& svg': {
    width: 20,
    height: 20,
    stroke: 'var(--gray-700)',
    fill: 'var(--gray-700)',
  },
  '&.active': {
    '& svg': { stroke: 'var(--purple-500)', fill: 'var(--purple-500)' },
  },
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: 'var(--gray-700)',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  '& .MuiTypography-root': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '-0.1px',
  },
}));

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  height: '32px',
  width: '100%',
  padding: '4px 12px',
  borderRadius: '4px',
  gap: '8px',
  '& svg': {
    stroke: 'var(--gray-700)',
  },

  '&:hover': {
    background: 'var(--neutral-500)',
  },
  '&.active': {
    background: 'var(--purple-50)',
    '& .MuiTypography-root': {
      color: 'var(--purple-500)',
      fontWeight: 500,
    },
    '& svg': { stroke: 'var(--purple-500)' },
  },
  '&.expand': {
    background: 'var(--neutral-100)',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
}));

// Styled sub menu

export const StyledSubButtonBase = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  paddingLeft: '10px',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-2px',
    height: '100%',
    width: '100%',
    borderLeft: '2px solid var(--neutral-500)',
  },
  '&:hover': {
    background: 'var(--neutral-500)',
  },
  '&.active': {
    '& .MuiTypography-root': {
      color: 'var(--purple-500)',
      fontWeight: 500,
    },
    '&::before': {
      borderLeft: '2px solid var(--purple-500)',
    },
  },
}));
