import { Box, IconButton, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { PiracyOrderStore } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import {
  CustomFooter,
  NoListOverlay,
  StyledDataGrid,
  TableContent,
  TableOrderFile,
} from '@web-workspace/saforus/common/views';
import Icon from '@web-workspace/shared/components/widgets/icon';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  backgroundColor: 'var(--neutral-200)',
  borderRadius: '4px',
  '& svg': {
    fill: 'var(--gray-25)',
  },
}));

function PiracyOrderListView({
  orders,
  total,
  onPageChange,
  onRowClick,
  loading,
}: any) {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const { searchQuery } = useSnapshot(PiracyOrderStore);
  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo || 0,
    pageSize: searchQuery.elementPerPage || 10,
  });
  const orderArray = Array.from(orders ?? []);

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  // Reset page no when search query change
  const apiRef = useGridApiRef();
  useEffect(() => {
    if (searchQuery.pageNo !== paginationModel.page) {
      apiRef.current?.setPage(searchQuery.pageNo || 0);
    }
  }, [searchQuery.pageNo]);

  const onDeleteOrder = (id: string, orderName: string) => {
    dialogStore.openDialog({
      name: DialogType.DeleteDetectionOrder,
      props: {
        orderId: id,
        orderName: orderName,
      },
    });
  };

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
      field: 'orderNo',
      headerName: `${t('piracy-order-view.table.order-no')}`,
      minWidth: 180,
      maxWidth: 220,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent>{params.value}</TableContent>;
      },
    },
    {
      field: 'details',
      headerName: `${t('piracy-order-view.table.details')}`,
      minWidth: 300,
      maxWidth: 500,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return {
          thumbnailUrl: params.row.moreInfo?.craftedLinks?.small,
          fileName: params.row.fileName,
          contentType: params.row.contentType,
          format: params.row.extension,
        };
      },
      renderCell(params) {
        return <TableOrderFile props={params?.value} />;
      },
    },
    {
      field: 'orderStatus',
      headerName: `${t('piracy-order-view.table.status')}`,
      minWidth: 140,
      maxWidth: 180,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const reqDate = params.row.requestDate;
        const esCompletedTime = params.row.estimatedCompletionTime;
        return (
          <DetectionStatus
            value={params.value}
            reqDate={reqDate}
            esCompletedTime={esCompletedTime}
          />
        );
      },
    },
    {
      field: 'requestDate',
      headerName: `${t('piracy-order-view.table.request-date')}`,
      minWidth: 185,
      maxWidth: 200,
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? formatDateWithLanguage({
              date: params.value,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })
          : '--';
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {formattedDate.split(' ')[0]}
            <br />
            {formattedDate.split(' ')[1]} {formattedDate.split(' ')[2]}
            {` (GMT${timeZone})`}
          </TableContent>
        );
      },
    },
    {
      field: 'action',
      headerName: '',
      minWidth: 130,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,

      renderCell(params) {
        const orderId = params.row.id;
        const orderName = params.row.title;
        return (
          <ActionButton
            onClick={(event) => {
              onDeleteOrder(orderId, orderName);
              event.stopPropagation();
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'var(--red-50)',
                '& svg': {
                  fill: 'var(--red-500)',
                },
              },
            }}
          >
            <Icon
              name="delete"
              size={16}
              fillColor="var(--gray-25)"
              color="none"
            />
          </ActionButton>
        );
      },
    },
  ];

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
            rows={orderArray}
            columns={columns}
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            onRowClick={onRowClick}
            rowHover={true}
            rowHeight={84}
            hideFooter={total === 0}
            slots={{
              footer: CustomFooter,
              noRowsOverlay: NoListOverlay,
            }}
            slotProps={{
              footer: { total },
              noRowsOverlay: {
                linkText: t('common.detection-order'),
                title: t('common.no-list-title-list'),
                desc: t('common.no-list-description-list'),
                redirectUrl: ROUTES.PIRACY_DETECTION.NEW_REQUEST.path,
              },
            }}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(PiracyOrderListView);
