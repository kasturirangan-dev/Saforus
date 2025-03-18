import { Box, styled, ButtonBase } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { useSnapshot } from 'valtio';
import { ApiDashboardStore } from '@web-workspace/api-bo/components/dashboard/data';
import { PurpleButton } from '@web-workspace/shared/components/widgets/button';
import { useCallback, useMemo, useState } from 'react';
import i18next from 'i18next';
import { sub } from 'date-fns';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';

const Label = styled('label')({
  display: 'block',
  paddingBottom: '0.5rem',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  color: 'var(--gray-700)',
});

const BoxField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export function DashboardFilter() {
  const { t } = useTranslation();
  const { tzDisplayOffset } = useSnapshot(CsApiBoAuthStore);

  const { apiKeys, searchQuery, userIds, setSearchQuery } =
    useSnapshot(ApiDashboardStore);
  const [startDate, setStartDate] = useState(sub(new Date(), { days: 29 }));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const allKeysOption = useMemo(
    () => ({
      label: t('apiDashboard.filter.all'),
      value: 'all',
    }),
    [i18next.language]
  );

  const noSelection = useMemo(
    () => ({
      label: 'Select Username/Account ID',
      value: 'none',
    }),
    [i18next.language]
  );

  const clearFilters = useCallback(() => {
    const currentDate = new Date();
    const newEndDate = new Date();
    const newStartDate = sub(currentDate, { days: 29 });
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedId(null);
    setApiKey(null);
    setSearchQuery({
      startDate: newStartDate,
      endDate: newEndDate,
      userId: null,
      apiKey: null,
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}
    >
      <BoxField>
        <Label sx={{ fontWeight: 500 }}>{t('apiDashboard.filter.date')}</Label>
        <DateRangePicker
          value={[startDate, endDate]}
          onChange={(dateRange) => {
            if (dateRange[0] && dateRange[1]) {
              setStartDate(dateRange[0]);
              setEndDate(dateRange[1]);
            }
          }}
          tzOffset={tzDisplayOffset}
        />
      </BoxField>
      <BoxField>
        <Label sx={{ fontWeight: 500 }}>Account ID/Username</Label>
        <Autocomplete
          options={userIds ? [noSelection, ...userIds] : [noSelection]}
          inputStyle={{
            width: '250px',
          }}
          defaultValue={noSelection}
          value={selectedId || noSelection.value}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          onChange={(event, newValue) => {
            const id = newValue?.value === 'none' ? null : String(newValue?.value)
            setSelectedId(id);
            setSearchQuery({
              userId: id,
            });
          }}
          showErrorMsg={false}
        />
      </BoxField>

      <BoxField sx={{ flex: 1, minWidth: '250px', maxWidth: '500px' }}>
        <Label sx={{ fontWeight: 500 }}>
          {t('apiDashboard.filter.api-key')}
        </Label>
        <Autocomplete
          options={[allKeysOption, ...apiKeys]}
          inputStyle={{ width: '100%' }}
          defaultValue={allKeysOption}
          value={apiKey || allKeysOption.value}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          onChange={(event, newValue) => {
            setApiKey(
              newValue?.value === 'all' ? null : String(newValue?.value)
            );
          }}
          showErrorMsg={false}
        />
      </BoxField>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <PurpleButton
          sx={{ height: '38px' }}
          onClick={() =>
            setSearchQuery({
              startDate,
              endDate,
              apiKey,
              userId: selectedId,
            })
          }
        >
          Apply
        </PurpleButton>
        <ButtonBase
          sx={{
            height: '38px',
            fontWeight: '600',
            fontSize: '15px',
            color: 'var(--gray-50)',
          }}
          onClick={clearFilters}
        >
          Reset Filters
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default DashboardFilter;
