import OrderList from '@web-workspace/saforus/components/multi-drm/view-order/order-list';
import OrderSearch from '@web-workspace/saforus/components/multi-drm/view-order/order-search';
import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

const MultiDrmViewOrderContainer = () => {
  const { t } = useTranslation();
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Typography variant="h5">{t('view-order.title')}</Typography>
      <OrderSearch />
      <OrderList />
    </Container>
  );
};

export default MultiDrmViewOrderContainer;
