import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export function ExpiredView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    window.open(getEnvVar('VITE_SUPPORT_URL'), '_blank');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '500px',
      }}
    >
      <Box
        sx={{
          color: 'var(--gray-900)',
          fontSize: '1.5rem',
          fontWeight: '700',
        }}
      >
        {t('dashboard.expired.title')}
      </Box>
      <Box
        sx={{
          color: 'var(--gray-900)',
          fontSize: '1.25rem',
          fontWeight: '500',
        }}
      >
        {t('dashboard.expired.description')}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingButton
          type="button"
          color={'secondary'}
          onClick={handleButtonClick}
        >
          {t('dashboard.contact-btn')}
        </LoadingButton>
        <LoadingButton
          type="button"
          onClick={() => {
            navigate(ROUTES.USER_INFO.SERVICE_PLAN.path);
          }}
        >
          {t('dashboard.view-service-plan-btn')}
        </LoadingButton>
      </Box>
    </Box>
  );
}
