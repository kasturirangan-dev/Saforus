import {
  Button,
  Alert,
  Box,
  Card,
  styled,
  SxProps,
  Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { Suspense, memo, useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import DownloadFileStore from '../store';
import { FileInfo } from '../interface';
import WarningIcon from '../assets/warning.svg';
import DownloadIcon from '../assets/download.svg';
import { Controller } from 'react-hook-form';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Table from '@web-workspace/shared/components/widgets/table';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

import { filter, includes, uniq } from 'lodash-es';
import {
  HandleDownloadFile,
  HandleDownloadZip,
} from '@web-workspace/shared/helpers/files/download-file';
import { ImageWithFallback } from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/order-detail';
import { useWatermarkingExpirationData } from '../data/watermarking-update';
import { format } from 'date-fns';

const Label = styled('label')({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
});

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  row: FileInfo;
}

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

function ResultContentLabel({ field, row, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let dom = <Box>''</Box>;
  switch (field) {
    case 'file_size':
      dom = (
        <Typography
          sx={{
            ...sx,
          }}
        >
          {row?.psnResultSize} {row?.fileSizeUnit}
        </Typography>
      );
      break;
    case 'imageLink':
      dom = (
        <Button
          variant="text"
          sx={{
            color: 'var(--purple-500, #5D55F6)',
            fontFamily: 'Noto Sans KR',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            textTransform: 'none',
            padding: '0',
            textDecoration: 'underline',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onClick={() => {
            HandleDownloadFile(row.fileId, row.fileName, BoAuthStore.token, t);
          }}
        >
          Download
        </Button>
      );
      break;
    default:
      break;
  }
  return dom;
}

function DownloadFileView({
  isLoading,
  files = [],
  total,
  previewImageUrl,
  selectedFiles = [],
}: any) {
  const { handleSubmit, onSubmit, control } = useWatermarkingExpirationData();

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const { setRequestQuery, setSelectedFiles, onReset, expiredDate } =
    useSnapshot(DownloadFileStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const [showAlert, setShowAlert] = React.useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const location = useLocation();
  const parts = location.pathname.split('/');
  const personOrderInfoSq = parts[parts.length - 1];
  useEffect(() => {
    const fromRow = paginationModel.page * paginationModel.pageSize;
    setRequestQuery({ personOrderInfoSq, fromRow });
  }, [paginationModel]);
  const handleDownloadClick = () => {
    if (selectedFiles.length > 0) {
      HandleDownloadZip(
        selectedFiles,
        paramsAsObject.fileName,
        BoAuthStore.token,
        t
      );
    }
  };

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'imageLink',
      headerName: `${t('page-watermarking.table.file-link')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
    {
      field: 'psnResultFileMsg',
      headerName: `${t('page-watermarking.table.watermark-code')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
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
            {params.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'fileName',
      headerName: `${t('page-watermarking.table.file-name')}`,
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
            {params.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'downloadCount',
      headerName: 'Download Count',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'file_size',
      headerName: `${t('page-watermarking.table.file-size')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
  ];

  const [orderExpiredDate, setOrderExpiredDate] = useState<string | Date>(
    paramsAsObject.expirationDate
  );

  useEffect(() => {
    if (expiredDate) {
      setOrderExpiredDate(format(expiredDate as Date, "yyyy-MM-dd HH:mm:ss"));
    }
  }, [expiredDate]);

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: '600',
                mb: '1rem',
                fontSize: '28px',
                lineHeight: '38px',
              }}
            >
              {t('download-files.expires-on', {
                expiresOn: orderExpiredDate,
              })}
            </Typography>
            <Typography
              sx={{
                fontWeight: '400',
                mb: '1rem',
                fontSize: '15px',
                lineHeight: '22px',
                color: '#919BA7',
              }}
            >
              {t('download-files.note')}
            </Typography>
          </Box>
          <Box sx={{ flexDirection: 'row', display: 'flex' }}>
            <Box>
              <Label>
                {t('orderManagement.watermarking-orders.change-expired-date')}
              </Label>
              <Controller
                name="expiredDate"
                control={control}
                defaultValue={expiredDate}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date as any)) {
                        field.onChange(date);
                      } else {
                        field.onChange(null);
                      }
                    }}
                    minDate={new Date()}
                    value={field.value || null}
                    sx={{
                      width: '10rem',
                    }}
                  />
                )}
              />
              <LoadingButton
                loading={false}
                type="button"
                sx={{
                  py: '0.5rem',
                  ml: '0.5rem',
                }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('button.update')}
              </LoadingButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: '1rem' }}>
          {paramsAsObject.type === 'IMG' && (
            <ImageWithFallback
              src={previewImageUrl}
              alt={paramsAsObject.fileName}
              width={160}
              height={160}
              loading="lazy"
              disableRightClick={true}
            />
          )}
          <LoadingButton
            disabled={selectedFiles.length === 0}
            loading={false}
            type="submit"
            sx={{
              mt: '1rem',
              py: '0.5rem',
            }}
            onClick={handleDownloadClick}
          >
            <img
              src={DownloadIcon}
              alt="download"
              title="download"
              width={18}
              height={18}
              style={{ marginRight: '0.5rem' }}
              loading="lazy"
            />
            {t('download-files.downloadAll')}
          </LoadingButton>
        </Box>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
          }}
        >
          <Table
            keepNonExistentRowsSelected={true}
            rows={files}
            columns={columns}
            checkboxSelection
            rowSelectionModel={selectedFiles.map((file: FileInfo) => file.id)}
            onRowSelectionModelChange={(idsSelected) => {
              if (uniq(idsSelected).length > 10) {
                setShowAlert(true);
              } else {
                const filteredList = filter(files, (item) =>
                  includes(idsSelected, item.id.toString())
                );
                setSelectedFiles(
                  filteredList.map((el) => {
                    return {
                      fileUrlDownload: el.psnResultUrl,
                      fileName: el.fileName,
                      id: el.id,
                      fileId: el.fileId,
                    };
                  }),
                  idsSelected as string[]
                );
                setShowAlert(false);
              }
            }}
            rowSelection={true}
            rowCount={total}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={isLoading}
          />
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
                width={20}
                height={22}
                loading="lazy"
              />
            }
          >
            {t('download-files.message.file-length')}
          </StyledAlert>
        )}
      </Card>
    </Suspense>
  );
}

export default memo(DownloadFileView);
