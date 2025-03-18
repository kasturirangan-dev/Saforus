import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import InvoicesIcon from '../assets/download.svg';
import { useSnapshot } from 'valtio';
import { BillingDetailStore } from '@web-workspace/saforus/components/user-info/billing-details/data';
import { capitalizeFirstLetter, currencyToSymbol } from './data';
import { fromUnixTime } from 'date-fns';
import {
  getMinuteOffset,
  getTimezone,
} from '@web-workspace/saforus/common/utils';

const timezone = getTimezone();
const tzOffset = getMinuteOffset();
const columns: GridColDef[] = [
  {
    field: 'dateIssued',
    headerName: 'date-issued',
    width: 300,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      // Format the date from timestamp to a readable format
      const formattedDate = params.value
        ? formatDateWithLanguage({
            date: fromUnixTime(params.value),
            isDetail: true,
            withSlash: true,
            tzOffset,
          })
        : '--';
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {`${formattedDate} ${timezone}`}
        </Box>
      );
    },
  },
  {
    field: 'invoiceNumber',
    headerName: 'invoice-number',
    width: 130,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
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
    field: 'servicePlan',
    headerName: 'service-plan',
    width: 130,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
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
    field: 'interval',
    headerName: 'billing-period',
    width: 130,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {capitalizeFirstLetter(params.value) ?? '--'}
        </Box>
      );
    },
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 130,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      // Assume currency symbol is directly prependable or use a function to format
      const formattedAmount = params.value
        ? `${currencyToSymbol(params.row.currency || '')}${params.value}`
        : '--';
      return (
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {formattedAmount}
        </Box>
      );
    },
  },
  {
    field: 'Action',
    headerName: 'invoices',
    width: 130,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      // Use `invoiceUrl` for the download link
      return (
        <a
          href={params.row.invoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={InvoicesIcon}
            alt="invoices"
            style={{ cursor: 'pointer' }}
          />
        </a>
      );
    },
  },
];

function BillingDetailTableView({ loading }: { loading: boolean }) {
  const { paymentHistories } = useSnapshot(BillingDetailStore);
  const clonedPaymentHistories = JSON.parse(JSON.stringify(paymentHistories));

  const { t } = useTranslation();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // console.log(
  //   'paymentHistories',
  //   paymentHistories,
  //   paymentHistories?.elementList
  // );

  return (
    <Table
      rows={clonedPaymentHistories?.elementList || []}
      columns={
        columns.map((el) => {
          return {
            ...el,
            headerName: t(`billDetail.bill-history.${el.headerName}`),
          };
        }) as GridColDef[]
      }
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      loading={loading}
    />
  );
}

export default BillingDetailTableView;
