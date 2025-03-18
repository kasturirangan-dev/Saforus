import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { Box } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerticalImageSlider, {
  IMediaData,
} from '@web-workspace/shared/components/widgets/vertical-image-slider';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import useFetchOrderFiles from './data/fetch-order-files';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

export function SelectOrderImageDialog({ onClose }: { onClose: () => void }) {
  const [selectedMedia, setSelectedMedia] = useState<IMediaData | null>(null);

  const { t } = useTranslation();
  const { selectedWatermarkFile, setSelectedWatermarkFile, mediaType } =
    useSnapshot(FindWtrOrderStore);
  const { orderNo: selectedOrderNumber, personalOrderSq: selectedOrderId } =
    selectedWatermarkFile || {};

  const { mediaData, isLoading, isLoadingPreview } = useFetchOrderFiles(
    selectedOrderNumber || '',
    mediaType
  );

  return (
    <Dialog
      maxWidth={'lg'}
      fullWidth={true}
      sx={{
        '& .MuiDialogContent-root': {
          backgroundColor: 'var( --neutral-200)',
        },
      }}
      title={t('find-order-number.select-image-title')}
      subtitle={selectedOrderNumber}
      onClose={onClose}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      footer={
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: '100%',
            paddingTop: '1rem',
          }}
        >
          <Button
            onClick={() => {
              onClose();
            }}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('find-order-number.btn-cancel')}
          </Button>
          <Button
            onClick={() => {
              selectedWatermarkFile &&
                setSelectedWatermarkFile({
                  ...selectedWatermarkFile,
                  psnInfoFileNm: selectedMedia?.title,
                  personOrderInfoSq: selectedMedia?.orderInfoSq,
                });

              onClose();
            }}
            fullWidth
            disabled={!selectedMedia}
            sx={{
              mr: 2,
              height: 46,
            }}
          >
            {t('find-order-number.btn-select')}
          </Button>
        </Box>
      }
      dialogContent={
        <VerticalImageSlider
          mediaType={mediaType}
          onSelect={setSelectedMedia}
          mediaData={mediaData}
          loading={isLoading}
          loadingPreview={isLoadingPreview}
        />
      }
    ></Dialog>
  );
}

export default SelectOrderImageDialog;
