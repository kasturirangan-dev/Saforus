import { Box, Container, Typography, styled } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import ContainersCreateNotificationForm from '@web-workspace/saforus-bo/containers/service-management/create-notification/notification-form';
import ContainersNotificationPreview from '@web-workspace/saforus-bo/containers/service-management/create-notification/notification-preview';
import { useNavigate } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { useSnapshot } from 'valtio';
import CreateNotificationStore, {
  FormMode,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useEffect } from 'react';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function PagesCreateNotification() {
  const navigate = useNavigate();
  const { setFormStatus, resetState } = useSnapshot(CreateNotificationStore);
  useEffect(() => {
    setFormStatus(FormMode.Create);
  }, []);
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1.5rem',
          padding: '3.125rem 2.8125rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton
              onClick={() => {
                resetState();
                navigate(
                  BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path
                );
              }}
            >
              <Icon
                iconStyle={{ marginRight: '6px' }}
                name="arrow_left"
                size={45}
                color="var(--gray-50)"
              />
            </StyledButton>
            <Typography variant="h5">{'Create a New Notice'}</Typography>
          </Box>
          <ContainersCreateNotificationForm />
        </Box>
        <ContainersNotificationPreview />
      </Box>
    </Container>
  );
}

export default PagesCreateNotification;
