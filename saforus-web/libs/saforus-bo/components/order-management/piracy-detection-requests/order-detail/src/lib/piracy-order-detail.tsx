import { Box, Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StatusName } from './data/interface';
import { useCurrentOrderingData } from './data';
import MediaReview from './view/file-review';
import DetailInformation from './view/order-detail-information';
import FailureReason from './view/detection-failure-reason';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import { DetectionStatus } from './view/render-status';
import { PiracyDetectionRequestsStore } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LocalHelpTextView from './view/local-help-text';
import Button from '@web-workspace/shared/components/widgets/button';
import SecurityIcon from './assets/security.svg';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

export function PiracyViewOrderDetail() {
  const { openDialog } = useSnapshot(DialogStore);
  const { currentOrder, status, fileUrl, fileType, currentFile } =
    useCurrentOrderingData();
  const { setMediaType } = useSnapshot(PiracyDetectionRequestsStore);

  useEffect(() => {
    const contentType = currentOrder?.contentType;
    if (contentType) {
      setMediaType(currentOrder?.contentType);
    }
  }, [currentOrder?.contentType]);

  const onUpdateExpertDetection = () => {
    openDialog({
      name: DialogType.BoUpdateExpertDetection,
      props: {
        piracyOrder: currentOrder,
      },
    });
  };

  const { t } = useTranslation();
  return (
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '1.75rem',
            lineHeight: '2.375rem',
            mb: '0.25rem',
          }}
        >
          {currentOrder?.title}
        </Typography>
        <Box>
          <Button
            onClick={onUpdateExpertDetection}
            color="secondary"
            startIcon={<img src={SecurityIcon} alt="" />}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
            }}
          >
            {t(
              'orderManagement.piracy-detection-requests.update-expert-detection'
            )}
          </Button>
        </Box>
      </Box>
      <Typography
        sx={{
          color: 'var(--gray-25)',
          fontWeight: '400',
          fontSize: '0.9375rem',
          lineHeight: '1.375rem',
          mb: '1.5rem',
        }}
      >
        {t('piracy-order-view.order-detail.request-date', {
          date: formatDateWithLanguage(
            currentOrder?.createdAt,
            i18next.language,
            true,
            true
          ),
        })}
      </Typography>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <DetectionStatus statusName={status} />
        <DetectionStatus
          statusName={
            currentOrder?.autoDetection
              ? StatusName.AUTO_DETECTION
              : StatusName.EXPERT_DETECTION
          }
        />
      </Box>
      <Box
        sx={{
          mt: '1.5rem',
          gap: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
        }}
      >
        <Box gap={'0.5rem'} display={'flex'} flexDirection={'column'}>
          <Typography
            sx={{
              color: 'var(--gray-25)',
              fontWeight: '400',
              fontSize: '0.9375rem',
              lineHeight: '1.375rem',
            }}
          >
            {t(
              'orderManagement.piracy-detection-requests.update-expert-detection'
            )}
          </Typography>
          <Box
            sx={{
              padding: '0.75rem 1rem',
              alignItems: 'center',
              borderRadius: '0.375rem',
              border: '1px solid var(--neutral-700)',
              background: 'var(--neutral-300)',
            }}
          >
            <Typography variant="body1" color={'var(--neutral-900)'}>
              {currentFile?.fileName}
            </Typography>
          </Box>
        </Box>
        <MediaReview
          type={currentOrder?.contentType?.toLowerCase()}
          link={fileUrl}
        />
        <DetailInformation
          contentType={currentOrder?.contentType ?? '--'}
          fileType={fileType}
          watermarkCode={currentOrder?.fileList}
          status={currentOrder?.status}
          orderNo={currentOrder?.watermarkingOrderNo}
        />
        {/* {status === StatusName.FAILED && <FailureReason />} */}

        <Typography
          variant="body2"
          sx={{
            color: 'var(--gray-25)',
          }}
        >
          {t('piracy-order-view.order-detail.requirement-title')}
        </Typography>

        <LocalHelpTextView />
      </Box>
    </Card>
  );
}

export default PiracyViewOrderDetail;
