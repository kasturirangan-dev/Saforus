import { Box, styled } from '@mui/material';
import { useCurrentOrderData } from './data';
import OrderInfo from './view/order-info';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';
import {
  WtrOrderFileStatus,
  WtrOrderStatus,
} from '@web-workspace/api-console/components/watermarking/data';
import DownloadFileView from './view/watermarked-file';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function WtrViewOrderFile() {
  const { isLoading, currentOrder, currentFile, onDownloadFiles } =
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
      {/* Hide when status is expired */}
      {currentOrder?.status !== WtrOrderStatus.EXPIRED && (
        <DownloadFileView
          isLoading={isLoading}
          files={currentFile?.wtrOrderFiles ?? []}
          total={currentFile?.wtrOrderFiles?.length ?? 0}
          reqDate={reqDate}
          onDownloadFiles={onDownloadFiles}
          enableAction={currentFile?.status === WtrOrderFileStatus.SUCCEEDED}
        />
      )}
    </BoxContainer>
  );
}

export default WtrViewOrderFile;
