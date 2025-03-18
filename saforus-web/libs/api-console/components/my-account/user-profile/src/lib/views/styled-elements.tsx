import { Box, Table, TableContainer, Typography, styled } from '@mui/material';

export const UserProfileContainer = styled(Box)({
  display: 'flex',
  gap: '32px',
  backgroundColor: 'var(--base-white)',
  padding: '20px 32px',
  borderRadius: '8px',
  border: '1px solid var(--neutral-500)',
});

export const BoxContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ContentTile = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-700)',
});

export const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-root': {
    verticalAlign: 'top',
    padding: '0',
    border: 'none',
  },
  '& th': {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },
  '& td': {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },
}));
