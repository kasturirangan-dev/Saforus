import { Box, Card, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { Link } from 'react-router-dom';
import { StatusName } from '../data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}
function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  let color = 'var(--gray-700)';
  let textDecorationLine = 'none';
  let borderRadius = '0px';
  let px = '0';
  let py = '0';
  switch (field) {
    case 'orderNo':
      color = 'var(--purple-400)';
      textDecorationLine = 'underline';
      break;
    case 'statusName':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';
      switch (value) {
        case StatusName.COMPLETED:
          color = 'var(--green-700)';
          break;
        case StatusName.INPROGRESS:
          color = 'var(--purple-600)';
          break;
        case StatusName.INQUEUE:
          color = 'var(--purple-400)';
          break;
        case StatusName.FAILED:
          color = 'var(--red-500)';
          break;
        default:
          color = 'var(--red-500)';
          break;
      }
      break;
    case 'watermark':
    case 'drm':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';
      break;
    default:
      break;
  }

  return (
    <Typography
      sx={{
        color,
        textDecorationLine,
        fontSize: '15px',
        fontWeight: '400',
        textAlign: 'center',
        borderRadius,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        ...sx,
        px,
        py,
      }}
    >
      {value}
    </Typography>
  );
}

const columns: GridColDef[] = [
  {
    field: 'orderNo',
    headerName: 'order-no',
    width: 180,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      const orderId = params.value;
      const detailPageUrl = `${ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.children.MULTI_DMR_PACKING_DETAIL.path}/${orderId}`;
      return (
        <Link to={detailPageUrl}>
          <ResultContentLabel
            sx={{
              cursor: 'pointer',
            }}
            field={params.field}
            value={params.value}
          />
        </Link>
      );
    },
  },
  {
    field: 'requestedBy',
    headerName: 'requester',
    width: 180,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {params.value ?? '--'}
        </Box>
      );
    },
  },
  {
    field: 'siteName',
    headerName: 'site-name',
    width: 180,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {params.value ?? '--'}
        </Box>
      );
    },
  },
  {
    field: 'fileName',
    headerName: 'file-name',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {params.value ?? '--'}
        </Box>
      );
    },
  },
  {
    field: 'statusName',
    headerName: 'status',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      switch (params.value) {
        case StatusName.COMPLETED:
          return (
            <ResultContentLabel
              field={params.field}
              value={params.value}
              sx={{
                backgroundColor: 'var(--green-50)',
              }}
            />
          );
        case StatusName.INPROGRESS:
          return (
            <ResultContentLabel
              field={params.field}
              value={params.value}
              sx={{
                backgroundColor: 'var(--purple-50)',
              }}
            />
          );

        case StatusName.INQUEUE:
          return (
            <ResultContentLabel
              field={params.field}
              value={params.value}
              sx={{
                backgroundColor: 'var(--purple-50)',
              }}
            />
          );

        case StatusName.FAILED:
          return (
            <ResultContentLabel
              field={params.field}
              value={params.value}
              sx={{
                backgroundColor: 'var(--purple-50)',
              }}
            />
          );
        default:
          break;
      }
    },
  },
  {
    field: 'watermark',
    headerName: 'watermark',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <ResultContentLabel
          field={params.field}
          value={params.value}
          sx={{
            backgroundColor: 'var(--neutral-300)',
          }}
        />
      );
    },
  },
  {
    field: 'drm',
    headerName: 'drm',
    width: 180,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <ResultContentLabel
          field={params.field}
          value={params.value}
          sx={{
            backgroundColor: 'var(--neutral-300)',
          }}
        />
      );
    },
  },
  {
    field: 'requestDate',
    headerName: 'requested',
    width: 180,
    sortable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {formatDateWithLanguage(params?.value, i18next.language, true)}
        </Box>
      );
    },
  },
];

function OrderListView({
  onPageChange,
  orders = [
    {
      id: 1,
      orderNo: 'ORD001',
      requestedBy: 'John Doe',
      siteName: 'Site A',
      fileName: 'file1.mp4',
      statusName: 'Completed',
      watermark: 'Enabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 2,
      orderNo: 'ORD002',
      requestedBy: 'Jane Smith',
      siteName: 'Site B',
      fileName: 'file2.mp4',
      statusName: 'In Progress',
      watermark: 'Disabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 3,
      orderNo: 'ORD001',
      requestedBy: 'John Doe',
      siteName: 'Site A',
      fileName: 'file1.mp4',
      statusName: 'Completed',
      watermark: 'Enabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 4,
      orderNo: 'ORD002',
      requestedBy: 'Jane Smith',
      siteName: 'Site B',
      fileName: 'file2.mp4',
      statusName: 'In Progress',
      watermark: 'Disabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    // Add more orders as needed
    {
      id: 5,
      orderNo: 'ORD003',
      requestedBy: 'Alice Johnson',
      siteName: 'Site C',
      fileName: 'file3.mp4',
      statusName: 'In Queue',
      watermark: 'Enabled',
      drm: 'Disabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 6,
      orderNo: 'ORD004',
      requestedBy: 'Bob Williams',
      siteName: 'Site D',
      fileName: 'file4.mp4',
      statusName: 'Failed',
      watermark: 'Disabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 7,
      orderNo: 'ORD005',
      requestedBy: 'Eva Davis',
      siteName: 'Site E',
      fileName: 'file5.mp4',
      statusName: 'In Progress',
      watermark: 'Enabled',
      drm: 'Disabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
    {
      id: 8,
      orderNo: 'ORD006',
      requestedBy: 'Mike Anderson',
      siteName: 'Site F',
      fileName: 'file6.mp4',
      statusName: 'Completed',
      watermark: 'Enabled',
      drm: 'Enabled',
      requestDate: formatDateWithLanguage(new Date(), i18next.language),
    },
  ],
  total,
  orderLoading,
}: any) {
  const { t } = useTranslation();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);
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
      <Card
        sx={{
          mt: '1.5rem',
          background: 'var(--base-white)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('view-order.list.title')}
        </Typography>
        <Box sx={{ maxWidth: 'calc(100vw - 30rem)' }}>
          <Table
            rows={orders}
            columns={
              columns.map((el) => {
                return {
                  ...el,
                  headerName: t(`multiDrm.order-list.${el.headerName}`),
                };
              }) as GridColDef[]
            }
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={orderLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(OrderListView);
