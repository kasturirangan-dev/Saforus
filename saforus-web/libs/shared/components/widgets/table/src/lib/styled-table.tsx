import { styled, Box, Typography, Theme, Pagination } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';

type TableProps = DataGridProps & {
  tableCss?: React.CSSProperties; // Added extra props type here
  showSelectedRowText?: React.ReactNode;
  paginationContent?: () => JSX.Element;
  noResultText?: string;
  noRowText?: string;
  rowHover?: boolean;
  noRowsHeight?: string;
  outerFooter?: boolean;
};

function customCheckbox(theme: Theme) {
  return {
    // Styles for the disabled state of the checkbox
    '& .MuiCheckbox-root.Mui-disabled': {
      '& svg': {
        width: '1.5rem', // Match the width in your SVG
        height: '1.5rem', // Match the height in your SVG
        borderRadius: '0.25rem', // Match the border-radius in your SVG
        fill: 'none', // No fill color as per your SVG
        // Apply a semi-transparent overlay to mimic the <g> opacity in your SVG
        backgroundColor: 'rgba(124, 139, 157, 0.2)',
        // Set the border style to match your SVG
        border: '1.5px var(--neutral-900)',
        // Clip-path cannot be applied directly in CSS, it requires SVG adjustments
      },
      // Hide the path inside the SVG, as it's not visible in the disabled state
      '& svg path': {
        display: 'none',
      },
    },
  };
}
const rowHoverStyles = (hoveredRow: boolean) => {
  return hoveredRow
    ? {
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
          '& label': {
            cursor: 'inherit',
          },
        },
      }
    : {};
};

const StyledDataGrid = styled(DataGrid, {
  shouldForwardProp: (prop) => prop !== 'rowHover',
})<{ rowHover: boolean }>(({ theme, rowHover }) => ({
  backgroundColor: 'var(--base-white)',
  borderColor: 'var(--neutral-600)',
  borderRadius: '8px',
  overflow: 'hidden',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'var(--neutral-400)',
    height: '3rem',
    borderColor: 'var(--neutral-600)',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },

  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },

  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'var(--neutral-200)',
    },
    '&.Mui-selected': {
      backgroundColor: 'inherit',
      color: 'inherit',
      '&:hover': {
        backgroundColor: 'var(--neutral-200)',
      },
    },
    borderBottom: '1px solid var(--neutral-600)',
  },

  '& .MuiDataGrid-cell': {
    color: 'var(--gray-700)',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
    border: 'none',
  },

  '.MuiDataGrid-overlay': {
    justifyContent: 'center',
    color: 'var(--gray-25)',
  },

  '& .MuiDataGrid-footerContainer': {
    backgroundColor: 'inherit',
  },

  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },

  ...customCheckbox(theme),
  // Add style when row hover
  ...rowHoverStyles(rowHover),
}));

export const CustomFooter = ({
  apiRef,
  total = 0,
}: {
  apiRef: any;
  total?: number;
}) => {
  const { t } = useTranslation();
  if (!apiRef.current.state) return null;

  const page = apiRef.current.state.pagination?.paginationModel.page + 1;
  const pageSize = apiRef.current.state.pagination?.paginationModel.pageSize;
  const pageCount = Math.ceil(total / pageSize);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    apiRef.current.setPage(value - 1);
  };

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        position: 'relative',
        height: '32px',
      }}
    >
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="standard"
          shape="rounded"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ' .MuiButtonBase-root': {
              borderRadius: '8px',
            },
          }}
        />
      )}
      <Typography variant="body2" color="var(--gray-25)">
        {t('apiOrderList.table.total')}: {total}
      </Typography>
    </Box>
  );
};

const Table: React.FC<TableProps> = ({
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  autoPageSize = false,
  initialState = {
    pagination: { paginationModel: { pageSize: 10 } },
  },
  slots,
  showSelectedRowText,
  paginationContent,
  noResultText,
  noRowText,
  rowHover = false,
  noRowsHeight = '155px',
  hideFooter,
  outerFooter = true,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: props?.rows?.length > 0 ? 'auto' : noRowsHeight,
      }}
    >
      <StyledDataGrid
        localeText={{
          noRowsLabel: noResultText ? noResultText : `${t('common.no-list')}`,
          noResultsOverlayLabel: noResultText
            ? noResultText
            : `${t('common.no-results')}`,
        }}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        autoPageSize={autoPageSize}
        initialState={initialState}
        hideFooterSelectedRowCount
        pageSizeOptions={[10]}
        columnHeaderHeight={48}
        slots={{
          ...slots,
        }}
        hideFooter={outerFooter || hideFooter}
        rowHover={rowHover}
        {...props}
      />
      {outerFooter && !hideFooter && props?.rows?.length > 0 && (
        <CustomFooter apiRef={props.apiRef} total={props.rowCount} />
      )}
    </Box>
  );
};

export default Table;
