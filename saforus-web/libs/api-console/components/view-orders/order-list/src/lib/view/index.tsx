import { Box, IconButton, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  OrderStatus,
  ViewOrderStore,
} from '@web-workspace/api-console/components/view-orders/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { DetectionStatus } from '@web-workspace/shared/components/widgets/content-label';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import {
  StyledDataGrid,
  TableContent,
  TableOrderFile,
} from '@web-workspace/api-console/common/views';
import { OrderDetail } from '@web-workspace/api-console/components/view-orders/data';
import { getValidFormat } from '@web-workspace/shared/helpers/format';
import CustomNoRowsOverlay from './no-rows-overlay ';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';

const ActionButton = styled(IconButton)(() => ({
  padding: '8px',
  backgroundColor: 'var(--neutral-200)',
  borderRadius: '4px',
  '& svg': {
    fill: 'var(--gray-25)',
  },
}));

function OrderListView({
  orders,
  total,
  onRowClick,
  loading,
  onDeleteOrder,
}: {
  orders: readonly OrderDetail[];
  total: number;
  onRowClick: (params: any) => void;
  loading: boolean;
  onDeleteOrder: (orderType: string, orderId: string) => void;
}) {
  const { t } = useTranslation();
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);

  const { searchQuery, setSearchQuery } = useSnapshot(ViewOrderStore);
  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.page || 0,
    pageSize: searchQuery.pageSize || 10,
  });
  const orderArray = Array.from(orders ?? []);

  useEffect(() => {
    setSearchQuery({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    });
  }, [paginationModel]);

  // Reset page no when search query change
  const apiRef = useGridApiRef();
  useEffect(() => {
    if (searchQuery.page !== paginationModel.page) {
      apiRef.current?.setPage(searchQuery.page || 0);
    }
  }, [searchQuery.page]);

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
      field: 'orderType',
      headerName: `${t('apiOrderList.table.order-type')}`,
      minWidth: 120,
      maxWidth: 160,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent textTransform={'capitalize'}>
            {t(`apiOrderList.table.${params.value}`)}
          </TableContent>
        );
      },
    },
    {
      field: 'id',
      headerName: `${t('apiOrderList.table.order-no')}`,
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
      headerName: '',
      minWidth: 250,
      maxWidth: 520,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      hideable: true,
      valueGetter: (params) => {
        const orderFile = params.row.orderFiles[0];
        return {
          thumbnailUrl: orderFile?.moreInfo?.craftedLinks?.small,
          fileName: orderFile?.fileName,
          contentType: orderFile?.fileType,
          format: getValidFormat(orderFile?.fileFormat),
        };
      },
      renderCell(params) {
        return <TableOrderFile props={params?.value} />;
      },
    },
    {
      field: 'status',
      headerName: `${t('apiOrderList.table.status')}`,
      width: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const status = params.row.status;
        const reqDate = params.row.createdAt;
        const esCompletedTime =
          params.row.orderFiles[0].moreInfo?.estimatedCompletionTime;
        return (
          <Tooltip
            title={null}
            titleHeader={t('apiOrderList.table.expired-tooltip') || ''}
            placement="top"
            open={hoveredRowId === params.row.id}
          >
            <DetectionStatus
              value={status}
              reqDate={reqDate}
              esCompletedTime={esCompletedTime}
            />
          </Tooltip>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: `${t('apiOrderList.table.request-date')}`,
      width: 180,
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
            {formattedDate}
          </TableContent>
        );
      },
    },
    /*
    {
      field: 'action',
      headerName: '',
      width: 60,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,

      renderCell(params) {
        const orderType = params.row.orderType;
        const orderId = params.row.id;
        return (
          <ActionButton
            onClick={(event) => {
              onDeleteOrder(orderType, orderId);
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
            <InlineSvg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.50159 6.66667C7.50159 6.20551 7.12774 5.83167 6.66659 5.83167C6.20543 5.83167 5.83159 6.20551 5.83159 6.66667H7.50159ZM5.83159 12C5.83159 12.4612 6.20543 12.835 6.66659 12.835C7.12774 12.835 7.50159 12.4612 7.50159 12H5.83159ZM10.1683 6.66667C10.1683 6.20551 9.79441 5.83167 9.33325 5.83167C8.87209 5.83167 8.49825 6.20551 8.49825 6.66667H10.1683ZM8.49825 12C8.49825 12.4612 8.87209 12.835 9.33325 12.835C9.79441 12.835 10.1683 12.4612 10.1683 12H8.49825ZM4.72793 13.8547L5.10701 13.1107H5.10701L4.72793 13.8547ZM4.14524 13.272L4.88923 12.8929H4.88923L4.14524 13.272ZM11.8546 13.272L11.1106 12.8929H11.1106L11.8546 13.272ZM11.2719 13.8547L10.8928 13.1107H10.8928L11.2719 13.8547ZM3.33325 3.83167C2.87209 3.83167 2.49825 4.20551 2.49825 4.66667C2.49825 5.12782 2.87209 5.50167 3.33325 5.50167V3.83167ZM12.6666 5.50167C13.1277 5.50167 13.5016 5.12782 13.5016 4.66667C13.5016 4.20551 13.1277 3.83167 12.6666 3.83167V5.50167ZM4.83159 4.66667C4.83159 5.12782 5.20543 5.50167 5.66659 5.50167C6.12774 5.50167 6.50159 5.12782 6.50159 4.66667H4.83159ZM9.49825 4.66667C9.49825 5.12782 9.87209 5.50167 10.3333 5.50167C10.7944 5.50167 11.1683 5.12782 11.1683 4.66667H9.49825ZM5.83159 6.66667V12H7.50159V6.66667H5.83159ZM8.49825 6.66667V12H10.1683V6.66667H8.49825ZM11.1649 4.66667V11.8667H12.8349V4.66667H11.1649ZM9.86659 13.165H6.13325V14.835H9.86659V13.165ZM3.16492 4.66667V11.8667H4.83492V4.66667H3.16492ZM6.13325 13.165C5.74611 13.165 5.50596 13.1644 5.32552 13.1496C5.15482 13.1357 5.11229 13.1134 5.10701 13.1107L4.34885 14.5987C4.62879 14.7413 4.91555 14.7917 5.18953 14.8141C5.45375 14.8356 5.77366 14.835 6.13325 14.835V13.165ZM3.16492 11.8667C3.16492 12.2263 3.16427 12.5462 3.18586 12.8104C3.20824 13.0844 3.25862 13.3711 3.40125 13.6511L4.88923 12.8929C4.88654 12.8876 4.86426 12.8451 4.85031 12.6744C4.83557 12.494 4.83492 12.2538 4.83492 11.8667H3.16492ZM5.10701 13.1107C5.01324 13.0629 4.93701 12.9867 4.88923 12.8929L3.40125 13.6511C3.60914 14.0591 3.94085 14.3908 4.34885 14.5987L5.10701 13.1107ZM11.1649 11.8667C11.1649 12.2538 11.1643 12.494 11.1495 12.6744C11.1356 12.8451 11.1133 12.8876 11.1106 12.8929L12.5986 13.6511C12.7412 13.3711 12.7916 13.0844 12.814 12.8104C12.8356 12.5462 12.8349 12.2263 12.8349 11.8667H11.1649ZM9.86659 14.835C10.2262 14.835 10.5461 14.8356 10.8103 14.8141C11.0843 14.7917 11.371 14.7413 11.651 14.5987L10.8928 13.1107C10.8875 13.1134 10.845 13.1357 10.6743 13.1496C10.4939 13.1644 10.2537 13.165 9.86659 13.165V14.835ZM11.1106 12.8929C11.0628 12.9867 10.9866 13.0629 10.8928 13.1107L11.651 14.5987C12.059 14.3908 12.3907 14.0591 12.5986 13.6511L11.1106 12.8929ZM3.33325 5.50167H3.99992V3.83167H3.33325V5.50167ZM3.99992 5.50167H11.9999V3.83167H3.99992V5.50167ZM11.9999 5.50167H12.6666V3.83167H11.9999V5.50167ZM6.50159 4.13333C6.50159 3.48514 7.10041 2.835 7.99992 2.835V1.165C6.3221 1.165 4.83159 2.42512 4.83159 4.13333H6.50159ZM7.99992 2.835C8.89943 2.835 9.49825 3.48514 9.49825 4.13333H11.1683C11.1683 2.42512 9.67774 1.165 7.99992 1.165V2.835ZM4.83159 4.13333V4.66667H6.50159V4.13333H4.83159ZM9.49825 4.13333V4.66667H11.1683V4.13333H9.49825Z"
                fill="inherit"
              />
            </InlineSvg>
          </ActionButton>
        );
      },
    },
    */
  ];

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const handleRowHovered = (event: React.MouseEvent<HTMLElement>) => {
    const rowId = event.currentTarget?.dataset?.id ?? null;
    const status = orderArray.find((order) => order.id === rowId)?.status;
    if (status === OrderStatus.EXPIRED) {
      setHoveredRowId(rowId);
    }
  };

  const handleRowLeaved = (event: React.MouseEvent<HTMLElement>) => {
    const rowId = event.currentTarget?.dataset?.id ?? null;
    setHoveredRowId((prev) => (prev === rowId ? null : prev));
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
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          noRowsHeight="232px"
          hideFooter={total === 0}
          componentsProps={{
            row: {
              onMouseEnter: handleRowHovered,
              onMouseLeave: handleRowLeaved,
            },
          }}
        />
      </Box>
    </Suspense>
  );
}

export default memo(OrderListView);
