import { Box, Card, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import {
  InquiryStatus,
  MyInquiriesStore,
} from '@web-workspace/saforus/components/help/data';
import CommonStore from '@web-workspace/saforus/common/data';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();

  let valueLabel = value;
  let color = 'var(--gray-700)';
  let textDecorationLine = 'none';
  let borderRadius = '0px';
  let px = '0';
  let py = '0';
  switch (field) {
    case 'title':
      color = 'var(--purple-400)';
      textDecorationLine = 'underline';
      break;
    case 'status':
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';
      switch (value) {
        case InquiryStatus.ANSWERED:
          color = 'var(--green-700)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          break;
        case InquiryStatus.IN_PROGRESS:
          color = 'var(--purple-600)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          break;
        case InquiryStatus.IN_QUEUE:
          color = 'var(--gray-700, #272D37)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          break;
        case InquiryStatus.CANCELED:
          color = 'var(--red-500)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          break;
        default:
          color = 'var(--red-500)';
          valueLabel = 'Unknown';
          break;
      }
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
        flex: 1,
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
      {valueLabel}
    </Typography>
  );
}

function InquiryListView() {
  const { t } = useTranslation();
  const {
    searchQuery,
    setSearchQuery,
    inquiries,
    total,
    totalPages,
    inquiriesLoading,
  } = useSnapshot(MyInquiriesStore);
  const { inquiryTypeList: categories } = useSnapshot(CommonStore);
  const { openLNB } = useSnapshot(LayoutStore);

  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo ? searchQuery.pageNo : 0,
    pageSize: 10,
  });

  const [inquiryList, setInquiryList] = useState(Array.from(inquiries));

  const onPageChange = async (selection: any) => {
    setSearchQuery({ pageNo: selection.page });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const inquiryArray = Array.from(inquiries);
      setInquiryList(inquiryArray);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [inquiries]);

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
      field: 'qaNo',
      headerName: `${t('help.my-inquiries.table.inquiry-no')}`,
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
      field: 'qaCategory',
      headerName: `${t('help.my-inquiries.category')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const category = categories?.find((e) => e.value === params.value);
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {category?.label ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'title',
      headerName: `${t('help.my-inquiries.table.title')}`,
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const inquiryNo = params.row.id;
        const detailPageUrl = `${ROUTES.HELP.HELP_CENTER.children.INQUIRY_DETAIL.path}/${inquiryNo}`;
        return (
          <Link
            to={detailPageUrl}
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <ResultContentLabel
              sx={{
                width: '100%',
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
      field: 'createdAt',
      headerName: `${t('help.my-inquiries.date')}`,
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
            {formatDateWithLanguage({
              date: params?.value,
              isDetail: true,
              withSlash: true,
            })}
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: `${t('page-watermarking.table.status')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        switch (params.value) {
          case InquiryStatus.ANSWERED:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--green-50)',
                }}
              />
            );
          case InquiryStatus.IN_PROGRESS:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--purple-50)',
                }}
              />
            );

          case InquiryStatus.IN_QUEUE:
            return (
              <ResultContentLabel
                field={params.field}
                value={params.value}
                sx={{
                  backgroundColor: 'var(--neutral-300, #F7F7F8)',
                }}
              />
            );
          case InquiryStatus.CANCELED:
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
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('view-order.list.title')}
        </Typography>
        <Typography
          variant="body1"
          color={'var(--gray-25)'}
          sx={{ mt: '0.5rem' }}
        >
          {t('help.my-inquiries.total', {
            total: totalPages,
            row: paginationModel.page + 1,
          })}
        </Typography>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table
              apiRef={apiRef}
              rows={inquiryList}
              columns={columns}
              rowCount={total || 0}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              loading={inquiriesLoading}
            />
          </Box>
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(InquiryListView);
