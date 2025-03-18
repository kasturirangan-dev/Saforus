import { Box, Button, FormControl, Divider, Typography } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSnapshot } from 'valtio';
import {
  PiracyOrderStore,
  ServiceFieldValues,
  RequestPiracyOrder,
} from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import Select from '@web-workspace/shared/components/widgets/select';
import CommonStore from '@web-workspace/saforus/common/data';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import _ from 'lodash-es';
import { BoxField, Label } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { Controller, useForm } from 'react-hook-form';
import InputButton from '@web-workspace/shared/components/widgets/input-button';

function PiracyOrderSearchView() {
  const { t } = useTranslation();

  const tzOffset = getMinuteOffset();
  const { searchQuery, setSearchQuery, resetPiracyOrderStore } =
    useSnapshot(PiracyOrderStore);
  const { formatTypeList: formats } = useSnapshot(CommonStore);

  const { getValues, control, reset } = useForm<Partial<ServiceFieldValues>>({
    defaultValues: { orderNo: searchQuery.orderNo },
  });

  const updateFilter = (data?: Partial<RequestPiracyOrder>) => {
    const formValues = getValues();
    setSearchQuery({ ...data, ...formValues });
  };

  const handleReset = () => {
    reset({ orderNo: '' });
    resetPiracyOrderStore();
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
          {t('piracy-order-view.search.title')}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={handleReset}
          variant="text"
          sx={{ color: 'var(--purple-400)', textTransform: 'none' }}
          startIcon={<Icon name="reset" color="var(--purple-400)" size={16} />}
        >
          {t('piracy-order-view.search.reset')}
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
            title={`${t('piracy-order-view.search.format')}`}
            options={formats}
            value={searchQuery?.format}
            onChange={(event) => {
              setSearchQuery({ format: event.target.value as string });
            }}
            showErrorMsg={false}
          />
        </BoxField>
        <BoxField>
          <Label>{t('piracy-order-view.search.requested')}</Label>
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
                {...field}
                showErrorMsg={false}
              />
            )}
          />
        </FormControl>
      </Box>
    </Box>
  );
}

export default memo(PiracyOrderSearchView);
