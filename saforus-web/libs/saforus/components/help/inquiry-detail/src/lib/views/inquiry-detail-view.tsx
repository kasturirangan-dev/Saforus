import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  styled,
  SxProps,
} from '@mui/material';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FileIcon from '../assets/file.svg';
import {
  Inquiry,
  InquiryStatus,
  MyInquiriesStore,
  onDownloadFile,
} from '@web-workspace/saforus/components/help/data';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  formatBytes,
  getMinuteOffset,
} from '@web-workspace/saforus/common/utils';
import i18next from 'i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useSnapshot } from 'valtio';
import { useCancelInquiryData } from '../data/cancel-inquiry';
import { queryEqual } from 'firebase/firestore';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

interface IResultContentLabel {
  sx?: SxProps;
  field?: string;
  value: string;
}

function ResultContentLabel({ value, field, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let color = 'var(--gray-700)';
  let background = 'var(--neutral-300, #F7F7F8)';
  let valueLabel = value;
  switch (field) {
    case 'status':
      switch (value) {
        case InquiryStatus.ANSWERED:
          color = 'var(--green-700)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          background = 'var(--green-50)';
          break;
        case InquiryStatus.IN_PROGRESS:
          color = 'var(--purple-600)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          background = 'var(--purple-50)';
          break;
        case InquiryStatus.IN_QUEUE:
          color = 'var(--gray-700, #272D37)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          background = 'var(--neutral-300, #F7F7F8)';

          break;
        case InquiryStatus.CANCELED:
          color = 'var(--red-500)';
          valueLabel = t(
            `help.my-inquiries.status-list.${value.toLowerCase()}`
          );
          background = 'var(--red-50)';
          break;
        default:
          color = 'var(--red-500)';
          valueLabel = 'Unknown';
          background = 'var(--red-50)';
          break;
      }
      break;
    case 'category':
      valueLabel = t(`help.my-inquiries.category-list.${value.toLowerCase()}`);
      break;
    default:
      break;
  }

  return (
    <Typography
      variant="body2"
      sx={{
        color,
        background,
        textDecorationLine: 'none',
        textAlign: 'center',
        borderRadius: '5px',
        px: '12px',
        py: '4px',
        ...sx,
      }}
    >
      {valueLabel}
    </Typography>
  );
}

export function InquiryDetailView({
  isLoading,
  inquiryId,
}: {
  isLoading: boolean;
  inquiryId: string;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const [isDownloading, setDownloading] = useState(false);

  const { openDialog } = useSnapshot(DialogStore);
  const { loading, onCancelInquiry } = useCancelInquiryData();
  const { setCurrentInquiry, currentInquiry, currentInquiryId } =
    useSnapshot(MyInquiriesStore);

  const [quesInquiry, setQuesInquiry] = useState<Inquiry | null>(null);
  const [ansInquiry, setAnsInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (currentInquiry && currentInquiry.length > 0) {
      const questQA =
        currentInquiry.filter((item) => item.questionAnswer === 'QUESTION') ??
        null;

      const ansQA =
        currentInquiry.filter((item) => item.questionAnswer === 'ANSWER') ??
        null;

      if (questQA && questQA.length > 0) {
        setQuesInquiry(questQA[0] as Inquiry);
      }
      if (ansQA && ansQA.length > 0) {
        setAnsInquiry(ansQA[0] as Inquiry);
      } else {
        setAnsInquiry(null);
      }
    }
  }, [currentInquiry]);

  const openCancelDialog = () => {
    openDialog({
      name: DialogType.CancelInquiry,
      props: {
        onConfirm: async () => {
          await onCancelInquiry(currentInquiryId ?? inquiryId);
        },
      },
    });
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Backdrop
        open={isLoading || loading || isDownloading}
        sx={{
          display: 'flex',
          zIndex: 3000,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && (
        <>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
            }}
          >
            <StyledButton
              onClick={() => {
                navigate(ROUTES.HELP.HELP_CENTER.path, { replace: true });
              }}
              variant={'text'}
            >
              <Icon
                iconStyle={{ marginRight: '6px' }}
                name="arrow_left"
                size={45}
                color="#5F6D7E"
              />
            </StyledButton>
            <Typography
              sx={{
                width: '100%',
                maxWidth: 'calc(100vw - 30rem)',
                wordWrap: 'break-word',
                whiteSpace: 'pre-line',
              }}
              variant="h5"
              color={'var(--gray-900)'}
            >
              {quesInquiry?.title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'var(--base-white)',
              mt: '1.5rem',
              padding: '1.5rem',
            }}
          >
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Typography
                variant="subtitle1"
                color={'var(--gray-700, #272D37)'}
                fontWeight={600}
              >
                {t('help.inquiry-detail.title')}
              </Typography>
              {quesInquiry?.qaCategory && (
                <ResultContentLabel
                  field="category"
                  value={quesInquiry?.qaCategory}
                />
              )}
              {quesInquiry?.status && (
                <ResultContentLabel
                  field="status"
                  value={quesInquiry?.status}
                />
              )}
              {quesInquiry?.createdAt && (
                <ResultContentLabel
                  value={formatDateWithLanguage({
                    date: quesInquiry?.createdAt,
                    isDetail: true,
                    withSlash: true,
                    tzOffset,
                  })}
                />
              )}
            </Box>

            <Box
              sx={{
                width: '100%',
                maxWidth: 'calc(100vw - 30rem)',
                mt: '1rem',
              }}
            >
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-line',
                  textAlign: 'justify',
                }}
                variant="subtitle2"
                color={'var(--gray-100, #49556D)'}
              >
                {`${quesInquiry?.content ?? '--'}`}
              </Typography>
            </Box>

            {quesInquiry?.attachedFileList?.map((file, index) => (
              <Box key={index} sx={{ mt: '1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '1rem',
                    borderRadius: '5px',
                    border: '1px solid var(--neutral-600, #EAEBF0)',
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                    marginTop: '0.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setDownloading(true);
                    onDownloadFile(file.id, file.fileName, t).finally(() => {
                      setDownloading(false);
                    });
                  }}
                >
                  <img
                    src={FileIcon}
                    alt="file"
                    title="file"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                  <Box sx={{ ml: '1rem' }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={500}
                      color={'var(--gray-700, #272D37)'}
                    >
                      {file.fileName}
                    </Typography>
                    <Typography
                      color={'var(--gray-50, #5F6D7E)'}
                      variant="body2"
                    >
                      {formatBytes(file.fileSize ?? 0, 1)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}

            {!(
              quesInquiry?.status === InquiryStatus.ANSWERED ||
              quesInquiry?.status === InquiryStatus.CANCELED
            ) && (
              <LoadingButton
                sx={{ height: 46, mt: '1.5rem' }}
                color="error"
                loading={false}
                type="button"
                onClick={openCancelDialog}
              >
                {t('button.cancel')}
              </LoadingButton>
            )}
          </Box>
          {!(
            quesInquiry?.status === InquiryStatus.ANSWERED ||
            quesInquiry?.status === InquiryStatus.CANCELED
          ) && (
            <Box sx={{ mt: '1.5rem' }}>
              <Typography variant="subtitle2" color={'var(--gray-50, #5F6D7E)'}>
                {t('help.inquiry-detail.description')}
              </Typography>
            </Box>
          )}

          {ansInquiry && (
            <Box
              sx={{
                width: '100%',
                backgroundColor: 'var(--base-white)',
                mt: '1.5rem',
                padding: '1.5rem',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  variant="subtitle1"
                  color={'var(--gray-700, #272D37)'}
                  fontWeight={600}
                >
                  {t('help.inquiry-detail.answered')}
                </Typography>
                <ResultContentLabel
                  sx={{ ml: '1rem' }}
                  value={
                    ansInquiry?.createdAt
                      ? formatDateWithLanguage({
                          date: ansInquiry?.createdAt,
                          isDetail: true,
                          withSlash: true,
                          tzOffset,
                        })
                      : ''
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', mt: '1rem' }}></Box>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 'calc(100vw - 30rem)',
                  mt: '1rem',
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'justify',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                  }}
                  variant="subtitle2"
                  color={'var(--gray-100, #49556D)'}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ansInquiry?.content ?? '--',
                    }}
                  />
                </Typography>
              </Box>

              {ansInquiry?.attachedFileList?.map((file, index) => (
                <Box key={index} sx={{ mt: '1rem' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '1rem',
                      borderRadius: '5px',
                      border: '1px solid var(--neutral-600, #EAEBF0)',
                      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                      marginTop: '0.5rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setDownloading(true);
                      onDownloadFile(file.id, file.fileName, t).finally(() => {
                        setDownloading(false);
                      });
                    }}
                  >
                    <img
                      src={FileIcon}
                      alt="file"
                      title="file"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <Box sx={{ ml: '1rem' }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={500}
                        color={'var(--gray-700, #272D37)'}
                      >
                        {file.fileName}
                      </Typography>
                      <Typography
                        color={'var(--gray-50, #5F6D7E)'}
                        variant="body2"
                      >
                        {formatBytes(file.fileSize ?? 0, 1)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default InquiryDetailView;
