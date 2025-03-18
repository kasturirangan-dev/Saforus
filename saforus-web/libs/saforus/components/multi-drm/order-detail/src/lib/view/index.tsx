import { Box, Card, SxProps, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Table from '@web-workspace/shared/components/widgets/table';
import { Link } from 'react-router-dom';
import { Suspense, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  const color = 'var(--gray-700)';
  let borderRadius = '0px';
  let px = '0';
  let py = '0';

  switch (field) {
    case 'streamingFormat':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '5px';
      break;
    case 'watermark':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '5px';
      break;
    case 'drm':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '5px';
      break;
    case 'fileName':
      return (
        <Link
          to={`${
            ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.children
              .MULTI_DMR_PACKING_DETAIL.children.MULTI_DMR_PACKING_CONFIGURATION
              .path
          }/${value.replace(/\./g, '')}?orderNo=FI-1685522660150`}
        >
          <Typography
            sx={{
              color,
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
        </Link>
      );
      break;
    default:
      break;
  }

  return (
    <Typography
      sx={{
        color,
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
    field: 'siteName',
    headerName: 'site-name',
    minWidth: 100,
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
    minWidth: 300,
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
    field: 'resolution',
    headerName: 'resolution',
    width: 200,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'streamingFormat',
    headerName: 'streaming-format',
    width: 150,
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
    field: 'watermark',
    headerName: 'watermark',
    width: 150,
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
    width: 150,
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
    field: 'outputFilePath',
    headerName: 'output-file-path',
    width: 200,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
  },
];

function OrderDetailView({
  isLoading,
  files = [
    {
      id: 1,
      siteName: 'Site A',
      fileName: '[Video_1]file1.mp4',
      resolution: '1920x1080',
      streamingFormat: 'HLS',
      watermark: 'FORENSIC',
      drm: 'PLAYREADY',
      outputFilePath: '/path/to/output1.mp4',
    },
    {
      id: 2,
      siteName: 'Site B',
      fileName: '[Video_2]file2.mp4',
      resolution: '1280x720',
      streamingFormat: 'DASH',
      watermark: 'FORENSIC',
      drm: 'WIDEVINE',
      outputFilePath: '/path/to/output2.mp4',
    },
    {
      id: 3,
      siteName: 'Site C',
      fileName: '[Video_3]file3.mp4',
      resolution: '3840x2160',
      streamingFormat: 'HLS',
      watermark: 'FORENSIC',
      drm: 'PLAYREADY',
      outputFilePath: '/path/to/output3.mp4',
    },
    {
      id: 4,
      siteName: 'Site D',
      fileName: '[Video_4]file4.mp4',
      resolution: '1920x1080',
      streamingFormat: 'DASH',
      watermark: 'FORENSIC',
      drm: 'WIDEVINE',
      outputFilePath: '/path/to/output4.mp4',
    },
    {
      id: 5,
      siteName: 'Site E',
      fileName: '[Video_4]file5.mp4',
      resolution: '1280x720',
      streamingFormat: 'HLS',
      watermark: 'FORENSIC',
      drm: 'PLAYREADY',
      outputFilePath: '/path/to/output5.mp4',
    },
  ],
  total,
  onClearCache,
}: any) {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  //   const { setRequestQuery, setFiles } = useSnapshot(ViewOrderDetailStore);
  //   const [paginationModel, setPaginationModel] = useState({
  //     page: 0,
  //     pageSize: 10,
  //   });

  //   const location = useLocation();
  //   const parts = location.pathname.split('/');
  //   const orderNo = parts[parts.length - 1];

  //   useEffect(() => {
  //     const fromRow = paginationModel.page * paginationModel.pageSize;
  //     setRequestQuery({ orderId: orderNo, fromRow });
  //     return () => {
  //       setFiles({ data: [], total: 0 });
  //       setRequestQuery({ orderId: '' });
  //       onClearCache();
  //     };
  //   }, [paginationModel]);

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
        <Typography
          sx={{
            fontWeight: '600',
            mb: '1rem',
            fontSize: '28px',
            lineHeight: '38px',
          }}
        >
          {t('view-order.detail.title')}
        </Typography>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
          }}
        >
          <Table
            rows={files}
            columns={
              columns.map((el) => {
                return {
                  ...el,
                  headerName: t(`multiDrm.order-detail.${el.headerName}`),
                };
              }) as GridColDef[]
            }
            rowCount={total}
            //paginationModel={paginationModel}
            paginationMode="server"
            //onPaginationModelChange={setPaginationModel}
            loading={isLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}
export default memo(OrderDetailView);
