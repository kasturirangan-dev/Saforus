import { Box, styled } from '@mui/material';
import { useCurrentOrderData } from './data';
import OrderInfo from './view/order-info';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';
import DetectionList from './view/detection-list';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyViewOrderDetail() {
  const { isLoading, currentOrder, currentFile, detectionResult, handleRetry } =
    useCurrentOrderData();
  const reqDate = currentOrder?.createdAt;

  return (
    <BoxContainer sx={{ position: 'relative' }}>
      <LoadingOverLayer loading={isLoading} />
      <Box display="flex" flexDirection="column" gap="16px">
        <OrderInfo orderFile={currentFile} reqDate={reqDate} />
        <Box
          sx={{
            padding: '1.5rem',
            background: 'var(--base-white)',
            borderRadius: '8px',
          }}
        >
          <MediaPreview
            file={{
              contentType: currentFile?.fileType,
              preview:
                currentFile?.moreInfo?.craftedLinks?.playback ||
                currentFile?.moreInfo?.craftedLinks?.large,
              fileName: currentFile?.fileName,
              fileSize: currentFile?.fileSize,
            }}
            control={Boolean(currentFile?.moreInfo?.craftedLinks?.playback)}
          />
        </Box>
      </Box>

      <DetectionList
        currentFile={currentFile}
        reqDate={currentOrder?.createdAt}
        esCompletedTime={currentFile?.moreInfo?.estimatedCompletionTime}
        detectionResult={detectionResult}
        handleRetry={handleRetry}
      />
    </BoxContainer>
  );
}

export default PiracyViewOrderDetail;
