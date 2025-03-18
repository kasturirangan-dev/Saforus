import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import Button from '@web-workspace/shared/components/widgets/button';
import ContainersNotificationSearch from '@web-workspace/saforus-bo/containers/service-management/notification/search';
import ContainersNotificationList from '@web-workspace/saforus-bo/containers/service-management/notification/list';
import ContainersNotificationFilterer from '@web-workspace/saforus-bo/containers/service-management/notification/filterer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import PlusIcon from '../assets/ico_plus_black.svg';
import CreateNotificationStore, {
  FormMode,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';

export function PagesNotificationSearchAndList() {
  // hooks declaration area
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { setFormStatus } = useSnapshot(CreateNotificationStore);
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content', width: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const handleCreateNotice = () => {
    setFormStatus(FormMode.Create);
    navigate(
      BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children
        .CREATE_NEW_NOTICE.path
    );
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // overflow: 'hidden',
        // position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">
            {t('serviceManagement.notification-list.header')}
          </Typography>
          <ContainersNotificationSearch />
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '1.5rem',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--neutral-700)',
            background: 'var(--base-white)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">
              {t('serviceManagement.notification-list.title')}
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              sx={{
                display: 'flex',
                gap: '0.25rem',
                padding: '8px 12px',
              }}
              onClick={handleCreateNotice}
            >
              <img src={PlusIcon} alt="plus-icon" />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: 'var(--purple-600)',
                }}
              >
                {t(
                  'serviceManagement.notification-list.button.create-new-notice'
                )}
              </Typography>
            </Button>
          </Box>
          <ContainersNotificationFilterer />
          <ContainersNotificationList />
        </Box>
      </Box>
    </Container>
  );
}

export default PagesNotificationSearchAndList;
