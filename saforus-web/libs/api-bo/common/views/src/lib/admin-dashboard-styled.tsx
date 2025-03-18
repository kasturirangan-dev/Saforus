import { Typography, styled } from '@mui/material';
import Table from '@web-workspace/shared/components/widgets/table';

export const StyledDataGrid = styled(Table)({
  backgroundColor: 'var(--base-white)',
  borderColor: 'var(--neutral-400)',
  borderRadius: '8px',
  overflow: 'hidden',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'var(--neutral-400)',
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'var(--neutral-200)',
    },
    borderBottom: '1px solid var(--neutral-600)',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    backgroundColor: 'var(--neutral-400)',
    border: 'none',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '.MuiDataGrid-overlay': {
    justifyContent: 'center',
    color: 'var(--gray-25)',
  },
});

export const TableContent = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));
