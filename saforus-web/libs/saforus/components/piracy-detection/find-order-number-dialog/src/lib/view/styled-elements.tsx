import { Box, Typography, styled } from '@mui/material';
import Table from '@web-workspace/shared/components/widgets/table';

export const Label = styled('label')({
  display: 'block',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  color: 'var(--gray-700)',
});

export const BoxField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

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
    borderBottom: '1px solid var(--neutral-400)',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    backgroundColor: 'var(--neutral-400)',
  },

  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '.MuiDataGrid-overlay': {
    justifyContent: 'center',
    color: 'var(--gray-25)',
      height: '100%',
      backgroundColor: 'transparent',
    },
});

export const TableContent = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));
