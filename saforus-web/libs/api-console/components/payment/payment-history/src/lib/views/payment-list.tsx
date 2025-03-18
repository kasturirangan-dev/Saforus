import { Box, CircularProgress, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense } from 'react';
import {
  StyledDataGrid,
  TableContent,
} from '@web-workspace/api-console/common/views';
import styled from '@emotion/styled';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import CustomNoRowsOverlay from './norows-overlay';
import { PaymentDetail, ViewPaymentQuery } from '../data/interface';
import CardLogo from '@web-workspace/api-console/components/payment/card-logo';
import PaymentStatus from './payment-status';

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  backgroundColor: 'var(--neutral-200)',
  borderRadius: '4px',
  '& svg': {
    fill: 'var(--gray-25)',
  },
}));

interface PaymentHistoryProps {
  paymentList: PaymentDetail[];
  total: number;
  paginationModel: ViewPaymentQuery;
  setPaginationModel: (value: ViewPaymentQuery) => void;
  downLoadInvoice: (order: PaymentDetail) => void;
  loading: boolean;
}

function PaymentHistory({
  paymentList,
  total,
  paginationModel,
  setPaginationModel,
  downLoadInvoice,
  loading,
}: PaymentHistoryProps) {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const apiRef = useGridApiRef();
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
      field: 'requestedAt',
      headerName: `${t('apiPaymentManagement.table.date')}`,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? formatDateWithLanguage({
              date: params.value,
              withSlash: true,
              tzOffset,
            })
          : '--';

        return <TableContent>{formattedDate}</TableContent>;
      },
    },
    {
      field: 'paymentMethod',
      headerName: `${t('apiPaymentManagement.table.paymentMethod')}`,
      minWidth: 250,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const cardNumber = params.value?.cardNumber;
        return (
          <Box display="flex" alignItems="center" gap="12px">
            <CardLogo cardNumber={cardNumber} height="32px" />
            <TableContent>{cardNumber}</TableContent>
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: `${t('apiPaymentManagement.table.status')}`,
      width: 140,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <PaymentStatus value={params.value} />;
      },
    },
    {
      field: 'plan',
      headerName: `${t('apiPaymentManagement.table.plan')}`,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const planType = params?.value?.planType || '';
        return (
          <TableContent>
            {planType ? t(`apiServicePlan.${planType}`) : '--'}
          </TableContent>
        );
      },
    },
    {
      field: 'billingCycle',
      headerName: `${t('apiPaymentManagement.table.billingCycle')}`,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const cycle = params?.row?.plan?.billingType || '';
        return (
          <TableContent>
            {cycle ? t(`apiPaymentManagement.${cycle}`) : '--'}
          </TableContent>
        );
      },
    },
    {
      field: 'amount',
      headerName: `${t('apiPaymentManagement.table.amount')}`,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const amount = parseInt(params?.row?.totalAmount).toLocaleString();
        const currency = params?.row?.currency || '';

        return (
          <TableContent>
            {`${amount} ${t(`apiServicePlan.${currency}`)}`}
          </TableContent>
        );
      },
    },
    {
      field: 'invoice',
      headerName: `${t('apiPaymentManagement.table.invoice')}`,
      width: 90,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderCell(params) {
        const hasReceipt = params.row.receipt?.url;
        return (
          hasReceipt && (
            <ActionButton
              onClick={() => downLoadInvoice(params.row as PaymentDetail)}
              sx={{
                '&:hover': {
                  backgroundColor: 'var(--purple-50)',
                  '& svg': {
                    fill: 'var(--purple-500)',
                  },
                },
              }}
            >
              <Icon name="download" size={16} />
            </ActionButton>
          )
        );
      },
    },
  ];

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <StyledDataGrid
            apiRef={apiRef}
            rows={paymentList}
            columns={columns}
            rowCount={total}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            noRowsHeight="212px"
            hideFooter={total === 0}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(PaymentHistory);
