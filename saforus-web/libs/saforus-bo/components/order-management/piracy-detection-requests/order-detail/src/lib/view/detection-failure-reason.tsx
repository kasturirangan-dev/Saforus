import { Alert, Box, Typography, styled } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import AlertIcon from '../assets/alert.svg';
import Button from '@web-workspace/shared/components/widgets/button';
import Securityicon from '../assets/security.svg';
const StyledAlert = styled(Alert)`
  background: #f9f8fb;
  border: 1.5px solid #648ef7;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

const FailureReason: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledAlert
      sx={{
        marginTop: '1rem',
        border: '1.5px solid #FEB8AE',
        backgroundColor: 'var(--red-50)',
      }}
      severity="error"
      icon={
        <img
          src={AlertIcon}
          alt="Alert"
          title="Alert"
          width={20}
          height={22}
          loading="lazy"
        />
      }
    >
      <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
        <Typography
          sx={{
            fontFamily: 'Inter',
            color: 'var(--gray-700)',
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '28px',
            letterSpacing: '-0.4px',
          }}
        >
          {t('piracy-order-view.order-detail.failed-popup-title')}
        </Typography>
        <Typography variant="body2" color={'var(--gray-50)'}>
          <Trans i18nKey="piracy-order-view.order-detail.failed-popup-description" />
        </Typography>
        <Button
          color="secondary"
          startIcon={<img src={Securityicon} alt="" />}
          sx={{
            width: 'fit-content',
            padding: '0.75rem 1.125rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.375rem',
            marginBottom: '1rem',
          }}
        >
          {t('piracy-order-view.order-detail.failed-request-btn')}
        </Button>
      </Box>
    </StyledAlert>
  );
};

export default FailureReason;
