import {
  Box,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import {
  Address,
  BillingDetailStore,
} from '@web-workspace/saforus/components/user-info/billing-details/data';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import useUpdateBillingDetailData from './data';

export default function UpdateBillingAddress({
  onClose,
}: {
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { billingAddress, countries } = useSnapshot(BillingDetailStore);
  const { updateBillingAddress } = useUpdateBillingDetailData();
  // Initialize the form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Address>({
    defaultValues: billingAddress as Address,
  });

  const onSubmit = (data: Address) => {
    // Handle form submission, e.g., update billing address
    updateBillingAddress(data);
    onClose();
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '517px',
        },
      }}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      iconCss={{
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      title={t('billDetail.update-address.title') as string}
      titleCss={{
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'left',
        letterSpacing: '-0.02em',
        color: 'var(--gray-700)',
      }}
      dialogContent={
        <Box component="form" noValidate>
          <Typography pb={'8px'}>
            {t('billDetail.update-address.company-name')}
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput {...register('name')} />
          </FormControl>
          <Typography pb={'8px'} pt={'1rem'}>
            {t('billDetail.update-address.country')}
          </Typography>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={countries || []}
                onChange={(event, newValue) => {
                  return field.onChange(newValue?.value || 0);
                }}
                sx={{
                  '& .MuiOutlinedInput-root ': {
                    height: '55px',
                  },
                }}
              />
            )}
          />

          <Typography color={'var(--gray-25)'} fontWeight={500}>
            {t('billDetail.update-address.additional-details')}
          </Typography>

          <Typography pb={'8px'} pt={'1rem'}>
            {t('billDetail.update-address.address')}
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput {...register('line1')} />
          </FormControl>

          <Typography pb={'8px'} pt={'1rem'}>
            {t('billDetail.update-address.city')}
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput {...register('city')} />
          </FormControl>

          <Typography pb={'8px'} pt={'1rem'}>
            {t('billDetail.update-address.state')}
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput {...register('state')} />
          </FormControl>

          <Typography pb={'8px'} pt={'1rem'}>
            {t('billDetail.update-address.zip-code')}
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput {...register('postalCode')} />
          </FormControl>
        </Box>
      }
      contentCss={{
        paddingBottom: '1.5rem',
        color: 'var(--gray-50)',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
      }}
      onClose={onClose}
      footer={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ mr: 2, height: 46 }}
          >
            {t('billDetail.update-address.save')}
          </LoadingButton>
        </Box>
      }
    />
  );
}
