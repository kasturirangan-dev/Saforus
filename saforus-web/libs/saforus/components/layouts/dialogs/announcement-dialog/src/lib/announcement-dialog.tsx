import React from 'react';
// import Dialog from '@mui/material/Dialog';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import Banner from './assets/banner.svg';
import Logo from './assets/Logo.svg';

type AnnouncementDialogProps = {
  onClose: () => void;
  dontShowDialog: (duration: string) => void;
};

const AnnouncementDialog: React.FC<AnnouncementDialogProps> = ({
  onClose,
  dontShowDialog,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '12px',
          border: '1px solid var(--neutral-750)',
          padding: 0,
        },
      }}
      dialogContent={
        <Box
          sx={{
            width: '440px',
            textAlign: 'left',
            overflow: 'hidden',
            padding: 0,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={Banner} // Replace with your uploaded image's path
              alt="Dialog Banner"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            {/* Close Button on Top-Right */}
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'var(--neutral-500)',
                ':hover': {
                  backgroundColor: 'var(--neutral-500)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: '12px',
              width: '100%',
              maxWidth: '440px',
              textAlign: 'left',
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: '80',
                height: '30',
                display: 'block',
                marginBottom: '1rem',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '20px',
                marginBottom: '1rem',
                fontWeight: 600,
                lineHeight: '28px',
                whiteSpace: 'pre-line',
              }}
            >
              {t('announcement-dialog.title')}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '18px',
                marginBottom: '1rem',
              }}
            >
              {t('announcement-dialog.greeting')}
            </Typography>
            {i18n.language === 'en' ? (
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  marginBottom: '1rem',
                }}
              >
                {t('announcement-dialog.description1')}{' '}
                <span style={{ color: 'var(--purple-600)', fontWeight: 600 }}>
                  {t('announcement-dialog.date')}
                </span>{' '}
                {t('announcement-dialog.description2')}
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  marginBottom: '1rem',
                  whiteSpace: 'pre-line',
                }}
              >
                <span style={{ color: 'var(--purple-600)', fontWeight: 700 }}>
                  {t('announcement-dialog.date')}
                </span>{' '}
                {t('announcement-dialog.description1')}{' '}
                {t('announcement-dialog.date')}{' '}
                {t('announcement-dialog.description2')}
              </Typography>
            )}

            {i18n.language === 'en' && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  marginBottom: '1rem',
                }}
              >
                {t('announcement-dialog.note')}
                <ul style={{ padding: '0 0 0 20px', margin: 0 }}>
                  <li>
                    <strong>{t('announcement-dialog.list-item1')}</strong>{' '}
                    {t('announcement-dialog.list-item1-desc')}
                  </li>
                  <li>
                    <strong>{t('announcement-dialog.list-item2')}</strong>{' '}
                    {t('announcement-dialog.list-item2-desc')}
                  </li>
                </ul>
              </Typography>
            )}

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '18px',
                marginBottom: '1rem',
                whiteSpace: 'pre-line',
              }}
            >
              {t('announcement-dialog.apology')}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '18px',
                whiteSpace: 'pre-line',
              }}
            >
              {t('announcement-dialog.regards')}
            </Typography>
          </Box>
          {/* Divider Line */}
          <Box
            sx={{
              height: '1px',
              backgroundColor: 'var(--neutral-500)',
              margin: '0 12px',
            }}
          />

          {/* Footer Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2px 4px',
              marginBottom: '6px',
            }}
          >
            <Button
              onClick={() => {
                dontShowDialog('1day');
                onClose();
              }}
              sx={{
                textTransform: 'none',
                fontSize: '13px',
                color: 'var(--purple-600)',
                fontWeight: 600,
              }}
            >
              {t('announcement-dialog.button.dontshowtoday')}
            </Button>
          </Box>
        </Box>
      }
      contentCss={{ padding: 0 }}
    ></Dialog>
  );
};

export default AnnouncementDialog;
