import { Pagination, Typography } from '@mui/material';
import { GridFooterContainer, useGridApiContext } from '@mui/x-data-grid';

interface CustomFooterProps {
  total: number;
}

const CustomFooter = ({ total }: CustomFooterProps) => {
  const apiRef = useGridApiContext();
  const page = apiRef.current.state.pagination.paginationModel.page + 1;
  const pageSize = apiRef.current.state.pagination.paginationModel.pageSize;
  const pageCount = Math.ceil(total / pageSize);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    apiRef.current.setPage(value - 1);
  };

  return (
    <GridFooterContainer
      sx={{
        backgroundColor: 'var(--gray-25)',
        borderTop: 'none',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            margin: '0 auto',
            '& .Mui-selected': {
              borderRadius: '6px',
            },
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          color: 'var(--gray-25)',
          textAlign: 'right',
          marginLeft: `${total <= 10 && 'auto'}`,
        }}
      >
        Total: {total}
      </Typography>
    </GridFooterContainer>
  );
};

export default CustomFooter;
