import * as React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Alert, Box, Typography, Card, styled } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel';
import Table from '@web-workspace/shared/components/widgets/table';
import { useTranslation } from 'react-i18next';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import {
  FieldWithSupport,
  FileType,
  MEDIA_TYPE,
} from '@web-workspace/saforus/common/model';
import CustomNoRowsOverlay from './file-list-empty';
import { formatBytes } from '@web-workspace/saforus/common/utils';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useSnapshot } from 'valtio';
import WarningIcon from './assets/warning.svg';
import TickIcon from './assets/tick.svg';

type Props = {
  files: FileType[];
  selectedFiles: FileType[];
  setSelectedFiles: (selectedFiles: FileType[]) => void;
  supportedFiles: string[];
  setAlertFileName: (show: boolean) => void;
  setAlertFileNameLength: (show: boolean) => void;
  noRowsOverlay?: (a: boolean) => JSX.Element;
  paginationContent?: () => JSX.Element;
  additionalColumns?: GridColDef[];
  uploadLimit: number;
};

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

const FileList: React.FC<Props> = ({
  files,
  selectedFiles,
  setSelectedFiles,
  supportedFiles,
  setAlertFileName,
  setAlertFileNameLength,
  noRowsOverlay,
  paginationContent,
  additionalColumns = [],
  uploadLimit = Infinity,
}) => {
  const { openLNB } = useSnapshot(LayoutStore);
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    {
      field: 'psnInfoFileNm',
      headerName: `${t('page-watermarking.table.file-name')}`,
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const fileExtension = params.value.split('.').pop();
        const supported = supportedFiles.includes(fileExtension.toUpperCase());

        return (
          <Typography
            variant="body1"
            color={supported ? 'var(--gray-700)' : 'var(--gray-25)'}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              backgroundColor: supported ? 'transparent' : 'var(--neutral-300)',
            }}
          >
            {params.value ?? '--'}
          </Typography>
        );
      },
    },
    {
      field: 'contentType',
      headerName: `${t('page-watermarking.table.content-type')}`,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value as FieldWithSupport;
        let label = value.field as string;
        if (value.field === MEDIA_TYPE.IMG) {
          label = t('common.content-type.image');
        } else if (value.field === MEDIA_TYPE.AUDIO) {
          label = t('common.content-type.audio');
        } else if (value.field === MEDIA_TYPE.VIDEO) {
          label = t('common.content-type.video');
        } else {
          label = value.field as string;
        }
        return (
          <ContentLabel neutral label={label} supported={value.supported} />
        );
      },
    },
    {
      field: 'format',
      headerName: `${t('page-watermarking.table.file-format')}`,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value as string;
        const supported = supportedFiles.includes(value.toUpperCase());

        return (
          <ContentLabel neutral label={params.value} supported={supported} />
        );
      },
    },
    {
      field: 'size',
      headerName: `${t('page-watermarking.table.file-size')}`,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      sortComparator: (v1, v2) => parseInt(v1.field) - parseInt(v2.field),
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value as FieldWithSupport;
        const size = formatBytes(value.field as number);
        return (
          <Typography
            variant="body1"
            color={value.supported ? 'var(--gray-700)' : 'var(--gray-25)'}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {size}
          </Typography>
        );
      },
    },
    {
      field: 'supported',
      headerName: `${t('page-watermarking.table.supported')}`,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return params.value ? (
          <Box>
            <img src={TickIcon} alt="Supported" />
          </Box>
        ) : (
          <Box sx={{ opacity: 0.5 }}>
            <img src={WarningIcon} alt="Not supported" />
          </Box>
        );
      },
    },
    ...additionalColumns,
  ];

  const handleSelection = (selection: GridRowSelectionModel) => {
    const selectedRows = files.filter((file) =>
      selection.includes(file.psnInfoId)
    );

    const filteredFiles = selectedRows.filter((file) => {
      const fileName = file.psnInfoFileNm.split('.').slice(0, -1).join('.');
      const maxFileNameLength = 200;

      return (
        PATTERN.REQUEST_FILE_NAME.test(fileName) &&
        fileName.length <= maxFileNameLength
      );
    });

    setSelectedFiles(filteredFiles);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        background: 'var(--base-white)',
        border: 'none',
      }}
    >
      {files.length > 0 && (
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 24rem)' : 'calc(100vw - 10rem)',
          }}
        >
          <Table
            rows={files}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelection}
            rowSelectionModel={selectedFiles.map((file) => file.psnInfoId)}
            isRowSelectable={(params) => params.row.supported}
            getRowClassName={(params) =>
              params.row.supported ? '' : 'row-disabled'
            }
            paginationContent={paginationContent}
            hideFooter={!files.length}
            sx={{
              '.MuiDataGrid-iconButtonContainer': {
                visibility: 'visible',
              },
              '.MuiDataGrid-sortIcon': {
                opacity: 'inherit !important',
              },
            }}
          />
        </Box>
      )}
      {files.length < uploadLimit &&
        noRowsOverlay &&
        noRowsOverlay(!!files.length)}
    </Card>
  );
};

export default React.memo(FileList);
