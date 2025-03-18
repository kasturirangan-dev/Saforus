import { Box, Container, styled, Typography } from '@mui/material';
import BillingDetailHistoryView from '@web-workspace/saforus/components/user-info/billing-details/history';
import BillingDetailInfoView from '@web-workspace/saforus/components/user-info/billing-details/info';
import PlanInfo from '@web-workspace/saforus/components/user-info/billing-details/plan-info';
import Icon from '@web-workspace/shared/components/widgets/icon';
import BreadcrumbComponent from '@web-workspace/saforus/components/forensic-watermarking/breadcrumb';
import MuiButton from '@mui/material/Button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useTranslation } from 'react-i18next';
import { useBillingDetailData } from '@web-workspace/saforus/components/user-info/billing-details/data';

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
export function BillingDetailContainer() {
  const {
    isLoadSubscription,
    isLoadBilling,
    isLoadInvoices,
    setGetInvoiceActions,
    updateBillingAddress,
  } = useBillingDetailData();

  const { t } = useTranslation();
  const BreadcrumbBillDetail = [
    {
      title: 'billDetail.service-plan-bill',
      path: `${ROUTES.USER_INFO.SERVICE_PLAN.path}`,
    },
    {
      title: 'billDetail.title',
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
          <Typography variant="h4">{t('billDetail.title')}</Typography>
        </Box>
        <BreadcrumbComponent
          BreadcrumbData={BreadcrumbBillDetail}
        ></BreadcrumbComponent>
      </Box>
      <PlanInfo loading={isLoadSubscription} />
      <Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          mt: '1.5rem',
          alignItems: 'flex-start',
        }}
      >
        <BillingDetailInfoView loading={isLoadBilling} />
        <BillingDetailHistoryView
          loading={isLoadInvoices}
          setGetInvoiceActions={setGetInvoiceActions}
        />
      </Box>
    </Container>
  );
}

export default BillingDetailContainer;
