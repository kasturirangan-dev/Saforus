import { Box, styled } from '@mui/material';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import Select from '@web-workspace/shared/components/widgets/select';
import { useMemo } from 'react';
import { ChanelType } from '@web-workspace/api-console/common/model';

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
  const { tzDisplayOffset } = useSnapshot(CsApiAuthStore);
  const { apiKeys, searchQuery, setSearchQuery } =
    useSnapshot(ApiDashboardStore);
  const allKeysOption = useMemo(() => {
    return {
      label: t('apiDashboard.filter.all'),
      value: 'ALL',
    };
  }, [t]);

  const usageTypeOptions = useMemo(
    () => [
      { label: t('apiDashboard.filter.web-usage'), value: ChanelType.WEB },
      { label: t('apiDashboard.filter.api-usage'), value: ChanelType.API },
    ],
    [t]
  );

  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <BoxField>
        <Label sx={{ fontWeight: 500 }}>{t('apiDashboard.filter.date')}</Label>
        <DateRangePicker
          value={[
            searchQuery.startDate
              ? new Date(searchQuery.startDate)
              : new Date(),
            searchQuery.endDate ? new Date(searchQuery.endDate) : new Date(),
          ]}
          onChange={(dateRange) => {
            setSearchQuery({ startDate: dateRange[0], endDate: dateRange[1] });
          }}
          tzOffset={tzDisplayOffset}
          inputStyle={{ width: '300px' }}
        />
      </BoxField>
      <BoxField>
        <Label sx={{ fontWeight: 500 }}>
          {t('apiDashboard.filter.service')}
        </Label>
        <Select
          value={searchQuery?.usageType}
          onChange={(event: any) => {
            setSearchQuery({ usageType: event.target.value });
          }}
          options={usageTypeOptions}
          sx={{ width: '300px', backgroundColor: 'white' }}
          showErrorMsg={false}
        />
      </BoxField>
      {searchQuery?.usageType === 'API' && (
        <BoxField sx={{ flex: 1, maxWidth: '620px' }}>
          <Label sx={{ fontWeight: 500 }}>
            {t('apiDashboard.filter.api-key')}
          </Label>
          <Select
            value={searchQuery?.apiKey}
            onChange={(event: any) => {
              setSearchQuery({ apiKey: event.target.value });
            }}
            options={[allKeysOption, ...apiKeys]}
            showErrorMsg={false}
          />
        </BoxField>
      )}
    </Box>
  );
}

export default DashboardFilter;
