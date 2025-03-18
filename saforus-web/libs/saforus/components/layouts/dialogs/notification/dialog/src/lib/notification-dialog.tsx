import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import CloseIcon from '@mui/icons-material/Close';
import NotificationStore, {
  NotificationType,
  PageShowNotification,
  useNotificationData,
} from '@web-workspace/saforus/components/layouts/dialogs/notification/data';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import './index.scss';
import {
  FeatureFlagStore,
  FeatureFlag,
} from '@web-workspace/shared/feature-flag';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

/* eslint-disable-next-line */
export interface NotificationDialogProps {
  onClose: () => void;
  locationPath: string;
}

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

export function NotificationDialog({
  onClose,
  locationPath,
}: NotificationDialogProps) {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const { featureFlags } = useSnapshot(FeatureFlagStore);
  const isEnableNotification = featureFlags?.[FeatureFlag.NOTIFICATION];

  const page = getNotificationPageKey(locationPath);
  const {
    setCurrentPage,
    notificationInfor,
    showNotification,
    hideTimeExpired,
    setShowBanner,
    setShowNotification,
    setHideNotificationTime,
  } = useSnapshot(NotificationStore);

  setCurrentPage(page);

  const { loading } = useNotificationData();

  useEffect(() => {
    if (notificationInfor.showOnPage) {
      if (
        !loading &&
        page === notificationInfor.showOnPage &&
        isEnableNotification &&
        showNotification &&
        !hideTimeExpired
      ) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    } else {
      setIsShow(false);
    }
  }, [loading, locationPath, notificationInfor, showNotification]);
  
  return (
    <Box>
      {isShow && (
        <Dialog
          PaperProps={{
            style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
          }}
          contentCss={{ margin: 'auto' }}
          rightIcon={
            <IconButton
              onClick={() => {
                onClose();
                setShowBanner(true);
                setShowNotification(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
          rightIconCss={{
            marginTop: '0.5rem',
            marginRight: '0.5rem',
          }}
          footer={
            <Box width={'100%'}>
              {notificationInfor.isHideAvailable && (
                <LoadingButton
                  fullWidth
                  color="secondary"
                  onClick={() => {
                    setHideNotificationTime();
                    onClose();
                  }}
                  sx={{ marginRight: 'auto', padding: '12px 18px' }}
                >
                  {t('button.hide-a-day')}
                </LoadingButton>
              )}
            </Box>
          }
          footerCss={{
            width: '100%',
          }}
          dialogContent={
            <Box
              sx={{
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  wrap: 'nowrap',
                }}
              >
                <InputLabel
                  color="primary"
                  sx={{
                    borderRadius: '5px',
                    bgcolor:
                      notificationInfor.type === NotificationType.Notice
                        ? 'var(--purple-50)'
                        : 'var(--green-50)',
                    color:
                      notificationInfor.type === NotificationType.Notice
                        ? 'var(--purple-600)'
                        : 'var(--green-700)',
                    padding: '4px 12px 4px 12px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    lineHeight: '1.25rem',
                  }}
                >
                  {notificationInfor.type === NotificationType.Notice &&
                    t('common.notice')}
                  {notificationInfor.type === NotificationType.Event &&
                    t('common.event')}
                </InputLabel>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: '1.5rem',
                  marginBottom: '0.4rem',
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                {notificationInfor.title}
              </Typography>
              {notificationInfor.imageSrc && (
                <img src={notificationInfor?.imageSrc} alt="avatar"></img>
              )}
              <ReactQuill
                className="preview-text"
                value={notificationInfor.description}
                readOnly
              />
            </Box>
          }
          dialogCss={{
            width: '100%',
            padding: '32px 36px',
            height: 'auto',
            margin: 'auto',
            justifyContent: 'center',
          }}
        />
      )}
    </Box>
  );
}

export default NotificationDialog;
