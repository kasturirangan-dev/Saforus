import {
  Box,
  Container,
  InputLabel,
  Menu,
  MenuItem,
  Typography,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiButton from '@mui/material/Button';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import Icon from '@web-workspace/shared/components/widgets/icon';
import {
  FormMode,
  // NotificationStatus,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useSnapshot } from 'valtio';
import CreateNotificationStore from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import ContainersEditNotificationPreview from '@web-workspace/saforus-bo/containers/service-management/edit-notification/notification-preview';
import ContainersEditNotificationForm from '@web-workspace/saforus-bo/containers/service-management/edit-notification/notification-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Button from '@web-workspace/shared/components/widgets/button';
import DotIcon from './assets/ico_dotsmenu_vert_black.svg';
import { useEditNotificationFormData } from '@web-workspace/saforus-bo/components/service-management/create-notification/form';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from './assets/delete-warning.svg';
import { useNotificationListData } from '@web-workspace/saforus-bo/components/service-management/notification-list/list';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const enum NotificationStatus {
  All = 'ALL',
  Publish = 'PUBLISH',
  Hide = 'HIDE',
}

export function PagesEditNotification() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { notificationForm, setFormStatus, resetState } = useSnapshot(
    CreateNotificationStore
  );

  const { deleteNotice } = useEditNotificationFormData();
  const { mutate: updateNoticeStatus, data } = useNotificationListData();

  // const { status } = notificationForm;

  const [notiStatus, setNotiStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState(0);
  const [noticeVersion, setNoticeVersion] = useState('');
  const [showOnPage, setShowOnPage] = useState('');

  useEffect(() => {
    setFormStatus(FormMode.Edit);
  }, []);
  // update ui when change status success
  useEffect(() => {
    if (data) {
      if (data.resultCode === 200) {
        setNotiStatus(currentStatus);
      }
    }
  }, [data]);

  useEffect(() => {
    if (notificationForm.status) {
      setNotiStatus(notificationForm.status);
    }
    if (notificationForm.id) {
      setId(notificationForm.id);
    }
    if (notificationForm.noticeVersion) {
      setNoticeVersion(notificationForm.noticeVersion);
    }
    if (notificationForm.showOnPage) {
      setShowOnPage(notificationForm.showOnPage);
    }
  }, [notificationForm]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShow = () => {
    updateNoticeStatus({
      id: id,
      status: NotificationStatus.Publish,
      noticeVersion: noticeVersion,
      showOnPage: showOnPage,
    });
    setCurrentStatus(NotificationStatus.Publish);
    setAnchorEl(null);
  };

  const handleHide = () => {
    updateNoticeStatus({
      id: id,
      status: NotificationStatus.Hide,
      noticeVersion: noticeVersion,
      showOnPage: showOnPage,
    });
    setCurrentStatus(NotificationStatus.Hide);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
    setAnchorEl(null);
  };

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <Typography variant="h5">{'Edit'}</Typography>
              {notiStatus !== '' && (
                <InputLabel
                  color="primary"
                  sx={{
                    borderRadius: '5px',
                    bgcolor:
                      notiStatus === NotificationStatus.Publish
                        ? 'var(--green-50)'
                        : 'var(--neutral-300)',
                    color:
                      notiStatus === NotificationStatus.Publish
                        ? 'var(--green-700)'
                        : 'var(--gray-700)',
                    padding: '4px 12px 4px 12px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    lineHeight: '1.25rem',
                    height: 'fit-content',
                  }}
                >
                  {notiStatus === NotificationStatus.Hide &&
                    t('serviceManagement.create-notification.button.hide')}
                  {notiStatus === NotificationStatus.Publish &&
                    t('serviceManagement.create-notification.button.publish')}
                </InputLabel>
              )}
            </Box>
            <Button
              color="secondary"
              onClick={handleClick}
              sx={{ padding: '12px' }}
            >
              <img src={DotIcon} alt="dot-icon" />
            </Button>
            <Menu
              id="edit-noti-status-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleShow}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Typography>
                    {t('serviceManagement.create-notification.button.publish')}
                  </Typography>
                  {notiStatus === NotificationStatus.Publish && (
                    <Icon name="check" size={16} />
                  )}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleHide}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Typography>
                    {t('serviceManagement.create-notification.button.hide')}
                  </Typography>
                  {notiStatus === NotificationStatus.Hide && (
                    <Icon name="check" size={16} />
                  )}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <Typography sx={{ color: 'var(--red-500)' }}>
                  {t('serviceManagement.create-notification.button.delete')}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <ContainersEditNotificationForm />
        </Box>
        <ContainersEditNotificationPreview />
        <Dialog
          PaperProps={{
            style: { border: '2px solid #FEB8AE' },
          }}
          open={openDeleteDialog}
          icon={
            <img
              src={DeleteWarning}
              alt="Warning"
              title="Warning"
              width="30"
              height="30"
              loading="lazy"
            />
          }
          footer={
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                gap: '1.5rem',
              }}
            >
              <Button
                fullWidth
                color="secondary"
                onClick={() => {
                  setOpenDeleteDialog(false);
                }}
              >
                {t('serviceManagement.create-notification.button.cancel')}
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={() => {
                  deleteNotice();
                  setOpenDeleteDialog(false);
                }}
              >
                {t('serviceManagement.create-notification.button.delete')}
              </Button>
            </Box>
          }
          footerCss={{
            width: '100%',
          }}
          iconCss={{
            display: 'flex',
            justifyContent: 'center',
          }}
          dialogContent={
            <Box
              sx={{
                width: 350,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '28px',
                  letterSpacing: '-0.4px',
                }}
              >
                {t('serviceManagement.create-notification.dialog.delete-title')}
              </Typography>
              <Typography
                align="center"
                variant="subtitle2"
                color={'var(--gray-50)'}
              >
                {t(
                  'serviceManagement.create-notification.dialog.delete-description'
                )}
              </Typography>
            </Box>
          }
          dialogCss={{
            width: '100%',
            height: 'auto',
            margin: 'auto',
            justifyContent: 'center',
          }}
        />
      </Box>
    </Container>
  );
}

export default PagesEditNotification;
