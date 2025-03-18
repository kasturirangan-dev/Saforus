import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

export function NoActiveView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.37rem' }}>
      {t('dashboard.no-active.title')}
      <Box>
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
