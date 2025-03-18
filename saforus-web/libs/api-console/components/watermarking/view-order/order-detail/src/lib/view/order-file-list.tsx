import { Box } from '@mui/material';
import { GridColDef, useGridApiRef, GridRowParams } from '@mui/x-data-grid';
import { Suspense, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import {
  StyledDataGrid,
  TableContent,
  TableOrderFile,
} from '@web-workspace/api-console/common/views';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

function OrderFileList({ orderFiles, total, reqDate, esCompletedTime }: any) {
  const { t } = useTranslation();

  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: '#',
      align: 'center',
      headerAlign: 'center',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent>
            {params.api.getAllRowIds().indexOf(params.id) + 1}
          </TableContent>
        );
      },
    },
    {
      field: 'details',
      headerName: `${t('apiWatermarking.order-detail.original-file')}`,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      hideable: true,
      valueGetter: (params) => {
        const orderFile = params.row;
        return {
          thumbnailUrl: orderFile?.moreInfo?.craftedLinks?.small,
          fileName: orderFile?.fileName,
          contentType: orderFile?.fileType,
          format: orderFile?.fileFormat,
        };
      },
      renderCell(params) {
        return <TableOrderFile props={params?.value} />;
      },
    },

    {
      field: 'status',
      headerName: `${t('apiWatermarking.order-detail.status')}`,
      width: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <DetectionStatus
            value={params.value}
            reqDate={reqDate}
            esCompletedTime={esCompletedTime}
          />
        );
      },
    },
  ];

  const { orderId } = useParams();
  const navigate = useNavigate();
  const onRowClick = (params: GridRowParams) => {
    const fileId = params.row.id;

    const detailPageUrl = `${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/${orderId}/files/${fileId}`;
    // Navigate to the order file page
    navigate(detailPageUrl);
  };

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </Box>
      }
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <StyledDataGrid
            apiRef={apiRef}
            rows={orderFiles}
            columns={columns}
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="client"
            onPaginationModelChange={setPaginationModel}
            // loading={isLoading}
            onRowClick={onRowClick}
            rowHeight={84}
            rowHover={true}
            hideFooter={total === 0}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(OrderFileList);
