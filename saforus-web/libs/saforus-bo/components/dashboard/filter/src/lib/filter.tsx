import { Box, Typography, styled } from '@mui/material';
import { AdminDashboardStore } from '@web-workspace/saforus-bo/components/dashboard/data';

import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';

const Label = styled('label')({
  display: 'block',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  color: 'var(--gray-700)',
});

const BoxField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const DashboardFilter: React.FC = () => {
  const { t } = useTranslation();
  const { serviceUsageDate, updateServiceUsageDate } =
    useSnapshot(AdminDashboardStore);

  return (
    <BoxField>
      <Label>{t('adminDashboard.filters.date')}</Label>
      <DateRangePicker
        value={[serviceUsageDate.startDate, serviceUsageDate.endDate]}
        onChange={(dateRange) => {
          updateServiceUsageDate({
            startDate: dateRange[0],
            endDate: dateRange[1],
          });
        }}
        tzOffset={0}
      />
    </BoxField>
  );
};
export default DashboardFilter;
