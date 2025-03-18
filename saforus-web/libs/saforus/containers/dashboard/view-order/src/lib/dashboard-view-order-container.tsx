import DashboardOrderList from '@web-workspace/saforus/components/dashboard/view-order/order-list';
import DashboardOrderSearch from '@web-workspace/saforus/components/dashboard/view-order/order-search';
import DashboardPiracyOrderList from '@web-workspace/saforus/components/dashboard/view-order/order-piracy-list';
import { Box, styled, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import {
  ServiceViewOrderStore,
  useServiceSearchViewOrderData,
} from '@web-workspace/saforus/components/dashboard/view-order/data';
import { ServiceType } from '@web-workspace/saforus/common/model';
import CommonStore from '@web-workspace/saforus/common/data';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

export function DashboardViewOrderContainer() {
  const { t } = useTranslation();
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { searchQuery, setSearchQuery, resetSearchQuery } = useSnapshot(
    ServiceViewOrderStore
  );

  const theme = useTheme();
  const location = useLocation();
  useEffect(() => {
    setResponsiveLayout(theme);
    if (location.state) {
      const { dashboard, ...searchQuery } = location.state;
      // Set initial values based on location.state
      setSearchQuery(searchQuery);
    }
    return () => {
      resetMainLayoutCss();
      resetSearchQuery();
    };
  }, []);

  const { isLoading } = useSnapshot(CommonStore);
  const { orderLoading, pdOrderLoading } = useServiceSearchViewOrderData();

  return (
    <BoxContainer>
      <LoadingOverLayer loading={isLoading} isTransparent />
      <PageTitle title={t('dashboard.search-orders.title')} />

      {!isLoading && <DashboardOrderSearch />}

      {(searchQuery.serviceType === ServiceType.ALL ||
        searchQuery.serviceType !== ServiceType.PIRACY_DETECTION) && (
        <DashboardOrderList loading={orderLoading} />
      )}
      {(searchQuery.serviceType === ServiceType.ALL ||
        searchQuery.serviceType === ServiceType.PIRACY_DETECTION) && (
        <DashboardPiracyOrderList loading={pdOrderLoading} />
      )}
    </BoxContainer>
  );
}

export default DashboardViewOrderContainer;
