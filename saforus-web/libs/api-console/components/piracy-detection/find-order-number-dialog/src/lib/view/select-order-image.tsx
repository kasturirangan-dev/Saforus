import { useSnapshot } from 'valtio';
import PreviewDialog from '@web-workspace/api-console/components/piracy-detection/order-file-preview-dialog';
import { FindWtrOrderStore } from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';

function SelectOrderImage() {
  const {
    isPreview,
    setIsPreview,
    selectedWatermarkFile,
    setSelectedWatermarkFile,
  } = useSnapshot(FindWtrOrderStore);

  return isPreview ? (
    <PreviewDialog
      orderFile={selectedWatermarkFile?.orderFile}
      onClose={() => {
        setIsPreview(false);
      }}
      onCancel={() => setSelectedWatermarkFile(null)}
    />
  ) : null;
}

export default SelectOrderImage;
