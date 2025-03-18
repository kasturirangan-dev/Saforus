import { Box, Card, Typography } from '@mui/material';
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  useGridApiRef,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Suspense, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { CardTitle } from '@web-workspace/api-console/common/views';
import Icon from '@web-workspace/shared/components/widgets/icon';
import {
  StyledDataGrid,
  TableContent,
} from '@web-workspace/api-console/common/views';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import InfoIcon from '../assets/info.svg';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';

const WmCodeTooltip = ({ content }: { content: string | undefined | null }) => (
  <Tooltip
    title={null}
    titleHeader={content ?? ''}
    titleHeaderStyle={{ textAlign: 'center' }}
    placement="top"
  >
    <img src={InfoIcon} alt="info" loading="lazy" />
  </Tooltip>
);

function DownloadFileView({
  isLoading,
  files,
  total,
  reqDate,
  onDownloadFiles,
  enableAction,
}: any) {
  const { t } = useTranslation();
  const { tzDisplayOffset: tzOffset, timeZone } = useSnapshot(CsApiAuthStore);

  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

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
      field: 'wtrDescription',
      flex: 1,
      sortable: false,
      sortComparator: (v1, v2) => parseInt(v1) - parseInt(v2),
      disableColumnMenu: true,
      renderHeader(params) {
        return (
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Typography fontWeight={600} color="var(--gray-700)">
              {t('apiWatermarking.order-detail.watermark.description')}
            </Typography>
            <WmCodeTooltip
              content={t(
                'apiWatermarking.order-detail.watermark.description-tooltip'
              )}
            />
          </Box>
        );
      },
      renderCell(params) {
        return <TableContent>{params.value ?? '--'}</TableContent>;
      },
    },
    {
      field: 'createdAt',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderHeader(params) {
        return (
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Typography fontWeight={600} color="var(--gray-700)">
              {t('apiWatermarking.order-detail.watermark.created-date')}
            </Typography>
            <WmCodeTooltip
              content={t(
                'apiWatermarking.order-detail.watermark.created-date-tooltip'
              )}
            />
          </Box>
        );
      },
      renderCell(params) {
        const formattedDate = formatDateWithLanguage({
          date: reqDate,
          isDetail: true,
          withSlash: true,
          tzOffset,
        });

        return (
          <TableContent>
            {formattedDate.split(' ')[0]}
            <br />
            {formattedDate.split(' ')[1]} {formattedDate.split(' ')[2]}
            {` (GMT${timeZone})`}
          </TableContent>
        );
      },
    },
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 60,
    },
  ];

  const DownLoadButton = () => {
    const selectedCount = selectedIds.length;
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
      >
        <Button
          disabled={selectedCount === 0}
          onClick={() => onDownloadFiles(selectedIds)}
          sx={{ width: '160px', padding: '8px 12px', gap: '6px' }}
        >
          <Icon
            name="download"
            size={16}
            fillColor="var(--base-white)"
            color="none"
          />
          {t('watermarked-order-detail.download-files')}
          {` ${selectedCount}/${total}`}
        </Button>
      </Box>
    );
  };

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            backgroundColor: 'var(--base-white)',
            borderRadius: '8px',
            border: '1px solid var(--neutral-600)',
          }}
        >
          <CardTitle>
            {t('apiWatermarking.order-detail.watermarked-files')}
            <span
              style={{
                margin: '4px',
                display: 'inline-flex',
                width: '18px',
                height: '18px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '0.75px solid var(--gray-100)',
                borderRadius: '50%',

                fontFamily: 'Inter',
                fontSize: '10px',
                fontWeight: 500,
                lineHeight: '18px',
                color: 'var(--gray-100)',
              }}
            >
              {total}
            </span>
          </CardTitle>

          <Box
            sx={{
              padding: '0px 16px 16px 16px',
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <Box
                sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}
              >
                <StyledDataGrid
                  apiRef={apiRef}
                  keepNonExistentRowsSelected={true}
                  rows={files}
                  columns={columns}
                  checkboxSelection={true}
                  isRowSelectable={(params) => {
                    return enableAction;
                  }}
                  disableRowSelectionOnClick={false}
                  onRowSelectionModelChange={setSelectedIds}
                  rowHover={true}
                  rowCount={total}
                  paginationModel={paginationModel}
                  paginationMode="server"
                  onPaginationModelChange={setPaginationModel}
                  // loading={isLoading}
                  outerFooter={false}
                  getRowHeight={() => 'auto'}
                  slots={{
                    footer: () => (
                      <Box padding="8px">
                        <DownLoadButton />
                      </Box>
                    ),
                  }}
                  sx={{
                    '& .MuiDataGrid-columnHeader': {
                      padding: '8px 16px',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 500,
                    },
                    '& .MuiDataGrid-columnHeaderCheckbox': {
                      padding: '0px',
                    },
                    '& .MuiDataGrid-cell': {
                      borderLeft: '1px solid var(--neutral-600)',
                      '&:first-child': {
                        borderLeft: 'none',
                      },
                      padding: '8px 16px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Card>
        {/* For InProgress Status */}
      </Box>
    </Suspense>
  );
}

export default memo(DownloadFileView);
