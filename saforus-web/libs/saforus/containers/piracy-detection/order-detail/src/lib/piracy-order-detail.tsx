import { Box, Typography, styled, useTheme } from '@mui/material';
import PiracyOrderDetail from '@web-workspace/saforus/components/piracy-detection/view-order/order-detail';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { PiracyOrderStore } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { ServiceViewOrderStore } from '@web-workspace/saforus/components/dashboard/view-order/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyOrderDetailContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { setSearchQuery } = useSnapshot(PiracyOrderStore);
  const { setSearchQuery: setServiceViewOrderSearchQuery } = useSnapshot(
    ServiceViewOrderStore
  );

  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const stateData = location.state;
  const onNavigateBack = () => {
    const { dashboard, ...searchQuery } = stateData || {};
    if (dashboard) {
      setServiceViewOrderSearchQuery(searchQuery);
      navigate(ROUTES.DASHBOARD.SEARCH_ORDERS.path, { state: stateData });
    } else {
      setSearchQuery(searchQuery);
      navigate(ROUTES.PIRACY_DETECTION.VIEW_ORDER.path, {
        state: stateData,
      });
    }
  };
  return (
    <BoxContainer>
      <PageTitle
        title={t('piracy-order-view.order-detail.title')}
        onBack={stateData?.from === 'create-new-request' ? undefined : onNavigateBack}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('piracy-order-view.order-detail.header-description')}
        </Typography>
      </PageTitle>
      <PiracyOrderDetail />
    </BoxContainer>
  );
}

export default PiracyOrderDetailContainer;
