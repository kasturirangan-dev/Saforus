import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { FindWtrOrderStore } from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';
import { Box } from '@mui/material';

function FindOrderFooter({ onClose, onApply }: any) {
  const { t } = useTranslation();
  const { selectedWatermarkFile } = useSnapshot(FindWtrOrderStore);

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Button
        onClick={onClose}
        color="secondary"
        fullWidth
        sx={{
          height: 46,
          mr: 4,
        }}
      >
        {t('find-order-number.btn-cancel')}
      </Button>
      <Button
        onClick={() => {
          onApply(selectedWatermarkFile);
          onClose();
        }}
        disabled={!selectedWatermarkFile}
        fullWidth
        sx={{
          height: 46,
        }}
      >
        {t('find-order-number.btn-apply')}
      </Button>
    </Box>
  );
}

export default FindOrderFooter;
