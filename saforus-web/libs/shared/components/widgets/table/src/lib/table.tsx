import {
  TablePaginationProps,
  styled,
  Box,
  Typography,
  Theme,
} from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridPagination,
  gridFilteredTopLevelRowCountSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridRootProps,
  useGridSelector,
} from '@mui/x-data-grid';
import React from 'react';
import MuiPagination from '@mui/material/Pagination';
import { useTranslation } from 'react-i18next';

type TableProps = DataGridProps & {
  tableCss?: React.CSSProperties; // Added extra props type here
  showSelectedRowText?: React.ReactNode;
  paginationContent?: () => JSX.Element;
  noResultText?: string;
  noRowText?: string;
  rowHover?: boolean;
  noRowsHeight?: string;
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
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'var(--neutral-600)',
    border: 'none',
    borderRadius: '4px 4px 0 0',
    height: '3rem',
    '&:hover': {
      border: 'none',
    },
  },

  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },

  '& .MuiDataGrid-row': {
    '&.Mui-selected': {
      backgroundColor: 'var(--purple-50)',
      color: 'var(--gray-700)',
    },
    borderBottom: '1px solid #dae0e6',
    color: 'var(--gray-25)',
  },

  '& .MuiDataGrid-cell': {
    border: 'none',
    color: 'inherit',
    '&.Muidatagrid-cell--editing': {
      backgroundColor: 'var(--base-white)',
    },
    '&:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-cell--withRenderer.Mui-disabled': {
      // Style for the cell containing the disabled checkbox
      backgroundColor: 'var(--base-white)', // Adjust the color to match your design
      opacity: 0.5, // Adjust the opacity to get the desired disabled look
    },
  },

  '& .MuiDataGrid-row.MuiDataGrid-row--editing': {
    backgroundColor: 'inherit',
  },

  '& .row-disabled': {
    backgroundColor: 'var(--neutral-100)',
    '& .MuiDataGrid-cell': {
      color: 'var(--gray-25)',
    },
  },

  '& .MuiSvgIcon-root.Mui-disabled': {
    // Style for the SVG icon inside the disabled checkbox
    fill: 'var(--neutral-900)', // Change this to the color you want for the checkbox icon
  },

  '.MuiDataGrid-overlay': {
    justifyContent: 'flex-start',
    padding: '0.5rem',
  },

  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    backgroundColor: 'var(--neutral-600)',
    '> div:first-of-type': {
      display: 'none',
    },
  },

  ...customCheckbox(theme),
  // Add style when row hover
  ...rowHoverStyles(rowHover),
}));

const getPageCount = (rowCount: number, pageSize: number): number => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }

  return 0;
};

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const visibleTopLevelRowCount = useGridSelector(
    apiRef,
    gridFilteredTopLevelRowCountSelector
  );
  const pageCount = getPageCount(
    rootProps.rowCount ?? visibleTopLevelRowCount,
    pageSize
  );

  const { t } = useTranslation();

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      boundaryCount={2}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
      sx={{
        '& .MuiPaginationItem-root': {
          '&.Mui-selected': {
            color: 'var(--blue-700)',
            backgroundColor: 'var(--neutral-600)',
          },
        },
        '.MuiPagination-ul': {
          flexWrap: 'nowrap',
          li: {
            '&:first-of-type': {
              flexBasis: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              '> button::after': {
                marginLeft: '10px',
                content: `"${t('common.previous')}"`,
              },
            },
            '&:last-child': {
              flexBasis: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: '1rem',
              '> button::before': {
                marginRight: '10px',
                content: `"${t('common.next')}"`,
              },
            },
          },
        },
      }}
    />
  );
}

function CustomPagination(
  total: number,
  paginationContent?: () => JSX.Element
) {
  const { t } = useTranslation();
  return (
    <>
      <Box
        display={'flex'}
        gap={'1rem'}
        paddingX={'1rem'}
        color={'var(--gray-50)'}
      >
        <Typography fontWeight={700}>
          {t('common.total', {
            total,
          })}
        </Typography>
        {paginationContent && paginationContent()}
      </Box>
      <GridPagination
        ActionsComponent={Pagination}
        labelDisplayedRows={() => null}
      />
    </>
  );
}

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
          pagination: () =>
            CustomPagination(props?.rows?.length ?? 0, paginationContent),
        }}
        rowHover={rowHover}
        {...props}
      />
    </Box>
  );
};

export default Table;
