import { Box, IconButton, InputLabel, Link, Typography } from '@mui/material';
import NotificationStore, {
  NotificationType,
  PageShowNotification,
  useNotificationData,
} from '@web-workspace/saforus/components/layouts/dialogs/notification/data';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import CloseIcon from '@mui/icons-material/Close';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  FeatureFlagStore,
  FeatureFlag,
} from '@web-workspace/shared/feature-flag';

function getNotificationPageKey(
  path: string
): PageShowNotification | undefined {
  switch (path) {
    case ROUTES.LOGIN.path:
      return PageShowNotification.Login;
    case ROUTES.DASHBOARD.PACKAGES_DELIVERY.path:
      return PageShowNotification.Dashboard;
    case ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path:
      return PageShowNotification.DigitalWatermarking;
    case ROUTES.PIRACY_DETECTION.NEW_REQUEST.path:
      return PageShowNotification.PiracyDetection;
    default:
      return undefined;
  }
}

export function NotificationBanner() {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const { featureFlags } = useSnapshot(FeatureFlagStore);

  const page = getNotificationPageKey(location.pathname);
  const { loading } = useNotificationData();
  const isEnableNotification = featureFlags?.[FeatureFlag.NOTIFICATION];

  const {
    notificationInfor,
    setShowBanner,
    showBanner,
    setShowNotification,
    setHideNotificationTime,
    hideTimeExpired,
  } = useSnapshot(NotificationStore);

  const { t } = useTranslation();
  useEffect(() => {
    if (notificationInfor.showOnPage) {
      if (
        page === notificationInfor.showOnPage &&
        isEnableNotification &&
        showBanner &&
        !hideTimeExpired
      ) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    } else {
      setIsShow(false);
    }
  }, [location, notificationInfor, showBanner]);

  if (isShow) {
    return (
      <Box
        sx={{
          display: 'flex',
          padding: '16px 56px',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--green-200)',
          height: 56,
        }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <InputLabel
            sx={{
              display: 'flex',
              padding: '2px 8px',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '5px',
              bgcolor:
                notificationInfor.type === NotificationType.Notice
                  ? 'var(--purple-50)'
                  : 'var(--green-50)',
              color:
                notificationInfor.type === NotificationType.Notice
                  ? 'var(--purple-600)'
                  : 'var(--green-700)',
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '18px',
              letterSpacing: '-0.1px',
            }}
          >
            {notificationInfor.type === NotificationType.Notice &&
              t('common.notice')}
            {notificationInfor.type === NotificationType.Event &&
              t('common.event')}
          </InputLabel>
          <Typography variant="subtitle1">{notificationInfor.title}</Typography>
          <Link
            onClick={() => {
              setShowBanner(false);
              setShowNotification(true);
              DialogStore.openDialog({
                name: DialogType.Notification,
                props: { locationPath: location.pathname },
              });
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textDecorationLine: 'underline',
                cursor: 'pointer',
                color: 'var(--gray-700)',
              }}
            >
              {t('common.read-more')}
            </Typography>
          </Link>
        </Box>
        <IconButton
          onClick={() => {
            setShowBanner(false);
            setHideNotificationTime();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }
  return null;
}

export default NotificationBanner;
