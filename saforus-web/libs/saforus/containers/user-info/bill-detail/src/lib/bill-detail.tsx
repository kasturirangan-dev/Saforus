import { Box } from '@mui/material';
import {
  BillingDetailHistoryView,
  BillingDetailInfoView,
} from '@web-workspace/saforus/components/user-info/billing-detail';

export function BillingDetailContainer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Box sx={{ backgroundColor: 'var(--base-white)', padding: '1.5rem' }}>
        <BillingDetailInfoView></BillingDetailInfoView>
      </Box>
      <Box sx={{ backgroundColor: 'var(--base-white)', padding: '1.5rem' }}>
        <BillingDetailHistoryView></BillingDetailHistoryView>
      </Box>
    </Box>
  );
}

export default BillingDetailContainer;
