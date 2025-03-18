import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCurrentOrderingData } from './data';
import OrderInfo from './view/order-info';
import { useLocation } from 'react-router-dom';
import { formatBytes } from '@web-workspace/saforus/common/utils';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import FileAttacked from './view/file-attacked';
import { StepTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import DetectionList from './view/detection-list';
import { PiracyOrderStatus } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';

// import { PiracyOrderStatus } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
// import FailureReason from './view/detection-failure-reason';
// import { useRequestExpertDetectionData } from './data/request-expert-detection';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const FileContainer = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  background: 'var(--base-white)',
  borderRadius: '16px',
  height: '100%',
}));

export function PiracyViewOrderDetail() {
  const location = useLocation();
  // const { onRequestExpertDetection, loading } =
  //   useRequestExpertDetectionData(id);

  const { t } = useTranslation();

  const { isLoading, currentOrder, currentFile } = useCurrentOrderingData();

  const detectionList =
    currentFile?.status === PiracyOrderStatus.DETECTED
      ? currentFile.sharedHistories && currentFile.sharedHistories.length > 0
        ? currentFile.sharedHistories.map((history, index) => ({
            id: `${currentFile.id}${index}`,
            wtrCode: currentFile.detectedCode,
            wtrDescription: currentFile.psnDescription,
            wtrDate: currentFile.wtrCreatedAt,
            sharedEmails: history.sharedEmails,
            sharedAt: history.createdAt,
          }))
        : [
            {
              id: `currentFile.id`,
              wtrCode: currentFile.detectedCode,
              wtrDescription: currentFile.psnDescription,
              wtrDate: currentFile.wtrCreatedAt,
              sharedEmails: [],
              sharedAt: null,
            },
          ]
      : [];

  return (
    <BoxContainer sx={{ position: 'relative' }}>
      <LoadingOverLayer loading={isLoading} />
      <OrderInfo pdOrder={currentOrder} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BoxContainer>
          <StepTitle
            step={1}
            title={t('create-new-request.attack-file.title')}
            isActive={true}
          />
          <FileContainer>
            <MediaPreview
              file={{
                contentType: currentOrder?.contentType,
                preview:
                  currentFile?.moreInfo?.craftedLinks?.playback ||
                  currentFile?.moreInfo?.craftedLinks?.large,
                fileName: currentFile?.fileName,
                fileSize: currentFile?.fileSize,
              }}
              control={Boolean(currentFile?.moreInfo?.craftedLinks?.playback)}
              fullWidth
            />
          </FileContainer>
        </BoxContainer>
        <BoxContainer>
          <StepTitle
            step={2}
            title={t('create-new-request.search-watermark.title')}
            isActive={true}
          />
          <FileContainer>
            <MediaPreview
              file={{
                preview:
                  currentFile?.wtrMoreInfo?.craftedLinks?.playback ||
                  currentFile?.wtrMoreInfo?.craftedLinks?.large,
                fileName: currentFile?.wtrFileName,
              }}
              control={Boolean(
                currentFile?.wtrMoreInfo?.craftedLinks?.playback
              )}
              fullWidth
            />
          </FileContainer>
        </BoxContainer>
      </Box>

      <DetectionList
        detectionList={detectionList}
        status={currentFile?.status}
        reqDate={currentFile?.createdAt}
        esCompletedTime={currentFile?.estimatedCompletionTime}
      />

      {/* {currentOrder?.fileList[0].status === PiracyOrderStatus.FAILED && (
        <FailureReason onRequest={onRequestExpertDetection} loading={loading} />
      )} */}
    </BoxContainer>
  );
}

export default PiracyViewOrderDetail;
