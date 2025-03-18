import { Box, Typography, styled, useTheme } from '@mui/material';
import OrderDetail from '@web-workspace/saforus/components/forensic-watermarking/order-detail';
import SingleOrderDetail from '@web-workspace/saforus/components/forensic-watermarking-v2/order-detail';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import BreadcrumbComponent from '@web-workspace/saforus/components/forensic-watermarking/breadcrumb';
import { useSnapshot } from 'valtio';
import { ViewOrderStore } from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useEffect } from 'react';
import { ServiceViewOrderStore } from '@web-workspace/saforus/components/dashboard/view-order/data'; // Import the new store

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: pxToVw(30),
  fontWeight: '600',
  lineHeight: pxToVw('30px'),
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function OrderDetailContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { setSearchQuery } = useSnapshot(ViewOrderStore);
  const { setSearchQuery: setServiceViewOrderSearchQuery } = useSnapshot(
    ServiceViewOrderStore
  );
  const searchParams = new URLSearchParams(location.search);
  // orderInfoSq has been included if order only has one file
  const orderInfoSq = searchParams.get('personOrderInfoSq');

  const BreadcrumbOrderDetail = [
    {
      title: 'view-order.detail.breadcrumb.forensic-watermarking',
      path: `${ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path}`,
    },
    {
      title: 'view-order.detail.breadcrumb.view-orders',
      path: `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path}`,
    },
    {
      title: 'view-order.detail.breadcrumb.details',
      path: '',
    },
  ];

  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const stateData = location.state;
  // Combine setSearchQuery from both detail and list to avoid query default at store
  const onNavigateToOrderList = () => {
    const { dashboard, ...searchQuery } = stateData || {};
    if (dashboard) {
      setServiceViewOrderSearchQuery(searchQuery);
      navigate(ROUTES.DASHBOARD.SEARCH_ORDERS.path, { state: stateData });
    } else {
      setSearchQuery(searchQuery);
      navigate(ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path, {
        state: stateData,
      });
    }
  };

  return !orderInfoSq ? (
    <div>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box display="flex" alignItems="center" gap={4}>
            <StyledButton
              onClick={onNavigateToOrderList}
              variant={'text'}
              sx={{ minWidth: 'unset' }}
            >
              <Icon
                iconStyle={{ width: pxToVw('36px'), height: pxToVw('36px') }}
                name="arrow_left"
                color="var(--gray-50)"
              />
            </StyledButton>
            <Typography variant="h6" color="var(--gray-900)">
              Order Details
            </Typography>
          </Box>
          <BreadcrumbComponent
            BreadcrumbData={BreadcrumbOrderDetail}
          ></BreadcrumbComponent>
        </Box>
        <OrderDetail />
      </Box>
    </div>
  ) : (
    // View order detail with single file
    <BoxContainer>
      <PageTitle
        title={t('watermarked-order-detail.title')}
        onBack={stateData?.from === 'create-new-request' ? undefined : onNavigateToOrderList}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('watermarked-order-detail.description')}
        </Typography>
      </PageTitle>
      <SingleOrderDetail />
    </BoxContainer>
  );
}

export default OrderDetailContainer;
