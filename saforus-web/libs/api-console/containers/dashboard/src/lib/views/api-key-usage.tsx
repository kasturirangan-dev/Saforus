import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense } from 'react';
import { useSnapshot } from 'valtio';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import { UsageContainer, UsageTitle } from './styled-elements';
import { StyledDataGrid } from '@web-workspace/api-console/common/views';
import { TableContent, TableUsageContent } from './table-content';
import CustomNoRowsOverlay from '../views/norows-overlay';

interface KeyUsageSummaryItem {
  apiKey: string;
  apiKeyName: string;
  total: number;
  watermarking: number;
  detection: number;
  lastUsedAt: string;
}

const formatDateDifference = (dateString: string, t: any) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '--';
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffMins < 60) {
    return t('apiDashboard.usageStatistics.min-ago', { number: diffMins });
  } else if (diffHours < 24) {
    return t('apiDashboard.usageStatistics.hour-ago', { number: diffHours });
  } else if (diffDays < 30) {
    return t('apiDashboard.usageStatistics.day-ago', { number: diffDays });
  } else if (diffMonths < 12) {
    return t('apiDashboard.usageStatistics.month-ago', { number: diffMonths });
  } else {
    return t('apiDashboard.usageStatistics.year-ago', { number: diffYears });
  }
};

function ApiKeyUsage({ loading = false }: { loading?: boolean }) {
  const { t } = useTranslation();

  const { keyUsageSummary } = useSnapshot(ApiDashboardStore);

  const totalAPIUsage =
    Array.isArray(keyUsageSummary) &&
    keyUsageSummary?.reduce(
      (sum: number, item: KeyUsageSummaryItem) => sum + item.total,
      0
    );

  const apiUsageArray =
    (Array.isArray(keyUsageSummary) &&
      keyUsageSummary.map((item) => ({
        ...item,
        id: item.apiKey,
        totalProcessStatus: Object.values(item.processStatus).reduce(
          (sum, val) => sum + val,
          0
        ), // Calculate totalProcessStatus
      }))) ||
    [];

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
          <TableContent
            align="center"
            value={params.api.getAllRowIds().indexOf(params.id) + 1}
          ></TableContent>
        );
      },
    },
    {
      field: 'apiKeyName',
      headerName: `${t('apiDashboard.usageStatistics.table.keyName')}`,
      minWidth: 200,
      maxWidth: 280,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent canCopy={true} value={params.value} />;
      },
    },
    {
      field: 'total',
      headerName: `${t('apiDashboard.usageStatistics.table.total')}`,
      minWidth: 200,
      maxWidth: 240,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const totalUsage = totalAPIUsage || 1;
        const value = params.value;
        const percentage =
          value > 0 ? ` (${((value / totalUsage) * 100).toFixed(0)}%)` : '';
        return <TableUsageContent value={`${value}${percentage}`} />;
      },
    },
    {
      field: 'watermarking',
      headerName: `${t('apiDashboard.usageStatistics.table.processedFiles')}`,
      minWidth: 300,
      maxWidth: 340,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const { watermarking, detection } = params.row;
        return (
          <Box display="flex" gap="4px">
            <TableUsageContent
              title={
                t('apiDashboard.usageStatistics.table.watermarking') as string
              }
              value={watermarking}
            />
            <TableUsageContent
              title={
                t('apiDashboard.usageStatistics.table.detection') as string
              }
              value={detection}
            />
          </Box>
        );
      },
    },
    {
      field: 'inProgress',
      headerName: `${t('apiDashboard.usageStatistics.table.inProgress')}`,
      minWidth: 110,
      maxWidth: 180,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            align="center"
            value={params.row.processStatus?.inProgress || 0}
          />
        );
      },
    },
    {
      field: 'completed',
      headerName: `${t('apiDashboard.usageStatistics.table.completed')}`,
      minWidth: 100,
      maxWidth: 180,
      flex: 1,
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            align="center"
            value={params.row.processStatus?.completed || 0}
          />
        );
      },
    },
    {
      field: 'failed',
      headerName: `${t('apiDashboard.usageStatistics.table.failed')}`,
      minWidth: 120,
      maxWidth: 200,
      flex: 1,
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            align="center"
            value={params.row.processStatus?.failed || 0}
          />
        );
      },
    },
    {
      field: 'lastUsedAt',
      headerName: `${t('apiDashboard.usageStatistics.table.lastUsed')}`,
      minWidth: 150,
      maxWidth: 220,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent value={formatDateDifference(params.value, t)} />;
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
      <UsageContainer>
        <UsageTitle>
          {' '}
          {t('apiDashboard.usageStatistics.apiKeyUsage')}
        </UsageTitle>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <StyledDataGrid
              apiRef={apiRef}
              rows={apiUsageArray}
              columns={columns}
              rowCount={apiUsageArray.length || 0}
              loading={loading}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              noRowsHeight="232px"
              hideFooter={true}
            />
          </Box>
        </Box>
      </UsageContainer>
    </Suspense>
  );
}

export default memo(ApiKeyUsage);
