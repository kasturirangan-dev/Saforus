import { useSnapshot } from 'valtio';
import SelectOrderImageDialog from '@web-workspace/saforus/components/piracy-detection/select-order-image-dialog';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

function SelectOrderImage() {
  const { isPreview, setIsPreview } = useSnapshot(FindWtrOrderStore);

  return isPreview ? (
    <SelectOrderImageDialog
      onClose={() => {
        setIsPreview(false);
      }}
    />
  ) : null;
}

export default SelectOrderImage;
