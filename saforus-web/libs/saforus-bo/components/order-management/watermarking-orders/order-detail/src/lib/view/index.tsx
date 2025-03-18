import { Box, Card, SxProps, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Suspense, memo, useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import Table from '@web-workspace/shared/components/widgets/table';
import { useTranslation } from 'react-i18next';
import ViewOrderDetailStore from '../store';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import i18next from 'i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import ImageWithFallback from './image-with-fallback';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { getAttachment } from '@web-workspace/shared/helpers/files/download-file';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

const enum Status {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'IN_PROGRESS',
  INQUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
}

function ResultFileNameImage({ params }: any) {
  const row = { ...params.row };
  const filePageUrl = `${BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.children.WATERMARKING_DETAIL.children.WATERMARKING_DOWNLOAD_FILES.path}/${row?.personOrderInfoSq}?fileName=${row?.fileName}&&expirationDate=${row?.expirationDate}&&type=${row?.psnFileMediaCd}`;
  const [image, setImage] = useState('');

  const getImage = async () => {
    if (row?.psnFileMediaCd === 'IMG') {
      const imgSrcData = await getAttachment({
        // FIXME: Need check with BE for BO
        // teamId: getTeamId(),
        orderInfoFileName: row?.psnInfoFileNm,
        orderInfoId: row?.psnInfoId,
        getImageinBase64: true,
      });
      setImage(imgSrcData);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {row?.psnFileMediaCd === 'IMG' && (
          <ImageWithFallback
            src={image}
            alt={row.fileName}
            width={34}
            height={34}
            loading="lazy"
          />
        )}
        {row?.progress === Status.COMPLETED ? (
          <Link to={filePageUrl}>
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                color: 'var(--purple-400)',
                textDecorationLine: 'underline',
                width: 150,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginLeft: '0.5rem',
              }}
            >
              {row.fileName}
            </Typography>
          </Link>
        ) : (
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '20px',
              color: 'var(--gray-25)',
              width: 150,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: '0.5rem',
            }}
          >
            {row.fileName}
          </Typography>
        )}
      </Box>
      {row?.progress === '100%' && (
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#2D8A39',
            backgroundColor: '#F0FAF0',
            borderRadius: '5px',
            padding: '4px 12px',
          }}
        >
          Download
        </Typography>
      )}
    </Box>
  );
}

function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let color = 'var(--gray-700)';
  let valueLabel = value;
  let borderRadius = '0px';
  let px = '0';
  let py = '0';
  switch (field) {
    case 'psnFileMediaCd':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '5px';
      break;
    case 'format':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '5px';
      break;
    case 'progress':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';
      switch (value) {
        case Status.COMPLETED:
          color = 'var(--green-700)';
          valueLabel = t('page-watermarking.status.completed');
          break;
        case Status.INPROGRESS:
          color = 'var(--purple-600)';
          valueLabel = t('page-watermarking.status.in-progress');
          break;
        case Status.INQUEUE:
          color = 'var(--gray-700, #272D37)';
          valueLabel = t('page-watermarking.status.in-queue');
          break;
        case Status.FAILED:
          color = 'var(--red-500)';
          valueLabel = t('page-watermarking.status.failed');
          break;
        default:
          color = 'var(--red-500)';
          valueLabel = 'Unknown';
          break;
      }
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
      {valueLabel}
    </Typography>
  );
}

function OrderDetailView({ isLoading, files = [], total, onClearCache }: any) {
  const { t } = useTranslation();
  const { setRequestQuery, setFiles } = useSnapshot(ViewOrderDetailStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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
      minWidth: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultFileNameImage params={params} />;
      },
    },
    {
      field: 'progress',
      headerName: `${t('page-watermarking.table.status')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        switch (params.value) {
          case Status.COMPLETED:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--green-50)',
                }}
              />
            );
          case Status.INPROGRESS:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--purple-50)',
                }}
              />
            );

          case Status.INQUEUE:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--neutral-300, #F7F7F8)',
                }}
              />
            );
          case Status.FAILED:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--red-100, #FFF2F0)',
                }}
              />
            );
          default:
            break;
        }
      },
    },
    {
      field: 'watermarkCode',
      headerName: `${t('page-watermarking.table.watermark-code')}`,
      width: 200,
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
      field: 'psnFileMediaCd',
      headerName: `${t('page-watermarking.table.type')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        let label = params.value;
        if (params.value === MEDIA_TYPE.IMG) {
          label = 'IMAGE';
        } else {
          label = params.value as string;
        }
        return (
          <ResultContentLabel
            field={params.field}
            value={label}
            sx={{
              backgroundColor: 'var(--neutral-300)',
            }}
          />
        );
      },
    },
    {
      field: 'format',
      headerName: `${t('page-watermarking.table.format')}`,
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
      field: 'expirationDate',
      headerName: `${t('page-watermarking.table.expiration-date')}`,
      width: 200,
      sortable: false,
      align: 'center',
      disableColumnMenu: true,
      renderCell(params) {
        if (isNotEmpty(params?.value) || params?.value?.toString() === '0') {
          return '--';
        }
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {formatDateWithLanguage(params?.value, i18next.language)}
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
        <Typography
          sx={{
            fontWeight: '400',
            mb: '1rem',
            fontSize: '15px',
            lineHeight: '22px',
            color: '#919BA7',
          }}
        >
          {t('view-order.detail.sub-title')}
        </Typography>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
          }}
        >
          <Table
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
