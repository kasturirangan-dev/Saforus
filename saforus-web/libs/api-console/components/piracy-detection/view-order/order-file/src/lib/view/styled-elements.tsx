import { Box, Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NoRowContainer = styled(Box)(({ theme }) => ({
  width: '550px',
  margin: '32px auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '4px',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid var(--neutral-500)',
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'var(--base-white)',
  borderStyle: 'hidden',

  '& .MuiTableCell-root': {
    border: '1px solid var(--neutral-400)',
  },

  '& th': {
    backgroundColor: 'var(--neutral-400)',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-950)',
  },

  '& td': {
    padding: '8px 16px',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
  },
}));
