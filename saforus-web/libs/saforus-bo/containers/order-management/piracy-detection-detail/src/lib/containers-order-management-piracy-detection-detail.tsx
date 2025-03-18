import { Box, Container, Typography, styled } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import PiracyOrderDetail, {
  useCurrentOrderingData,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/order-detail';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

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

export function ContainerOrderManagementPiracyDetectionDetail() {
  const { t } = useTranslation();
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { currentOrder } = useCurrentOrderingData();
  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);
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
            {t('piracy-order-view.order-detail.title', {
              orderNo: currentOrder?.orderNo,
            })}
          </Typography>
        </Box>
      </Box>
      <PiracyOrderDetail />
    </Container>
  );
}

export default ContainerOrderManagementPiracyDetectionDetail;
