import { Box, styled, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useSnapshot } from 'valtio';
import { BillingDetailStore } from '@web-workspace/saforus/components/user-info/billing-details/data';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';

const HeaderStyled = styled(Box)(() => ({
  fontSize: '22px',
  fontcolor: 'var(--gray-700)',
  fontWeight: 700,
  lineHeight: '30px',
}));

export function BillingDetailInfoView({ loading }: { loading: boolean }) {
  const { t } = useTranslation();
  const { billingAddress } = useSnapshot(BillingDetailStore);

  return (
    <Box
      flex={1}
      sx={{
        position: 'relative',
        backgroundColor: 'var(--base-white)',
        padding: '20px 24px',
      }}
    >
      <LoadingOverLayer loading={loading} />

      <HeaderStyled sx={{ display: 'flex' }}>
        {t('billDetail.details')}
      </HeaderStyled>

      <Typography mt={'1rem'}>
        <Trans
          i18nKey="billDetail.invoice-billed-to"
          values={{ email: billingAddress?.email }}
          components={{ b: <b /> }}
          shouldUnescape={true}
        />
      </Typography>

      <Typography color={'var(--gray-25)'} fontWeight={600} mt="2rem">
        {t('billDetail.additional-information')}
      </Typography>

      <Box sx={{ fontSize: '14px', fontWeight: '500', margin: '0.3rem 0' }}>
        {billingAddress?.name}
      </Box>
      <Box sx={{ fontSize: '14px', color: 'var(--gray-50)' }}>
        <Typography>
          {billingAddress?.line1}
          {billingAddress?.line1 && ', '}
          {billingAddress?.line2}
          {billingAddress?.line2 && ', '}
          {billingAddress?.state}
        </Typography>
        <Typography>
          {billingAddress?.city}
          {billingAddress?.city && ', '}
          {billingAddress?.country}
        </Typography>
        <Typography>{billingAddress?.postalCode}</Typography>
      </Box>
      <LoadingButton
        sx={{
          mt: '1rem',
        }}
        onClick={() => {
          dialogStore.openDialog({
            name: DialogType.UpdateBillingAddress,
          });
        }}
      >
        {t('billDetail.update-address.title')}
      </LoadingButton>
    </Box>
  );
}

export default BillingDetailInfoView;
