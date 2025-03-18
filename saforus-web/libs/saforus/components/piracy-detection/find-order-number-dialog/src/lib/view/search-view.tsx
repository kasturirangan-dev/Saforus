import { memo } from 'react';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';
import CommonStore from '@web-workspace/saforus/common/data';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import _ from 'lodash-es';
import Select from '@web-workspace/shared/components/widgets/select';
import { BoxField, Label } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';

function FindOrderNumberSearchView() {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { searchQuery, setSearchQuery, resetWatermarkingOrderStore } =
    useSnapshot(FindWtrOrderStore);
  const { formatTypeList: formats } = useSnapshot(CommonStore);

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography
          fontSize="20px"
          fontWeight={700}
          lineHeight="28px"
          color={'var(--gray-700)'}
        >
          {t('find-order-number.filter')}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={resetWatermarkingOrderStore}
          variant="text"
          sx={{ color: 'var(--purple-400)', textTransform: 'none' }}
          startIcon={<Icon name="reset" color="var(--purple-400)" size={16} />}
        >
          {t('find-order-number.reset')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Select
          title={`${t('view-watermarked-order.search.format')}`}
          options={formats}
          inputStyle={{
            width: '200px',
          }}
          value={searchQuery?.format}
          onChange={(event) => {
            setSearchQuery({ format: event.target.value as string });
          }}
          showErrorMsg={false}
        />

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
          />
        </BoxField>
      </Box>
    </Box>
  );
}

export default memo(FindOrderNumberSearchView);
