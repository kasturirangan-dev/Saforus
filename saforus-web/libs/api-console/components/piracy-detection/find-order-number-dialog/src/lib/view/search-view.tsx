import { memo } from 'react';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';
import _ from 'lodash-es';
import { BoxField, Label } from './styled-elements';
import { FindWtrOrderStore } from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { getMeta } from '@web-workspace/api-console/components/view-orders/data';
import Select from '@web-workspace/shared/components/widgets/select';

function FindOrderNumberSearchView() {
  const { t, i18n } = useTranslation();
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const { searchQuery, setSearchQuery, resetFindWtrOrderStore } =
    useSnapshot(FindWtrOrderStore);

  const { formatList } = getMeta(i18n.language);

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
          onClick={resetFindWtrOrderStore}
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
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: '12px',
        }}
      >
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
      </Box>
    </Box>
  );
}

export default memo(FindOrderNumberSearchView);
