import * as React from 'react';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { Alert, Box, Typography, styled } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel';
import Table from '@web-workspace/shared/components/widgets/table';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { DrmFile } from '@web-workspace/saforus/common/model';
import { useTranslation } from 'react-i18next';

const StyledAlert = styled(Alert)`
  background: #fef6f6;
  border: 1.5px solid #feb8ae;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

type DrmTableProps = {
  files: DrmFile[];
  selectedFiles: DrmFile[];
  setSelectedFiles: (selectedFiles: DrmFile[]) => void;
  selectable: boolean;
};

const DrmTableFile: React.FC<DrmTableProps> = ({
  files,
  selectedFiles,
  setSelectedFiles,
  selectable,
}) => {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    {
      field: 'siteName',
      headerName: `${t('multiDrm.table.site-name')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'fileName',
      headerName: `${t('multiDrm.table.file-name')}`,
      width: 300,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'resolution',
      headerName: `${t('multiDrm.table.resolution')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'bitRate',
      headerName: `${t('multiDrm.table.bitrate')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'videoCodec',
      headerName: `${t('multiDrm.table.video-codec')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'audioCodec',
      headerName: `${t('multiDrm.table.audio-codec')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--gray-300)',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'streamFormats',
      headerName: `${t('multiDrm.table.stream-formats')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const streamFormats = params.value as string[];
        return (
          <Box sx={{ display: 'flex' }}>
            {streamFormats.map((format) => (
              <ContentLabel key={format} label={format} />
            ))}
          </Box>
        );
      },
    },
    {
      field: 'watermark',
      headerName: `${t('multiDrm.table.watermark')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const isWatermark = params.value as boolean;
        return <ContentLabel label={isWatermark ? 'FORENSIC' : 'NONE'} />;
      },
    },
    {
      field: 'drmType',
      headerName: `${t('multiDrm.table.drm-type')}`,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const type = params.value as string;
        const value =
          type === 'PLAY_READY'
            ? 'PLAYREADY'
            : type === 'WIDE_VINE'
            ? 'WIDEVINE'
            : 'FAIRPLAY';
        return <ContentLabel label={value} />;
      },
    },
  ];

  const handleSelection = (selection: GridRowSelectionModel) => {
    const selectedRows = files.filter((file) => selection.includes(file.id));
    setSelectedFiles(selectedRows);
  };

  const tableSelectable = selectable
    ? {
        checkboxSelection: true,
        onRowSelectionModelChange: handleSelection,
        rowSelectionModel: selectedFiles.map((file) => file.id),
        isRowSelectable: (params: GridRowParams<any>) => params.row.supported,
      }
    : {};

  return <Table rows={files} columns={columns} {...tableSelectable} />;
};

export default React.memo(DrmTableFile);
