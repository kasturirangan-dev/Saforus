import { Box, Typography, ButtonBase, Card } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import React, { Suspense, memo, useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import DownloadFileStore from '../data/store';
import WarningIcon from '../assets/warning.svg';
import ShareIcon from '../assets/share.svg';
import DownloadIcon from '../assets/download.svg';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { filter, includes, uniq } from 'lodash-es';
import { FileInfo } from '../data/interface';
import { StyledAlert, StyledDataGrid, TableContent } from './styled-elements';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { CardTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import Icon from '@web-workspace/shared/components/widgets/icon';

function DownloadFileView({
  isLoading,
  enableAction,
  files = [],
  total,
  selectedFiles = [],
  onDownloadFiles,
  onShared,
}: any) {
  const { t } = useTranslation();
  const { setRequestQuery, setSelectedFiles } = useSnapshot(DownloadFileStore);
  const [showAlert, setShowAlert] = React.useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fromRow = paginationModel.page * paginationModel.pageSize;
    setRequestQuery({ fromRow });
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: 'psnResultFileMsg',
      headerName: `${t(
        'watermarked-order-detail.file-information.watermark-code'
      )}`,
      headerClassName: 'psnResultFileMsg',
      cellClassName: 'psnResultFileMsg',
      align: 'center',
      headerAlign: 'center',
      width: 200,
      sortable: false,
      sortComparator: (v1, v2) => parseInt(v1) - parseInt(v2),
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            sx={{
              color: 'var(--purple-600)',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {params.value ?? '--'}
          </TableContent>
        );
      },
    },
    {
      field: 'psnDescription',
      headerName: `${t(
        'watermarked-order-detail.file-information.description'
      )}`,
      headerClassName: 'psnDescription',
      cellClassName: 'psnDescription',
      minWidth: 300,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent> {params.value ?? '--'}</TableContent>;
      },
    },
    {
      field: 'share-link',
      headerName: `${t('watermarked-order-detail.share')}`,
      headerClassName: 'share-link',
      cellClassName: 'share-link',
      width: 115,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      hideable: true,
      renderCell(params) {
        return (
          <ButtonBase
            onClick={() => {
              dialogStore.openDialog({
                name: DialogType.ShareDialog,
                props: {
                  fileName: params.row.fileName,
                  onSend: async (sharedEmails: string[]) => {
                    await onShared(params.row.fileId, sharedEmails);
                  },
                },
              });
            }}
          >
            <img src={ShareIcon} alt="share" loading="lazy" />
          </ButtonBase>
        );
      },
    },
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 60,
    },
  ];

  const DownLoadButton = () => {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
      >
        <Button
          disabled={selectedFiles.length === 0}
          onClick={onDownloadFiles}
          sx={{ minWidth: '120px', padding: '8px 12px', gap: '6px' }}
        >
          <Icon
            name="download"
            size={16}
            fillColor="var(--base-white)"
            color="none"
          />
          {t('watermarked-order-detail.download-files')}
          {` ${selectedFiles.length}/${total}`}
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
            border: enableAction ? '1px solid var(--neutral-600)' : 'none',
          }}
        >
          <CardTitle sx={{ display: enableAction ? 'flex' : 'none' }}>
            {t('watermarked-order-detail.file-information.title')}
            <p
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
            </p>
          </CardTitle>

          <Box
            sx={{
              padding: enableAction ? '0px 16px 16px 16px' : 'none',
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <Box
                sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}
              >
                <StyledDataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'psnResultFileMsg', sort: 'asc' }],
                    },
                  }}
                  keepNonExistentRowsSelected={true}
                  rows={files}
                  columns={columns}
                  checkboxSelection={enableAction}
                  rowSelectionModel={selectedFiles.map(
                    (file: FileInfo) => file.id
                  )}
                  onRowSelectionModelChange={(idsSelected) => {
                    if (uniq(idsSelected).length > 10) {
                      setShowAlert(true);
                    } else {
                      const filteredList = filter(files, (item) => {
                        return includes(idsSelected, item.id); //&& item.downloadCount < 3
                      });

                      setSelectedFiles(
                        filteredList.map((el) => {
                          return {
                            fileUrlDownload: el.psnResultUrl,
                            fileName: el.fileName,
                            id: el.id,
                            fileId: el.fileId,
                            downloadCount: el.downloadCount,
                            sharedEmail: el.sharedEmail,
                          };
                        }),
                        idsSelected as string[]
                      );
                      setShowAlert(false);
                    }
                  }}
                  isRowSelectable={(params) => {
                    return enableAction;
                  }}
                  // getRowClassName={(params) =>
                  //   params.row.sharedEmail ||
                  //   params.row.downloadCount >= 3 ||
                  //   isPast(parseISO(params.row.expirationDate))
                  //     ? 'row-disabled'
                  //     : ''
                  // }
                  rowSelection={true}
                  rowCount={total}
                  paginationModel={paginationModel}
                  paginationMode="server"
                  onPaginationModelChange={setPaginationModel}
                  loading={isLoading}
                  columnVisibilityModel={{
                    // Hide columns when disable action
                    'share-link': enableAction,
                  }}
                  hideFooter={!enableAction}
                  slots={{
                    footer: () => (
                      <Box padding="8px">
                        <DownLoadButton />
                      </Box>
                    ),
                  }}
                />
              </Box>
            </Box>
            {showAlert && (
              <StyledAlert
                sx={{ marginTop: '1.5rem' }}
                severity="error"
                icon={
                  <img
                    src={WarningIcon}
                    alt="Warning"
                    title="Warning"
                    loading="lazy"
                  />
                }
              >
                {t('download-files.message.file-length')}
              </StyledAlert>
            )}
          </Box>
        </Card>
        {/* For InProgress Status */}
        {!enableAction && (
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                backgroundColor: 'var(--neutral-300)',
                padding: '2px 8px',
                borderRadius: '5px',
                border: '1px solid var(--neutral-700)',
                fontWeight: 600,
                color: 'var(--gray-700)',
              }}
            >
              {files.length}/10
            </Typography>
            <Typography color={'var(--gray-50)'}>
              {t('create-watermarking.file-information.watermark-code-limit')}
            </Typography>
          </Box>
        )}
      </Box>
    </Suspense>
  );
}

export default memo(DownloadFileView);
