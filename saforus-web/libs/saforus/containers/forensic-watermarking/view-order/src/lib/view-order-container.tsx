import OrderList from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/order-list';
import OrderSearch from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/order-search';
import { Box, Typography, styled, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import {
  ViewOrderStore,
  useViewOrderingData,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { useLocation } from 'react-router-dom';
import CommonStore from '@web-workspace/saforus/common/data';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useTranslation } from 'react-i18next';

const BoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const ForensicWatermarkingViewOrderContainer = () => {
  const { t } = useTranslation();
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { resetWatermarkingOrderStore, setSearchQuery } =
    useSnapshot(ViewOrderStore);
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
      resetWatermarkingOrderStore();
    };
  }, []);

  const { isLoading } = useSnapshot(CommonStore);
  const { orderLoading } = useViewOrderingData();

  return (
    <BoxContainer>
      <LoadingOverLayer loading={isLoading} isTransparent />
      <PageTitle
        title={t('view-watermarked-order.title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('view-watermarked-order.description')}
        </Typography>
      </PageTitle>
      {!isLoading && <OrderSearch />}
      <div ref={orderListRef}>
        <OrderList loading={orderLoading} />
      </div>
    </BoxContainer>
  );
};

export default ForensicWatermarkingViewOrderContainer;
