import { styled, Box } from '@mui/material';
import { PageTitle } from '@web-workspace/api-console/common/views';
import { useTranslation } from 'react-i18next';
import { useViewOrderingData } from '@web-workspace/api-console/components/view-orders/data';
import OrderSearch from '@web-workspace/api-console/components/view-orders/order-search';
import OrderList from '@web-workspace/api-console/components/view-orders/order-list';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function OrderListContainer() {
  const { t } = useTranslation();
  const { orderLoading } = useViewOrderingData();
  // View order reset search query is handled in the MainLayout

  return (
    <BoxContainer>
      <PageTitle
        title={t('apiOrderList.title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      />
      <OrderSearch />
      <OrderList loading={orderLoading} />
    </BoxContainer>
  );
}

export default OrderListContainer;
