import { Alert, Box, Link, Typography, styled } from '@mui/material';
import AlertIcon from '../assets/alert.svg';
import { useTranslation } from 'react-i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export default function Register() {
  const Container = styled(Box)({
    minHeight: '283px',
    width: '100%',
  });

  const StyledAlert = styled(Alert)`
    background: var(--neutral-25);
    border: 1.5px solid var(--blue-400);
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

  const { t } = useTranslation();

  return (
    <Container>
      <StyledAlert
        icon={
          <img
            src={AlertIcon}
            alt="Warning"
            title="Warning"
            width={20}
            height={22}
            loading="lazy"
          />
        }
      >
        <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
          <Typography
            variant="subtitle2"
            color={'var(--gray-600)'}
            fontWeight="normal"
          >
            {t('boLogin.sign-up.title')}
          </Typography>
          <Box>
            <Typography
              variant="body2"
              color={'var(--gray-50)'}
              fontWeight="normal"
              display="inline"
            >
              {t('boLogin.sign-up.fist-description.before-redirect-link')}{' '}
            </Typography>
            <Link
              href={getEnvVar('VITE_API_URL')}
              underline="none"
              color="primary"
              sx={{ fontWeight: 700 }}
              target="_blank"
              display="inline"
            >
              Saforus
            </Link>{' '}
            <Typography
              variant="body2"
              color={'var(--gray-50)'}
              fontWeight="normal"
              display="inline"
            >
              {t('boLogin.sign-up.fist-description.after-redirect-link')}{' '}
            </Typography>
            <Typography
              variant="body2"
              color={'var(--gray-50)'}
              fontWeight="normal"
            >
              {t('boLogin.sign-up.second-description')}
            </Typography>
          </Box>
        </Box>
      </StyledAlert>
    </Container>
  );
}
