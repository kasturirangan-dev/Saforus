import { Box, Button, Divider, FormControl, Typography } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSnapshot } from 'valtio';
import {
  RequestServiceViewOrder,
  ServiceFieldValues,
  ServiceViewOrderStore,
} from '@web-workspace/saforus/components/dashboard/view-order/data';
import Select from '@web-workspace/shared/components/widgets/select';
import CommonStore from '@web-workspace/saforus/common/data';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { BoxField, Label } from './styled-elements';
import { Controller, useForm } from 'react-hook-form';
import InputButton from '@web-workspace/shared/components/widgets/input-button';

function DashboardOrderSearchView() {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { searchQuery, setSearchQuery, resetSearchQuery } = useSnapshot(
    ServiceViewOrderStore
  );
  const { formatTypeList: formats } = useSnapshot(CommonStore);

  const { getValues, control, reset } = useForm<Partial<ServiceFieldValues>>({
    defaultValues: { orderNo: searchQuery.orderNo },
  });

  const updateFilter = (data?: Partial<RequestServiceViewOrder>) => {
    const formValues = getValues();
    setSearchQuery({ ...data, ...formValues });
  };

  const handleReset = () => {
    reset({ orderNo: '' }); // Reset the form state
    resetSearchQuery(); // Reset the store state
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography
          fontSize="20px"
          fontWeight={700}
          lineHeight="28px"
          color={'var(--gray-700)'}
        >
          {t('dashboard.search-orders.search.title')}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={handleReset}
          variant="text"
          sx={{ color: 'var(--purple-400)', textTransform: 'none' }}
          startIcon={<Icon name="reset" color="var(--purple-400)" size={16} />}
        >
          {t('dashboard.search-orders.search.reset')}
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
          <Label>{t('dashboard.search-orders.search.requested')}</Label>
          <DateRangePicker
            value={[
              searchQuery.startDate
                ? new Date(searchQuery.startDate)
                : new Date(),
              searchQuery.endDate ? new Date(searchQuery.endDate) : new Date(),
            ]}
            onChange={(dateRange) => {
              updateFilter({
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

export default memo(DashboardOrderSearchView);
