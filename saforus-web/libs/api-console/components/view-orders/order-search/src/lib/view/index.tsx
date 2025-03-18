import { Box, Button, Divider, Typography } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import {
  OrderStatus,
  ViewOrderQuery,
  ViewOrderStore,
  getMeta,
} from '@web-workspace/api-console/components/view-orders/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import _ from 'lodash-es';
import { BoxField, Label } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Select from '@web-workspace/shared/components/widgets/select';
import { Controller, useForm } from 'react-hook-form';
import InputButton from '@web-workspace/shared/components/widgets/input-button';
import { OrderType } from '@web-workspace/api-console/common/model';
import { useMemo } from 'react';

export function OrderSearchView() {
  const { t, i18n } = useTranslation();
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const { searchQuery, setSearchQuery, resetViewOrderStore } =
    useSnapshot(ViewOrderStore);

  const {
    orderTypeList,
    statusList: allStatus,
    formatList,
    channelList,
  } = useMemo(() => getMeta(i18n.language), [i18n.language]);

  const statusList = useMemo(() => {
    return searchQuery?.orderType === OrderType.DETECTION
      ? allStatus.filter(({ value }) => value !== OrderStatus.EXPIRED)
      : allStatus;
  }, [searchQuery?.orderType, allStatus]);

  const { getValues, control, reset } = useForm<Partial<ViewOrderQuery>>({
    defaultValues: { keyword: searchQuery.keyword },
  });

  const updateFilter = (data?: Partial<ViewOrderQuery>) => {
    const formValues = getValues();
    setSearchQuery({ ...data, ...formValues });
  };

  const handleReset = () => {
    reset({ keyword: '' }); // Reset the form state
    resetViewOrderStore(); // Reset the store state
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
          {t('apiOrderList.search.title')}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={handleReset}
          variant="text"
          sx={{ color: 'var(--purple-400)', textTransform: 'none' }}
          startIcon={<Icon name="reset" color="var(--purple-400)" size={16} />}
        >
          {t('apiOrderList.search.reset')}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: '12px',
          rowGap: '10px',
        }}
      >
        <Select
          title={`${t('apiOrderList.search.order-type')}`}
          options={orderTypeList}
          value={searchQuery?.orderType}
          onChange={(event: any) => {
            setSearchQuery({ orderType: event.target.value as string });
          }}
          showErrorMsg={false}
        />
        <Select
          title={`${t('apiOrderList.search.status')}`}
          options={statusList}
          value={searchQuery?.status}
          onChange={(event) => {
            setSearchQuery({ status: event.target.value as string });
          }}
          showErrorMsg={false}
        />
        <Select
          title={`${t('apiOrderList.search.format')}`}
          options={formatList}
          value={searchQuery?.format}
          onChange={(event) => {
            setSearchQuery({ format: event.target.value as string });
          }}
          showErrorMsg={false}
        />
        <BoxField>
          <Label>{t('apiOrderList.search.request-date')}</Label>
          <DateRangePicker
            inputStyle={{
              width: '100%',
            }}
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
          />
        </BoxField>
        <Select
          title={`${t('apiOrderList.search.channel')}`}
          options={channelList}
          value={searchQuery?.channel}
          onChange={(event) => {
            setSearchQuery({ channel: event.target.value as string });
          }}
          showErrorMsg={false}
        />
        <Controller
          name={'keyword'}
          control={control}
          render={({ field }) => (
            <InputButton
              label={`${t('apiOrderList.search.keyword')}`}
              placeholder={`${t('apiOrderList.search.keyword-placeholder')}`}
              btnTitle={`${t('apiOrderList.search.search')}`}
              onSubmit={(value) => {
                updateFilter({ keyword: value });
              }}
              disabledButton={
                !field.value && field.value === searchQuery.keyword
              }
              showErrorMsg={false}
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  );
}
