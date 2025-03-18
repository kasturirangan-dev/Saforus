import PiracyOrderList from '@web-workspace/saforus/components/piracy-detection/view-order/order-list';
import PiracyOrderSearch from '@web-workspace/saforus/components/piracy-detection/view-order/order-search';
import { useTheme, styled, Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import CommonStore from '@web-workspace/saforus/common/data';
import {
  PiracyOrderStore,
  usePiracyViewOrderingData,
} from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyViewOrderContainer() {
  const { t } = useTranslation();
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { resetPiracyOrderStore, setSearchQuery } =
    useSnapshot(PiracyOrderStore);
  const orderListRef = useRef<HTMLDivElement>(null);

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
      resetPiracyOrderStore();
      resetPiracyOrderStore();
    };
  }, []);

  const { isLoading } = useSnapshot(CommonStore);
  const { orderLoading } = usePiracyViewOrderingData();

  return (
    <BoxContainer>
      <LoadingOverLayer loading={isLoading} isTransparent />
      <PageTitle
        title={t('piracy-order-view.header-title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('piracy-order-view.header-description')}
        </Typography>
      </PageTitle>
      {!isLoading && <PiracyOrderSearch />}
      <div ref={orderListRef}>
        <PiracyOrderList loading={orderLoading} />
      </div>
    </BoxContainer>
  );
}

export default PiracyViewOrderContainer;
