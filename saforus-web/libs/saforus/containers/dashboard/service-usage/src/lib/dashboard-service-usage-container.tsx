import { Box, styled, Typography, useTheme } from '@mui/material';
import ServiceUsageView from '@web-workspace/saforus/components/dashboard/service-usage/service-usage';
import UsageByPeriod from '@web-workspace/saforus/components/dashboard/service-usage/usage-by-period';
import BillingOverview from '@web-workspace/saforus/components/dashboard/service-usage/billing-overview';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useDashboardData } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { useEffect } from 'react';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import DateRangePicker from '@web-workspace/shared/components/widgets/date-range-picker';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import { DashboardServiceUsageStore } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { PageTitle } from '@web-workspace/saforus/common/views';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: pxToVw('36px'),
}));

const GridBoxContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

export function DashboardServiceUsageContainer() {
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t } = useTranslation();
  const { loading, isServiceUsageLoading } = useDashboardData();

  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const tzOffset = getMinuteOffset();
  const { serviceUsageDate, updateServiceUsageDate } = useSnapshot(
    DashboardServiceUsageStore
  );

  return (
    <BoxContainer>
      <PageTitle
        title={t('dashboard.service-usage.title', {
          companyName: '',
        })}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <DateRangePicker
          value={[serviceUsageDate.startDate, serviceUsageDate.endDate]}
          onChange={(dateRange) => {
            updateServiceUsageDate({
              startDate: dateRange[0],
              endDate: dateRange[1],
            });
          }}
          tzOffset={tzOffset}
        />
      </PageTitle>

      <BillingOverview loading={isServiceUsageLoading} />
      <ServiceUsageView isServiceUsageLoading={isServiceUsageLoading} />
      <GridBoxContainer>
        <UsageByPeriod loading={loading} />
      </GridBoxContainer>
    </BoxContainer>
  );
}

export default DashboardServiceUsageContainer;
