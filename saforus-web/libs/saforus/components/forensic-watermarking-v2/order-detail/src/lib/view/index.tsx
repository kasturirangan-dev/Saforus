import { Box } from '@mui/material';
import WatermarkingStore, {
  StatusName,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useSnapshot } from 'valtio';
import DownloadFileStore from '../data/store';
import { useMemo } from 'react';
import OrderInfo from './order-info';
import DownloadFileView from './watermarked-file';
import DownloadLoader from './download-loader';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { formatBytes } from '@web-workspace/saforus/common/utils';
import SharedHistory from './share-history';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';

export interface OrderDetailViewProps {
  isLoading: boolean;
  isDownloading: boolean;
  onDownloadHistory: () => Promise<void>;
  onDownloadFiles: () => Promise<void>;
  onShared: (personalOrderResultSq: string, email: string) => Promise<void>;
}

const OrderDetailView = ({
  isLoading,
  isDownloading,
  onDownloadHistory,
  onDownloadFiles,
  onShared,
}: OrderDetailViewProps) => {
  const { files, total, selectedFiles } = useSnapshot(DownloadFileStore);
  const { currentOrder } = useSnapshot(WatermarkingStore);

  const resultFileSize = useMemo(() => {
    if (files && files.length > 0 && files[0].psnResultSize) {
      return files[0].fileSizeUnit
        ? `${files[0].psnResultSize} ${files[0].fileSizeUnit}`
        : formatBytes(files[0].psnResultSize as number);
    } else {
      return '';
    }
  }, [files]);

  const shareList = files
    ?.filter((file) => file.sharedHistories)
    .flatMap((file) =>
      file.sharedHistories.map((value, index) => ({
        id: `${file.id}${index}`,
        wtrCode: file.psnResultFileMsg,
        fileName: file.fileName,
        sharedEmails: value.sharedEmails,
        shareDate: value.sharedAt,
      }))
    );

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
      sx={{
        position: 'relative',
      }}
    >
      <LoadingOverLayer loading={isLoading} />
      <DownloadLoader open={isDownloading} />
      <Box display="flex" flexDirection="column" gap="16px">
        <OrderInfo order={{ ...currentOrder }} />
        <Box
          sx={{
            padding: '1.5rem',
            background: 'var(--base-white)',
            borderRadius: '8px',
          }}
        >
          <MediaPreview
            file={{
              contentType:
                currentOrder?.contentType ||
                (currentOrder?.file?.contentType.field as string),
              preview: currentOrder?.playback || currentOrder?.thumbnail,
              fileName:
                currentOrder?.fileName || currentOrder?.file?.psnInfoFileNm,
              fileSize: resultFileSize || currentOrder?.file?.size.field,
            }}
            // Play back or thumbnail
            control={Boolean(currentOrder?.playback)}
          />
        </Box>
      </Box>
      {/* Hide when status is expired */}
      {currentOrder?.status !== StatusName.EXPIRED && (
        <DownloadFileView
          loading={isLoading}
          enableAction={currentOrder?.status === StatusName.COMPLETED}
          files={[...files]}
          total={total}
          selectedFiles={[...selectedFiles]}
          onDownloadFiles={onDownloadFiles}
          onShared={onShared}
        />
      )}
      {shareList && shareList.length > 0 && (
        <SharedHistory shareList={shareList} />
      )}
    </Box>
  );
};

export default OrderDetailView;
