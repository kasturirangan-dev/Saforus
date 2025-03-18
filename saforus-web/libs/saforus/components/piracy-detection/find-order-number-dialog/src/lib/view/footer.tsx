import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { PurpleButton as StyledButton } from '@web-workspace/shared/components/widgets/button';
import { Box, Button } from '@mui/material';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

function FindOrderFooter({ onClose, onApply }: any) {
  const { t } = useTranslation();
  const { selectedWatermarkFile } = useSnapshot(FindWtrOrderStore);

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <StyledButton
        onClick={onClose}
        color="secondary"
        fullWidth
        sx={{
          height: 46,
          mr: 4,
        }}
      >
        {t('find-order-number.btn-cancel')}
      </StyledButton>
      <StyledButton
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
      </StyledButton>
    </Box>
  );
}

export default FindOrderFooter;
