import {
  Box,
  Card,
  InputLabel,
  SxProps,
  Typography,
  styled,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import Table from '@web-workspace/shared/components/widgets/table';
import { useTranslation } from 'react-i18next';
import ViewOrderDetailStore from '../store';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import i18next from 'i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import ContentLabel, {
  OrderStatus,
} from '@web-workspace/shared/components/widgets/content-label';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

const StyledDataGrid = styled(Table)({
  '& .MuiDataGrid-columnHeaders': {
    height: `${pxToVw('3rem')} !important`,
    minHeight: `${pxToVw('48px')} !important`,
    maxHeight: `${pxToVw('48px')} !important`,
    lineHeight: `${pxToVw('48px')} !important`,
  },
  '& .orderNo': {
    width: `${pxToVw('180px')} !important`,
    maxWidth: `${pxToVw('180px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .fileName': {
    width: `${pxToVw('300px')} !important`,
    maxWidth: `${pxToVw('300px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .psnStartNum, .userFullName, .expirationDate': {
    width: `${pxToVw('200px')} !important`,
    maxWidth: `${pxToVw('200px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .progress, .watermarkCode, .psnFileMediaCd, .formatFWM': {
    width: `${pxToVw('150px')} !important`,
    maxWidth: `${pxToVw('150px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
});

const enum Status {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'IN_PROGRESS',
  INQUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
}

function ResultFileNameImage({ params }: any) {
  const row = { ...params.row };
  const filePageUrl = `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children.WATERMARKING_HISTORY_DETAIL.children.WATERMARKING_DOWNLOAD_FILES.path}/${row?.personOrderInfoSq}?fileName=${row?.fileName}&&expirationDate=${row?.expirationDate}&&type=${row?.psnFileMediaCd}&&psnInfoId=${row?.psnInfoId}`;

  const isThumbImageEnable = isFeatureEnabled(FeatureFlag.THUMBNAILS) || true;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        {row?.progress === Status.COMPLETED ? (
          <Link to={filePageUrl}>
            <Typography
              sx={{
                fontSize: pxToVw('14px'),
                lineHeight: pxToVw('20px'),
                color: 'var(--purple-400)',
                textDecorationLine: 'underline',
                width: pxToVw(250),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginLeft: pxToVw('0.5rem'),
              }}
            >
              {row.fileName}
            </Typography>
          </Link>
        ) : (
          <Typography
            sx={{
              fontSize: pxToVw('14px'),
              color: 'var(--gray-25)',
              width: pxToVw(250),
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: pxToVw('0.5rem'),
            }}
          >
            {row.fileName}
          </Typography>
        )}
      </Box>
      {row?.progress === '100%' && (
        <Typography
          sx={{
            lineHeight: pxToVw('20px'),
            color: '#2D8A39',
            backgroundColor: '#F0FAF0',
            borderRadius: pxToVw('5px'),
            padding: pxToVw(['4px', '12px']),
          }}
        >
          Download
        </Typography>
      )}
    </Box>
  );
}

function CustomInputLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let textColor: string;
  let bgColor: string;
  let valueLabel = value;
  switch (field) {
    case 'progress':
      switch (value) {
        case Status.COMPLETED:
          textColor = 'var(--green-700)';
          bgColor = 'var(--green-50)';
          valueLabel = t('page-watermarking.status.completed');
          break;
        case Status.INPROGRESS:
          textColor = 'var(--purple-600)';
          bgColor = 'var(--purple-50)';
          valueLabel = t('page-watermarking.status.in-progress');
          break;
        case Status.INQUEUE:
          textColor = 'var(--gray-700)';
          bgColor = 'var(--neutral-300)';
          valueLabel = t('page-watermarking.status.in-queue');
          break;
        case Status.FAILED:
          textColor = 'var(--red-600)';
          bgColor = 'var(--red-100)';
          valueLabel = t('page-watermarking.status.failed');
          break;
        default:
          textColor = 'var(--gray-700)';
          bgColor = 'var(--neutral-300)';
          valueLabel = '--';
          break;
      }
      break;
    default:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      break;
  }

  return (
    <InputLabel
      color="primary"
      sx={{
        borderRadius: pxToVw('5px'),
        bgcolor: bgColor,
        color: textColor,
        padding: pxToVw(['4px', '12px', '4px', '12px']),
        fontSize: pxToVw('0.875rem'),
        fontWeight: '500',
        lineHeight: pxToVw('1.25rem'),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      {valueLabel}
    </InputLabel>
  );
}

function OrderDetailView({ isLoading, files = [], total, onClearCache }: any) {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { setRequestQuery, setFiles } = useSnapshot(ViewOrderDetailStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [searchParams] = useSearchParams();
  const title = searchParams?.get('title') || t('view-order.detail.title');

  const location = useLocation();
  const parts = location.pathname.split('/');
  const orderNo = parts[parts.length - 1];

  useEffect(() => {
    const fromRow = paginationModel.page * paginationModel.pageSize;
    setRequestQuery({ orderId: orderNo, fromRow });
    return () => {
      setFiles({ data: [], total: 0 });
      setRequestQuery({ orderId: '' });
      onClearCache();
    };
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: 'fileName',
      headerName: `${t('page-watermarking.table.file-name')}`,
      headerClassName: 'fileName',
      cellClassName: 'fileName',
      // width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultFileNameImage params={params} />;
      },
    },
    {
      field: 'progress',
      headerName: `${t('page-watermarking.table.status')}`,
      headerClassName: 'progress',
      cellClassName: 'progress',
      // width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <OrderStatus
            style={{ textTransform: 'uppercase', padding: '4px 12px' }}
            value={params.value}
          />
        );
      },
    },
    {
      field: 'watermarkCode',
      headerName: `${t('page-watermarking.table.watermark-code')}`,
      headerClassName: 'watermarkCode',
      cellClassName: 'watermarkCode',
      // width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {params.value || '--'}
          </Box>
        );
      },
    },
    {
      field: 'psnFileMediaCd',
      headerName: `${t('page-watermarking.table.type')}`,
      headerClassName: 'psnFileMediaCd',
      cellClassName: 'psnFileMediaCd',
      // width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        const type = params?.value || '--';
        return type;
      },
      renderCell(params) {
        let label = params.value;
        if (params.value === MEDIA_TYPE.IMG) {
          label = t('page-watermarking.table.image');
        } else if (params.value === MEDIA_TYPE.VIDEO) {
          label = t('page-watermarking.table.video');
        } else if (params.value === MEDIA_TYPE.AUDIO) {
          label = t('page-watermarking.table.audio');
        } else if (params.value === MEDIA_TYPE.DOCUMENT) {
          label = t('page-watermarking.table.document');
        } else {
          label = params.value as string;
        }
        return (
          <ContentLabel
            neutral
            label={label}
            style={{
              padding: '4px 12px',
            }}
          />
        );
      },
    },
    {
      field: 'format',
      headerName: `${t('page-watermarking.table.format')}`,
      headerClassName: 'formatFWM',
      cellClassName: 'formatFWM',
      // width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        if (params?.value?.length > 0) {
          const formats = params?.value;
          let formatedValue = formats?.toUpperCase();
          if (formats.startsWith('.')) {
            formatedValue = formats.slice(1).toUpperCase();
          }
          if (formats.slice(1).startsWith('.')) {
            formatedValue = formats.replace('.', '_').toUpperCase();
          }
          return formatedValue ? formatedValue : '--';
        } else {
          return '--';
        }
      },
      renderCell(params) {
        const label = params?.value ?? '--';
        return (
          <ContentLabel
            neutral
            label={label}
            style={{
              padding: '4px 12px',
            }}
          />
        );
      },
    },
    {
      field: 'expirationDate',
      headerName: `${t('page-watermarking.table.expiration-date')}`,
      headerClassName: 'expirationDate',
      cellClassName: 'expirationDate',
      // width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {params?.value === '0'
              ? '--'
              : formatDateWithLanguage(
                  params?.value,
                  i18next.language,
                  true,
                  undefined,
                  undefined,
                  true,
                  tzOffset
                )}
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
      <Card
        sx={{
          background: 'var(--base-white)',
          borderRadius: pxToVw('0.5rem'),
          padding: pxToVw('1.5rem'),
          display: 'flex',
          flexDirection: 'column',
          gap: pxToVw('1rem'),
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" fontWeight="600" color="#1C2534">
            {title}
          </Typography>
          <Typography variant="body1" color="#919BA7" fontWeight="500">
            {/* {t('view-order.detail.sub-title')} */}
            {t('page-watermarking.order-no', { orderNo })}
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 24rem)' : 'calc(100vw - 10rem)',
          }}
        >
          <StyledDataGrid
            rows={files}
            columns={columns}
            rowCount={total}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={isLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}
export default memo(OrderDetailView);
