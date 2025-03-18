import { Box, Typography, styled } from '@mui/material';
import ResetPasswordForm from '@web-workspace/saforus-bo/components/resetpassword';

export default function ResetPasswordView() {
  const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '60px',
    gap: '2rem',
  }));

  const InnerContainer = styled(Box)(({ theme }) => ({
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  }));

  return (
    <Container>
      <Typography variant="h1" color={'var(--gray-600)'}>
        We Are SaForus
      </Typography>
      <InnerContainer>
        <Typography variant="h4" color={'var(--gray-600)'} fontWeight="normal">
          Back Office
        </Typography>
        <Typography
          variant="subtitle1"
          color={'var(--gray-50)'}
          fontWeight="normal"
        >
          Enter your email address to reset your password
        </Typography>
        <ResetPasswordForm />
      </InnerContainer>
    </Container>
  );
}
