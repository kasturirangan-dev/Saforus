import { styled, Box, Typography, Alert } from '@mui/material';
import Input from '@web-workspace/shared/components/widgets/input';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Button from '@web-workspace/shared/components/widgets/button';
import AlertIcon from './assets/alert.svg';
import { useNavigate } from 'react-router-dom';
import { pxToVw } from '@web-workspace/saforus/common/utils';

/* eslint-disable-next-line */
export interface ResetPasswordFormProps {}

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const navigate = useNavigate();

  const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  });

  
  const StyledAlert = styled(Alert)`
    background: var(--red-50);
    border: 1.5px solid var(--red-400);
    border-radius: 5px;
    padding: ${pxToVw(['13px', '24px'])};

    & .MuiAlert-message {
      font-weight: 400;
      font-size: ${pxToVw('14px')} !important;
      line-height: ${pxToVw('20px')};
      padding: 0;
      overflow: hidden;
    }

    & .MuiAlert-icon {
      padding: 0;
      margin-right: ${pxToVw('1rem')};
    }
  `;
  
  const StyledButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: pxToVw(30),
  });

  return (
    <Container>
      <Input
        style={{ width: '100%' }}
        label={'Email Address'}
        placeholder="Enter your email address"
      />

      <StyledAlert
        icon={
          <img
            src={AlertIcon}
            alt="Warning"
            title="Warning"
            width={pxToVw(20)}
            height={pxToVw(22)}
            loading="lazy"
          />
        }
      >
        <Box display={'flex'} flexDirection={'column'} gap={pxToVw('1rem')}>
          <Typography
            variant="subtitle2"
            color={'var(--gray-600)'}
            fontWeight="normal"
          >
            Unregistered or incorrect email address.
          </Typography>
          <Typography
            variant="body2"
            color={'var(--gray-50)'}
            fontWeight="normal"
          >
            Please check you typed it correctly, otherwise contact
            support@saforus.com.
          </Typography>
        </Box>
      </StyledAlert>

      <StyledButtonsContainer>
        <Button
          sx={{
            height: pxToVw(46),
            width: '50%',
            paddingTop: pxToVw('0.75rem'),
            paddingBottom: pxToVw('0.75rem'),
            marginTop: pxToVw('2rem'),
          }}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Go Back
        </Button>
        <LoadingButton
          sx={{
            height: pxToVw(46),
            width: '50%',
            paddingTop: pxToVw('0.75rem'),
            paddingBottom: pxToVw('0.75rem'),
            marginTop: pxToVw('2rem'),
          }}
          variant="contained"
          loading={false}
          // onClick={() => {}}
        >
          Reset Password
        </LoadingButton>
      </StyledButtonsContainer>
    </Container>
  );
}

export default ResetPasswordForm;
