import { Box, Typography, styled } from '@mui/material';
import BreadcrumbComponent from '@web-workspace/api-console/components/view-orders/breadcrumb';
import WtrOrderFile from '@web-workspace/api-console/components/watermarking/view-order/order-file';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@web-workspace/api-console/common/views';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function PiracyOrderDetailContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const onNavigateToWtrPage = () => {
    navigate(`${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/${orderId}`);
  };
  const breadcrumbData = [
    {
      title: 'apiOrderList.title',
      path: API_ROUTES.VIEW_ORDERS.ROOT,
    },
    {
      title: 'apiWatermarking.order-detail.title',
      path: `${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/${orderId}`,
    },
    {
      title: 'apiWatermarking.order-detail.order-file-title',
      path: '',
    },
  ];

  return (
    <BoxContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <BreadcrumbComponent breadcrumbData={breadcrumbData} />
        <PageTitle
          title={t('apiWatermarking.order-detail.order-file-title')}
          onBack={onNavigateToWtrPage}
          sx={{
            paddingBottom: 0,
            borderBottom: 'none',
          }}
        >
          <Typography variant="body2" color="var(--gray-50)">
            {t('apiWatermarking.order-detail.order-file-description')}
          </Typography>
        </PageTitle>
      </Box>
      <WtrOrderFile />
    </BoxContainer>
  );
}

export default PiracyOrderDetailContainer;
