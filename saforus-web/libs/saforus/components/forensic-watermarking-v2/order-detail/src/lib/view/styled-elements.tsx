import { Alert, Typography, styled } from '@mui/material';
import Table from '@web-workspace/shared/components/widgets/table';

export const StyledDataGrid = styled(Table)({
  backgroundColor: 'var(--base-white)',
  borderColor: 'var(--neutral-400)',
  borderRadius: '8px',
  overflow: 'hidden',

  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'var(--neutral-400)',
    padding: '12px 16px',
  },
  '& .MuiDataGrid-columnHeaderCheckbox': {
    padding: '0',
  },

  '& .MuiDataGrid-row': {
    '&.Mui-selected': {
      backgroundColor: 'inherit',
      color: 'inherit',
      '&:hover': {
        backgroundColor: 'var(--neutral-200)',
      },
    },
    '&:hover': {
      backgroundColor: 'var(--neutral-200)',
    },
    borderBottom: '1px solid var(--neutral-400)',
  },
  '& .MuiDataGrid-cell': {
    borderLeft: '1px solid var(--neutral-400)',
    padding: '12px 16px',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-950)',
  },

  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
});

export const TableContent = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

export const StyledAlert = styled(Alert)`
  background: #fef6f6;
  border: 1.5px solid #feb8ae;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;
