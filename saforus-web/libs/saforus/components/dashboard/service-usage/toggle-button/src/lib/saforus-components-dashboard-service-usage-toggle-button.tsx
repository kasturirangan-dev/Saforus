import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography, styled } from '@mui/material';
import { DashboardServiceUsageStore } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { PeriodEnum } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { mockData } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  display: 'flex',
  padding: '0.5625rem 1.125rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.375rem',
  borderRadius: '0.3125rem',
  border: '1px solid var(--neutral-300)',
  '&:not(.Mui-selected)': {
    backgroundColor: 'var(--neutral-300)',
    color: 'var(--gray-50)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--base-white)',
    color: 'var(--gray-700)',
  },
}));

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  padding: '0.25rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  flexShrink: 0,
  border: '1px solid var(--neutral-600)',
  boderRadius: '0.3125rem',
  background: 'var(--neutral-300)',
}));

export default function ToggleButtons() {
  const snap = useSnapshot(DashboardServiceUsageStore);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: PeriodEnum
  ) => {
    DashboardServiceUsageStore.updatePeriod(newAlignment);
  };

  const { t } = useTranslation();

  return (
    <CustomToggleButtonGroup
      value={snap.period}
      exclusive
      onChange={handleAlignment}
    >
      <CustomToggleButton value={PeriodEnum.WEEKLY}>
        <Typography
          variant="body2"
          fontWeight={700}
          textTransform={'capitalize'}
        >
          {t('dashboard.service-usage.usage-by-period.weekly')}
        </Typography>
      </CustomToggleButton>
      <CustomToggleButton value={PeriodEnum.MONTHLY}>
        <Typography
          variant="body2"
          fontWeight={700}
          textTransform={'capitalize'}
        >
          {t('dashboard.service-usage.usage-by-period.monthly')}
        </Typography>
      </CustomToggleButton>
      <CustomToggleButton value={PeriodEnum.YEARLY}>
        <Typography
          variant="body2"
          fontWeight={700}
          textTransform={'capitalize'}
        >
          {t('dashboard.service-usage.usage-by-period.yearly')}
        </Typography>
      </CustomToggleButton>
    </CustomToggleButtonGroup>
  );
}
