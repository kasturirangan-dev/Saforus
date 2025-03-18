import { useTranslation } from 'react-i18next';
import { usePiracyDetectionListData } from './data';
import { PiracyDetectionRequestsStore } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { useSnapshot } from 'valtio';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { useEffect, useState } from 'react';
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { Box, InputLabel, Typography } from '@mui/material';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import { MEDIA_TYPE, Status } from '@web-workspace/saforus-bo/common/model';
import { Link } from 'react-router-dom';
import Table from '@web-workspace/shared/components/widgets/table';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

interface PiracyDetectionRequestsProps {
  isRequestsLoading: boolean;
}

function PiracyDetectionRequestsList({
  isRequestsLoading,
}: PiracyDetectionRequestsProps) {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  const { searchQuery, requests, total, totalPages } = useSnapshot(
    PiracyDetectionRequestsStore
  );
  const { userInfo } = useSnapshot(BoAuthStore);

  const { onPageChange } = usePiracyDetectionListData();

  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo || 0,
    pageSize: 10,
  });

  const requestArray = Array.from(requests);

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
      field: 'orderNo',
      headerName: `${t('orderManagement.table.order-no')}`,
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const id = params?.row?.id;
        const detailPageUrl = `${BO_ROUTES.ORDER_MANAGEMENT.PIRACY_DETECTION_REQUESTS.children.PIRACY_ORDER_DETAIL.path}/${id}`;
        return (
          <Box>
            <Link to={detailPageUrl}>
              <Typography
                sx={{
                  cursor: 'pointer',
                  color: 'var(--purple-400)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {params.value}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: 'title',
      headerName: `${t('orderManagement.table.title')}`,
      width: 200,
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
            {params.value || 'Title'}
          </Box>
        );
      },
    },
    {
      field: 'fileName',
      headerName: `${t('orderManagement.table.file-name')}`,
      width: 200,
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
            {params.value || '--'}
          </Box>
        );
      },
    },
    {
      field: 'orderStatus',
      headerName: `${t('orderManagement.table.status')}`,
      align: 'center',
      headerAlign: 'center',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        switch (params.value) {
          case Status.COMPLETED:
            return (
              <InputLabel
                color="primary"
                sx={{
                  borderRadius: '5px',
                  bgcolor: 'var(--green-50)',
                  color: 'var(--green-700)',
                  padding: '4px 12px 4px 12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('orderManagement.table.completed')}
              </InputLabel>
            );
          case Status.IN_PROGRESS:
            return (
              <InputLabel
                color="primary"
                sx={{
                  borderRadius: '5px',
                  bgcolor: 'var(--purple-50)',
                  color: 'var(--purple-600)',
                  padding: '4px 12px 4px 12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('orderManagement.table.in-progress')}
              </InputLabel>
            );

          case Status.IN_QUEUE:
            return (
              <InputLabel
                color="primary"
                sx={{
                  borderRadius: '5px',
                  bgcolor: 'var(--neutral-300)',
                  color: 'var(--gray-700)',
                  padding: '4px 12px 4px 12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('orderManagement.table.in-queue')}
              </InputLabel>
            );

          case Status.FAILED:
            return (
              <InputLabel
                color="primary"
                sx={{
                  borderRadius: '5px',
                  bgcolor: 'var(--red-100)',
                  color: 'var(--red-600)',
                  padding: '4px 12px 4px 12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('orderManagement.table.failed')}
              </InputLabel>
            );
          default:
            break;
        }
      },
    },
    {
      field: 'contentType',
      headerName: `${t('orderManagement.table.content-type')}`,
      align: 'center',
      headerAlign: 'center',
      width: 150,
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
          <InputLabel
            color="primary"
            sx={{
              borderRadius: '5px',
              bgcolor: 'var(--neutral-300)',
              color: 'var(--gray-700)',
              padding: '4px 12px 4px 12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              lineHeight: '1.25rem',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </InputLabel>
        );
      },
    },
    {
      field: 'userFullName',
      headerName: `${t('orderManagement.table.requestor')}`,
      width: 250,
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
            {params.value || '--'}
          </Box>
        );
      },
    },
    {
      field: 'requestDate',
      headerName: `${t('orderManagement.table.request-date')}`,
      width: 200,
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
            {formatDateWithLanguage(
              params?.value,
              i18next.language,
              true,
              undefined
              // userInfo?.timeZoneName
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--base-white)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        gap: '1.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('orderManagement.result')}
        </Typography>
        <Typography
          variant="body1"
          color={'var(--gray-25)'}
          sx={{ mt: '0.5rem' }}
        >
          {t('orderManagement.a-out-of-b', {
            a: searchQuery.pageNo || 0 + 1,
            b: totalPages,
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
        }}
      >
        <Table
          apiRef={apiRef}
          rows={requestArray}
          rowCount={total}
          columns={columns}
          pageSizeOptions={[10]}
          loading={isRequestsLoading}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
    </Box>
  );
}

export default PiracyDetectionRequestsList;
