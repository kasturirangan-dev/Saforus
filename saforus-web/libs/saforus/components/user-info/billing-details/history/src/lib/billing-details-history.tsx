import { Box, Button, Typography } from '@mui/material';
import BillingDetailTableView from '@web-workspace/saforus/components/user-info/billing-details/table';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { Dispatch, SetStateAction } from 'react';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';

export function BillingDetailHistoryView({
  loading,
  setGetInvoiceActions,
}: {
  loading: boolean;
  setGetInvoiceActions: Dispatch<SetStateAction<'next' | 'prev'>>;
}) {
  const { t } = useTranslation();
  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);

  const handleCancel = () => {
    dialogStore.openDialog({ name: DialogType.CancelSubscription });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        flex: 2,
      }}
    >
      <LoadingOverLayer loading={loading} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '20px 24px',
          backgroundColor: 'var(--base-white)',
        }}
      >
        <Typography
          sx={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--gray-700)',
          }}
        >
          {t('billDetail.payment-history')}
        </Typography>
        <BillingDetailTableView />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          my: '30px',
        }}
      >
        <Button
          variant="outlined"
          disabled={subscriptionPlanDetail?.subscriptionStatus !== 'ACTIVE'}
          sx={{
            color: 'var(--gray-700)',
            padding: '8px 12px',
            border: '1px solid var(--neutral-700)',
            backgroundColor: 'var(--base-white)',
            fontSize: '14px',
            textTransform: 'none',
          }}
          onClick={handleCancel}
        >
          {t('billDetail.cancel-plan')}
        </Button>
      </Box>
    </Box>
  );
}

export default BillingDetailHistoryView;
