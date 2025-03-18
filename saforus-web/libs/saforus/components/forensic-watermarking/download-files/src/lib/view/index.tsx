import {
  Button,
  SvgIcon,
  Alert,
  Box,
  Card,
  styled,
  SxProps,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { Suspense, memo, useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import Table from '@web-workspace/shared/components/widgets/table';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import DownloadFileStore from '../store';
import { FileInfo } from '../interface';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import ImagePreview, {
  isTiffFile,
} from '@web-workspace/shared/components/widgets/image-preview';
import WarningIcon from '../assets/warning.svg';
import {
  OrderExpiredPlaceholder,
  Limit0,
  Limit1,
  Limit2,
  Limit3,
  InfoIcon,
  CopyIcon,
} from '../assets';
import { DownloadIcon } from '../assets/download';
import { ShareIcon } from '../assets/share';
import DownloadLoader from './download-loader';
import TranslucentWrapper from './translucent-wrapper';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { filter, includes, uniq } from 'lodash-es';
import {
  HandleDownloadFile,
  HandleDownloadZip,
} from '@web-workspace/shared/helpers/files/download-file';
import { CalenderCheckBlack } from '../assets/calender-check-black';
import {
  getMinuteOffset,
  getTeamId,
  getTimezone,
} from '@web-workspace/saforus/common/utils';
import { getSharedHistory, shareFile } from '../api';
import { showToast, pxToVw } from '@web-workspace/saforus/common/utils';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { isPast, parseISO } from 'date-fns';
import Icon from '@web-workspace/shared/components/widgets/icon';
import i18next from 'i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';

const timezone = getTimezone();

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  row: FileInfo;
  setDownloading?: (value: boolean) => void;
}

const StyledDataGrid = styled(Table)({
  '& .MuiDataGrid-columnHeaders': {
    height: `${pxToVw('3rem')} !important`,
    minHeight: `${pxToVw('48px')} !important`,
    maxHeight: `${pxToVw('48px')} !important`,
    lineHeight: `${pxToVw('48px')} !important`,
  },
  '& .psnResultFileMsg, .file_size, .sharedEmail': {
    width: `${pxToVw('180px')} !important`,
    maxWidth: `${pxToVw('180px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .share-link': {
    width: `${pxToVw('100px')} !important`,
    maxWidth: `${pxToVw('100px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .fileName': {
    width: `${pxToVw('250px')} !important`,
    maxWidth: `${pxToVw('250px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .downloadCount': {
    width: `${pxToVw('200px')} !important`,
    maxWidth: `${pxToVw('200px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
  '& .progress, .watermarkCode, .psnFileMediaCd, .formatFWM': {
    width: `${pxToVw('150px')} !important`,
    maxWidth: `${pxToVw('150px')} !important`,
    minWidth: `${pxToVw('100px')} !important`,
    height: `${pxToVw('48px')} !important`,
  },
});

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: pxToVw(11),
    maxWidth: pxToVw(430),
    padding: pxToVw('0.8rem'),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    '&::before': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const StyledAlert = styled(Alert)`
  background: #fef6f6;
  border: ${pxToVw('1.5px')} solid #feb8ae;
  box-shadow: ${pxToVw(['0px', '1px', '2px'])} rgba(16, 24, 40, 0.04);
  border-radius: ${pxToVw('5px')};
  padding: ${pxToVw(['13px', '24px'])};

  & .MuiAlert-message {
    font-weight: 400;
    font-size: ${pxToVw('14px')};
    line-height: ${pxToVw('20px')};
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: ${pxToVw('1rem')};
  }
`;

const StyledInfor = styled(Alert)`
  background: #f9f8fb;
  border: ${pxToVw('1.5px')} solid #648ef7;
  box-shadow: ${pxToVw(['0px', '1px', '2px'])} rgba(16, 24, 40, 0.04);
  border-radius: ${pxToVw('5px')};
  padding: ${pxToVw('13px 24px')};
  display: flex;
  align-items: center;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: ${pxToVw('14px')};
    line-height: ${pxToVw('20px')};
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: ${pxToVw('1rem')};
  }
`;
function ResultContentLabel({
  field,
  row,
  sx,
  setDownloading,
}: IResultContentLabel) {
  const { t } = useTranslation();

  let dom = <Box>''</Box>;
  switch (field) {
    case 'file_size':
      dom = (
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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
            fontSize: pxToVw('14px'),
            lineHeight: pxToVw('20px'),
            textTransform: 'none',
            padding: '0',
            textDecoration: 'underline',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          onClick={() => {
            setDownloading && setDownloading(true);
            HandleDownloadFile(
              row.fileId,
              row.fileName,
              AuthStore.token,
              t
            ).finally(() => {
              setDownloading && setDownloading(false);
            });
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
  refetchFiles,
  total,
  selectedFiles = [],
}: any) {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const { setRequestQuery, setSelectedFiles, onReset } =
    useSnapshot(DownloadFileStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const [isDownloading, setDownloading] = useState(false);
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
  const isExpiredOrder = isPast(parseISO(paramsAsObject.expirationDate));

  const handleDownloadClick = async () => {
    if (selectedFiles.length == 0) {
      return;
    }

    try {
      setDownloading(true);
      if (selectedFiles.length == 1) {
        await HandleDownloadFile(
          selectedFiles[0].fileId,
          selectedFiles[0].fileName,
          AuthStore.token,
          t
        );
      } else if (selectedFiles.length > 1) {
        await HandleDownloadZip(
          selectedFiles,
          paramsAsObject.fileName,
          AuthStore.token,
          t
        );
      }
    } finally {
      setDownloading(false);
      refetchFiles();
    }
  };

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  const [image, setImage] = useState('');
  const getImage = async () => {
    if (image) return;
    if (isExpiredOrder) {
      setImage(OrderExpiredPlaceholder);
    } else {
      const thumImage = files[0]?.moreInfo?.craftedLinks?.medium as string;
      setImage(thumImage);
    }
  };

  // Fetch image when files are loaded
  useEffect(() => {
    files.length > 0 && getImage();
  }, [files.length]);

  const showDownloadLimitImage = (downloadCount: number) => {
    switch (downloadCount) {
      case 0:
        return Limit0;
      case 1:
        return Limit1;
      case 2:
        return Limit2;
      case 3:
        return Limit3;
      default:
        return Limit0;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'psnResultFileMsg',
      headerName: `${t('page-watermarking.table.watermark-code')}`,
      headerClassName: 'psnResultFileMsg',
      cellClassName: 'psnResultFileMsg',
      // width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: true,
      sortComparator: (v1, v2) => parseInt(v1.value) - parseInt(v2.value),
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {params.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'share-link',
      headerName: `${t('page-watermarking.table.share')}`,
      headerClassName: 'share-link',
      cellClassName: 'share-link',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell(params) {
        if (params.row.sharedEmail) {
          return <Typography>{t('page-watermarking.table.shared')}</Typography>;
        }
        const isDisabled = params.row.downloadCount >= 1 || isExpiredOrder;
        return (
          <Box
            sx={{
              cursor: isDisabled ? 'normal' : 'pointer',
              color: 'var(--gray-500)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: isDisabled ? 0.5 : 1,
            }}
            onClick={() => {
              !isDisabled &&
                dialogStore.openDialog({
                  name: DialogType.ShareDialog,
                  props: {
                    fileName: params.row.fileName,
                    onSend: async (sharedEmails: string[]) => {
                      const res = await shareFile({
                        personalOrderResultSq: params.row.fileId,
                        sharedEmails,
                      });
                      if (res?.resultMsg === 'OK') {
                        showToast.success(
                          t('page-watermarking.dialog.email-success')
                        );
                      } else {
                        showToast.error(
                          t('page-watermarking.dialog.email-fail')
                        );
                      }
                      refetchFiles();
                    },
                  },
                });
            }}
          >
            <SvgIcon
              component={ShareIcon}
              sx={{
                width: pxToVw('1.5rem'),
                height: pxToVw('1.5rem'),
              }}
            />
          </Box>
        );
      },
    },
    {
      field: 'downloadCount',
      headerClassName: 'downloadCount',
      cellClassName: 'downloadCount',
      headerName: (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: pxToVw('0.5rem'),
          }}
        >
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: pxToVw('14px'),
              lineHeight: pxToVw('20px'),
              color: 'var(--gray-500)',
            }}
          >
            {t('page-watermarking.table.download-limits')}
          </Typography>
          <LightTooltip
            title={
              <Box>
                <Typography
                  sx={{
                    fontWeight: '500',
                    color: 'var(--gray-700)',
                    fontSize: pxToVw('14px'),
                  }}
                >
                  {t('page-watermarking.table.download-limits-tooltip-header')}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    color: 'var(--gray-50)',
                    fontSize: pxToVw('13px'),
                  }}
                >
                  {t('page-watermarking.table.download-limits-tooltip')}
                </Typography>
              </Box>
            }
            placement="right"
            arrow
          >
            <img src={InfoIcon} />
          </LightTooltip>
        </Box>
      ),
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      // width: 200,
      renderCell(params) {
        return (
          <Box
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              gap: pxToVw('0.5rem'),
            }}
          >
            <img src={showDownloadLimitImage(Number(params.value || 0))} />
          </Box>
        );
      },
    },
    {
      field: 'fileName',
      headerName: `${t('page-watermarking.table.file-name')}`,
      headerClassName: 'fileName',
      cellClassName: 'fileName',
      // width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {params.value ?? '--'}
          </Box>
        );
      },
    },
    {
      field: 'file_size',
      headerName: `${t('page-watermarking.table.file-size')}`,
      headerClassName: 'file_size',
      cellClassName: 'file_size',
      // width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
    {
      field: 'sharedEmail',
      headerName: `${t('page-watermarking.table.shared-to')}`,
      headerClassName: 'sharedEmail',
      cellClassName: 'sharedEmail',
      // width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return params.value ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: pxToVw('0.5rem'),
            }}
          >
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: pxToVw('0.5rem'),
                background: 'var(--neutral-500)',
                padding: pxToVw('0.5rem'),
                width: '30px',
                borderRadius: '20%',
              }}
              onClick={() => {
                const el = document.createElement('textarea');
                el.value = params.value;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
              }}
            >
              <img src={CopyIcon} />
            </Box>
            <Typography
              sx={{
                width: '140px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {params.value}
            </Typography>
          </Box>
        ) : null;
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
      <DownloadLoader open={isDownloading} />
      <Card
        sx={{
          mt: pxToVw('1.5rem'),
          background: 'var(--base-white)',
          borderRadius: pxToVw('0.5rem'),
          padding: pxToVw('1.5rem'),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: pxToVw('1rem'),
            mb: pxToVw('1rem'),
          }}
        >
          <ImagePreview
            src={image}
            alt={paramsAsObject.fileName}
            containerStyle={{ height: pxToVw('160px'), width: pxToVw('160px') }}
            mediaType={paramsAsObject.type}
            isTiff={isTiffFile(paramsAsObject?.fileName)}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: pxToVw('20px'),
                lineHeight: pxToVw('28px'),
              }}
            >
              {paramsAsObject.fileName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: pxToVw('0.5rem'),
                mt: pxToVw('0.7rem'),
                mb: pxToVw('0.7rem'),
                background: 'var(--neutral-500)',
                width: 'fit-content',
                padding: pxToVw(['6.5px', '16px']),
                borderRadius: pxToVw('8px'),
              }}
            >
              <SvgIcon
                component={CalenderCheckBlack}
                style={{ color: 'var(--gray-50)' }}
              />
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: pxToVw('14px'),
                  lineHeight: pxToVw('20px'),
                  color: 'var(--gray-50)',
                }}
              >
                {`${t('download-files.expiry-date')}:`}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: pxToVw('15px'),
                  lineHeight: pxToVw('22px'),
                  color: isExpiredOrder
                    ? 'var(--gray-25)'
                    : 'var(--purple-400)',
                }}
              >
                {formatDateWithLanguage(
                  paramsAsObject.expirationDate,
                  i18next.language,
                  true,
                  undefined,
                  undefined,
                  true,
                  tzOffset
                )}{' '}
                {timezone}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: pxToVw('15px'),
                lineHeight: pxToVw('22px'),
                // color: 'var(--gray-25)',
              }}
            >
              {t('download-files.note')}
            </Typography>
            <LoadingButton
              type="button"
              sx={{
                mt: pxToVw('0.7rem'),
                py: pxToVw('0.5rem'),
                maxWidth: 'fit-content',
              }}
              onClick={async () => {
                await getSharedHistory({
                  teamId: getTeamId(),
                  personOrderInfoSq,
                });
              }}
            >
              <SvgIcon
                component={DownloadIcon}
                sx={{ marginRight: pxToVw('0.5rem') }}
              />
              {t('download-files.share-link-history')}
            </LoadingButton>
          </Box>
        </Box>
        <StyledInfor
          sx={{ marginTop: pxToVw('1rem'), mb: pxToVw('1rem') }}
          severity="info"
          icon={
            <Icon
              name={'information'}
              color={'var(--purple-600)'}
              size={pxToVw(24)}
            />
          }
        >
          {t('download-files.share-warning.first-sentence')} <br />
          {/* {t('download-files.share-warning.second-sentence')} <br /> */}
          {/* {t('download-files.share-warning.third-sentence')} */}
        </StyledInfor>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 24rem)' : 'calc(100vw - 10rem)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: pxToVw('2rem'),
            }}
          >
            <Typography
              sx={{
                color: 'var(--gray-700)',
                fontWeight: '400',
                fontSize: pxToVw('15px'),
              }}
            >
              {t('download-files.selected')} ({selectedFiles.length}/
              {files.length})
            </Typography>
            <Button
              disabled={selectedFiles.length === 0}
              sx={{
                py: pxToVw('0.5rem'),
                display: 'flex',
                gap: pxToVw('0.5rem'),
                textTransform: 'none',
              }}
              onClick={handleDownloadClick}
            >
              <SvgIcon component={DownloadIcon} />
              {t('download-files.downloadAll')}
            </Button>
          </Box>

          <TranslucentWrapper
            isDisabled={!isLoading && isExpiredOrder}
            title={t('download-files.download-expired.expiredOrder')}
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
              checkboxSelection
              rowSelectionModel={selectedFiles.map((file: FileInfo) => file.id)}
              onRowSelectionModelChange={(idsSelected) => {
                if (uniq(idsSelected).length > 10) {
                  setShowAlert(true);
                } else {
                  const filteredList = filter(files, (item) => {
                    return (
                      includes(idsSelected, item.id) && item.downloadCount < 3
                    );
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
                const isExpired = isPast(parseISO(params.row.expirationDate));
                const selectable = params.row.sharedEmail ? false : true;
                return selectable && params.row.downloadCount < 3 && !isExpired;
              }}
              getRowClassName={(params) =>
                params.row.sharedEmail ||
                params.row.downloadCount >= 3 ||
                isPast(parseISO(params.row.expirationDate))
                  ? 'row-disabled'
                  : ''
              }
              rowSelection={true}
              rowCount={total}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              loading={isLoading}
            />
          </TranslucentWrapper>
        </Box>
        {showAlert && (
          <StyledAlert
            sx={{ marginTop: pxToVw('1.5rem') }}
            severity="error"
            icon={
              <img
                src={WarningIcon}
                alt="Warning"
                title="Warning"
                width={pxToVw(20)}
                height={pxToVw(22)}
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
