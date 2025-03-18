import { styled } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonBase from '@mui/material/ButtonBase';

// Styled menu
export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  '& svg': {
    fill: 'var(--purple-50)',
    width: 20,
    height: 20,
  },
  background: 'var(--purple-25)',

  minWidth: '28px',
  width: '28px',
  height: '28px',

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
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  height: '52px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '8px',

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
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
}));

// Styled sub menu
export const StyledSubItemArrow = styled(ListItemIcon)(({ theme }) => ({
  height: '100%',
  minWidth: '20px',
  width: '25px',
  marginLeft: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

export const StyledSubItemText = styled(ListItemText)(({ theme }) => ({
  color: 'var(--gray-700)',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  '& .MuiTypography-root': {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
  },
}));

export const StyledSubButtonBase = styled(ButtonBase)(({ theme }) => ({
  height: '36px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderRadius: 'var(--space-8)',
  '&:hover': {
    '& .MuiTypography-root': { color: 'var(--purple-300)', fontWeight: 400 },
  },

  '&.active': {
    '& .MuiTypography-root': { color: 'var(--purple-400)', fontWeight: 600 },
  },
}));
