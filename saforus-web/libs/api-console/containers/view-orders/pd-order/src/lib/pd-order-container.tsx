import { Box, Typography, styled } from '@mui/material';
import BreadcrumbComponent from '@web-workspace/api-console/components/view-orders/breadcrumb';
import PiracyOrderDetail from '@web-workspace/api-console/components/piracy-detection/view-order/order-detail';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@web-workspace/api-console/common/views';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyOrderDetailContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNavigateToOrderList = () => {
    navigate(API_ROUTES.VIEW_ORDERS.ROOT);
  };
  const breadcrumbData = [
    {
      title: 'apiOrderList.title',
      path: API_ROUTES.VIEW_ORDERS.ROOT,
    },
    {
      title: 'apiDetection.order-detail.title',
      path: '',
    },
  ];

  return (
    <BoxContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <BreadcrumbComponent breadcrumbData={breadcrumbData} />
        <PageTitle
          title={t('apiDetection.order-detail.title')}
          onBack={onNavigateToOrderList}
          sx={{
            paddingBottom: 0,
            borderBottom: 'none',
          }}
        >
          <Typography variant="body2" color="var(--gray-50)">
            {t('apiDetection.order-detail.description')}
          </Typography>
        </PageTitle>
      </Box>

      <PiracyOrderDetail />
    </BoxContainer>
  );
}

export default PiracyOrderDetailContainer;
