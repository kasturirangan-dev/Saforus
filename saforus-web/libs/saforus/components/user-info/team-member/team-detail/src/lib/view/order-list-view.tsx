import { Box, Card, InputLabel, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { Link } from 'react-router-dom';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import { useSnapshot } from 'valtio';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { StatusName } from '../data/order-list';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

function CustomInputLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let textColor = 'var(--gray-700)';
  let bgColor = 'var(--neutral-300)';
  let valueLabel = value;
  switch (field) {
    case 'orderStatus':
      switch (value) {
        case StatusName.COMPLETED:
          textColor = 'var(--green-700)';
          bgColor = 'var(--green-50)';
          valueLabel = t('page-watermarking.status.completed');
          break;
        case StatusName.INPROGRESS:
          textColor = 'var(--purple-600)';
          bgColor = 'var(--purple-50)';
          valueLabel = t('page-watermarking.status.in-progress');
          break;
        case StatusName.IN_QUEUE:
          textColor = 'var(--gray-700)';
          bgColor = 'var(--neutral-300)';
          valueLabel = t('page-watermarking.status.in-queue');
          break;
        case StatusName.FAILED:
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
        borderRadius: '5px',
        bgcolor: bgColor,
        color: textColor,
        padding: '4px 12px 4px 12px',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {valueLabel}
    </InputLabel>
  );
}

function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  const valueStr = value;
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
    case 'type':
    case 'format':
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
        ...sx,
        px,
        py,
      }}
    >
      {valueStr}
    </Typography>
  );
}

function TeamOrderListView({
  onPageChange,
  orders = [],
  total,
  ordersLoading,
}: any) {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { searchOrderQuery } = useSnapshot(UserTeamStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const [paginationModel, setPaginationModel] = useState({
    page: searchOrderQuery.pageNo ? searchOrderQuery.pageNo : 0,
    pageSize: 10,
  });
  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: 'orderNo',
      headerName: `${t('page-watermarking.table.order-no')}`,
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const orderId = params.value;
        const detailPageUrl = `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children.WATERMARKING_HISTORY_DETAIL.path}/${orderId}`;
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
    // hide service type and summary columns, waiting for BE plan
    /*
    {
      field: 'serviceType',
      headerName: `${t('page-watermarking.table.service-type')}`,
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
            {params?.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'summary',
      headerName: `${t('page-watermarking.table.summary')}`,
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
            {params?.value ?? '--'}
          </Box>
        );
      },
    },
    */
    {
      field: 'orderStatus',
      headerName: `${t('page-watermarking.table.status')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'contentType',
      headerName: `${t('page-watermarking.table.content-type')}`,
      width: 180,
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
        return <CustomInputLabel field={params.field} value={label} />;
      },
    },
    {
      field: 'formatStr',
      headerName: `${t('page-watermarking.table.format')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'userFullName',
      headerName: `${t('page-watermarking.table.requester')}`,
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
            {params?.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'requestDate',
      headerName: `${t('page-watermarking.table.requested')}`,
      width: 300,
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
            {formatDateWithLanguage({
              date: params?.value,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })}
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
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('team-detail.team-history-order', {
            total: total || 0,
          })}
        </Typography>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            rows={orders}
            columns={columns}
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            slots={{
              noRowsOverlay: () => {
                return <Box>{t('team-member.table.no-rows')}</Box>;
              },
            }}
            loading={ordersLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(TeamOrderListView);
