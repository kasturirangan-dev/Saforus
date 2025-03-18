import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  Typography,
} from '@mui/material';
import { NotificationType } from '@web-workspace/saforus-bo/components/service-management/notification-list/data';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import './index.scss';
import { hasTextContent } from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NotificationPreviewProps {
  type: string | undefined;
  title: string;
  imgSrc: string | undefined;
  description: string;
  isDoNotViewButtonShow: boolean;
}

export function NotificationPreview({
  type,
  title,
  imgSrc,
  description,
  isDoNotViewButtonShow,
}: NotificationPreviewProps) {
  const { t } = useTranslation();

  const [isEmptyDescription, setIsEmptyDescription] = useState(true);

  useEffect(() => {
    if (hasTextContent(description)) {
      setIsEmptyDescription(true);
    } else {
      setIsEmptyDescription(false);
    }
  }, [description]);

  return (
    <Box
      sx={{
        borderRadius: '10px',
        border: '1px solid var(--neutral-700)',
        background: 'var(--base-white)',
        padding: '32px 36px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <InputLabel
            color="primary"
            sx={{
              borderRadius: '5px',
              bgcolor:
                type === NotificationType.Notice
                  ? 'var(--purple-50)'
                  : type === NotificationType.Event
                  ? 'var(--green-50)'
                  : type === NotificationType.All
                  ? 'var(--neutral-300)'
                  : 'var(--neutral-300)',
              color:
                type === NotificationType.Notice
                  ? 'var(--purple-600)'
                  : type === NotificationType.Event
                  ? 'var(--green-700)'
                  : type === NotificationType.All
                  ? 'var(--gray-700)'
                  : 'var(--gray-700)',
              padding: '4px 12px 4px 12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              lineHeight: '1.25rem',
              height: 'fit-content',
            }}
          >
            {type === NotificationType.Notice &&
              t('serviceManagement.create-notification.notice')}
            {type === NotificationType.Event &&
              t('serviceManagement.create-notification.event')}
            {type === NotificationType.All &&
              t('serviceManagement.create-notification.all')}
          </InputLabel>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '1.5rem',
            marginBottom: '0.4rem',
            fontWeight: 500,
            color: 'var(--gray-700)',
            wordBreak: 'break-word'
          }}
        >
          {title === '' ? 'Enter your title.' : title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {imgSrc && (
            <img src={imgSrc} alt="avatar" width={450} height={250}></img>
          )}
        </Box>
        {isEmptyDescription ? (
          <ReactQuill className="preview-text" value={description} readOnly />
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem',
              fontWeight: 400,
              color: 'var(--gray-700)',
            }}
          >
            {'Enter your detail.'}
          </Typography>
        )}
        <FormControlLabel
          control={<Checkbox checked={isDoNotViewButtonShow} />}
          label={t(
            'serviceManagement.create-notification.button.do-not-view-day'
          )}
        />
      </Box>
    </Box>
  );
}

export default NotificationPreview;
