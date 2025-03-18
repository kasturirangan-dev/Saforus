import { Box, Button, FormControl, Divider, Typography } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import Select from '@web-workspace/shared/components/widgets/select';
import { useSnapshot } from 'valtio';
import {
  ViewOrderStore,
  ServiceFieldValues,
  RequestWatermarkingViewOrder,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import CommonStore from '@web-workspace/saforus/common/data';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import _ from 'lodash-es';
import { BoxField, Label } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';
import InputButton from '@web-workspace/shared/components/widgets/input-button';
import { Controller, useForm } from 'react-hook-form';

function OrderSearchView() {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { searchQuery, setSearchQuery, resetWatermarkingOrderStore } =
    useSnapshot(ViewOrderStore);
  const { formatTypeList: formats } = useSnapshot(CommonStore);

  const { getValues, control, reset } = useForm<Partial<ServiceFieldValues>>({
    defaultValues: { orderNo: searchQuery.orderNo },
  });

  const updateFilter = (data?: Partial<RequestWatermarkingViewOrder>) => {
    const formValues = getValues();
    setSearchQuery({ ...data, ...formValues });
  };

  const handleReset = () => {
    reset({ orderNo: '' }); // Reset the form state
    resetWatermarkingOrderStore(); // Reset the store state
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography
          fontSize="20px"
          fontWeight={700}
          lineHeight="28px"
          color={'var(--gray-700)'}
        >
          {t('view-watermarked-order.search.title')}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={handleReset}
          variant="text"
          sx={{ color: 'var(--purple-400)', textTransform: 'none' }}
          startIcon={<Icon name="reset" color="var(--purple-400)" size={16} />}
        >
          {t('view-watermarked-order.search.reset')}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(0,min(345px, max(280px,(100% - 24px)/3))))',
          gap: '12px',
        }}
      >
        <BoxField>
          <Select
            title={`${t('view-watermarked-order.search.format')}`}
            options={formats}
            value={searchQuery?.format}
            onChange={(event) => {
              setSearchQuery({ format: event.target.value as string });
            }}
            showErrorMsg={false}
          />
        </BoxField>
        <BoxField>
          <Label>{t('view-watermarked-order.search.requested')}</Label>
          <DateRangePicker
            value={[
              searchQuery.startDate
                ? new Date(searchQuery.startDate)
                : new Date(),
              searchQuery.endDate ? new Date(searchQuery.endDate) : new Date(),
            ]}
            onChange={(dateRange) => {
              setSearchQuery({
                startDate: dateRange[0],
                endDate: dateRange[1],
              });
            }}
            tzOffset={tzOffset}
            inputStyle={{ width: '100%' }}
          />
        </BoxField>
        <FormControl>
          <Controller
            name={'orderNo'}
            control={control}
            render={({ field }) => (
              <InputButton
                label={`${t('dashboard.search-orders.search.keyword')}`}
                placeholder={`${t(
                  'dashboard.search-orders.search.keyword-placeholder'
                )}`}
                btnTitle={`${t('dashboard.search-orders.search.search')}`}
                onSubmit={(value) => {
                  updateFilter({ orderNo: value });
                }}
                disabledButton={
                  !field.value && field.value === searchQuery.orderNo
                }
                showErrorMsg={false}
                {...field}
              />
            )}
          />
        </FormControl>
      </Box>
    </Box>
  );
}

export default OrderSearchView;
