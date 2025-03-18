import { Box, styled, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, GridEventListener, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  ViewOrderStore,
  WatermarkingOrder,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import {
  formatDateWithLanguage,
  formatDate,
} from '@web-workspace/shared/helpers/dates';
import {
  CustomFooter,
  NoListOverlay,
  StyledDataGrid,
  TableContent,
  TableOrderFile,
} from '@web-workspace/saforus/common/views';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import {
  IOrderFile,
  StatusName,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  backgroundColor: 'var(--neutral-200)',
  borderRadius: '4px',
  '& svg': {
    fill: 'var(--gray-25)',
  },
}));

type ViewOrderListProps = {
  orders: WatermarkingOrder[];
  total: number;
  onPageChange(pageChange: any): void;
  onRowClick?: GridEventListener<'rowClick'>;
  onDeleteOrder: (orderId: string, orderNo: string) => void;
  onDownLoad: (personOrderInfoSq: string, psnInfoFileNm: string) => void;
  loading: boolean;
};

function OrderListView({
  orders,
  total,
  onPageChange,
  onRowClick,
  onDeleteOrder,
  onDownLoad,
  loading,
}: ViewOrderListProps) {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const { searchQuery } = useSnapshot(ViewOrderStore);
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
      headerName: `${t('view-watermarked-order.table.order-no')}`,
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
      headerName: `${t('view-watermarked-order.table.watermarked-file')}`,
      minWidth: 300,
      maxWidth: 500,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        const details = params?.value as IOrderFile[];
        if (details && details.length > 0) {
          return {
            thumbnailUrl: details[0]?.moreInfo?.craftedLinks?.small,
            fileName: details[0]?.psnInfoFileNm,
            contentType: details[0]?.psnFileMediaCd,
            format: details[0]?.format,
          };
        } else return {};
      },
      renderCell(params) {
        return <TableOrderFile props={params?.value} />;
      },
    },
    {
      field: 'orderStatus',
      headerName: `${t('view-watermarked-order.table.status')}`,
      minWidth: 140,
      maxWidth: 180,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const details = params.row.details as IOrderFile[];
        const reqDate = details[0]?.regDt;
        const esCompletedTime = details[0]?.estimatedCompletionTime;
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
      headerName: `${t('view-watermarked-order.table.requested')}`,
      minWidth: 185,
      maxWidth: 200,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? formatDateWithLanguage({
              date: params.value,
              isDetail: false,
              withSlash: true,
              tzOffset,
            })
          : '--';
        const formatTime = params.value
          ? formatDate(params.value, 'h:mm a', timeZone)
          : '';
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {formattedDate}
            <br />
            {`${formatTime} (GMT${timeZone})`}
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
        const orderNo = params.row.orderNo;
        const orderId = params.row.id;
        const personOrderInfoSq = params.row.details[0]?.personOrderInfoSq;
        const psnInfoFileNm = params.row.details[0]?.psnInfoFileNm;
        const canDownload = params.row.orderStatus === StatusName.COMPLETED;
        return (
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <ActionButton
              onClick={(event) => {
                if (canDownload) {
                  onDownLoad(personOrderInfoSq, psnInfoFileNm);
                } else {
                  showToast.error(
                    t('view-watermarked-order.inprogress-message')
                  );
                }
                event.stopPropagation();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: canDownload
                    ? 'var(--purple-50)'
                    : 'var(--neutral-200)',
                  '& svg': {
                    fill: canDownload ? 'var(--purple-500)' : 'var(--gray-25)',
                  },
                },
              }}
            >
              <Icon
                name="download"
                size={16}
                fillColor="var(--gray-25)"
                color="none"
              />
            </ActionButton>
            <ActionButton
              onClick={(event) => {
                onDeleteOrder(orderId, orderNo);
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
          </Box>
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
            noResultText={`${t('view-watermarked-order.table.no-results')}`}
            hideFooter={total === 0}
            slots={{
              footer: CustomFooter,
              noRowsOverlay: NoListOverlay,
            }}
            slotProps={{
              footer: { total },
              noRowsOverlay: {
                linkText: t('common.watermarking-order'),
                title: t('common.no-list-title-list'),
                desc: t('common.no-list-description-list'),
                redirectUrl: ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path,
              },
            }}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(OrderListView);
