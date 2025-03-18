import { Box, Tab, Table, Tabs, Typography, styled } from '@mui/material';

export const UsageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const UsageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '26px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-700)',
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'var(--gray-400)',
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  padding: '0 0 8px 0',
  minWidth: 'auto',
  minHeight: '44px',
  marginRight: '24px',

  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-50)',

  '&.Mui-selected': {
    fontWeight: 600,
    color: 'var(--gray-400)',
  },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'var(--base-white)',
  borderStyle: 'hidden',

  '& .MuiTableCell-root': {
    padding: '6px 6px',
    border: 'none',
  },

  '& th': {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },

  '& td': {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-400)',
  },
}));

export const StaticsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-700)',
  borderRadius: '8px',
  padding: '12px 24px',
}));
