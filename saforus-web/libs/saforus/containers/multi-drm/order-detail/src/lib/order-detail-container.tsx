import { Box, Container, Typography, styled } from '@mui/material';
import OrderDetail from '@web-workspace/saforus/components/multi-drm/order-detail';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import BreadcrumbComponent from '@web-workspace/saforus/components/forensic-watermarking/breadcrumb';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function OrderDetailContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  const parts = location.pathname.split('/');
  const orderNo = parts[parts.length - 1];
  const BreadcrumbOrderDetail = [
    {
      title: 'multiDrm.breadcrumb.multi-drm-watermarking',
      path: `${ROUTES.MULTI_DRM_PACKAGING.CREATE_ORDER.path}`,
    },
    {
      title: 'multiDrm.breadcrumb.view-orders',
      path: `${ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.path}`,
    },
    {
      title: 'multiDrm.breadcrumb.details',
      path: '',
    },
  ];
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            onClick={() => {
              window.history.back();
            }}
            variant={'text'}
          >
            <Icon
              iconStyle={{ marginRight: '6px' }}
              name="arrow_left"
              size={45}
              color="#5F6D7E"
            />
          </StyledButton>
          <Typography variant="h4">
            {t('page-watermarking.order-no', { orderNo })}
          </Typography>
        </Box>
        <BreadcrumbComponent
          BreadcrumbData={BreadcrumbOrderDetail}
        ></BreadcrumbComponent>
      </Box>
      <OrderDetail />
    </Container>
  );
}

export default OrderDetailContainer;
