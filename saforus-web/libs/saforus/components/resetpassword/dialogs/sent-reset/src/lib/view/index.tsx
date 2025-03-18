import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Logo from '../assets/LogoGlyphs.svg';
import CloseIcon from '../assets/CloseCross.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { Box, ButtonBase, Typography, styled } from '@mui/material';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

const Text = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-50)' : 'var(--neutral-50)',
  textAlign: 'center',
  wordWrap: 'inherit',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: '400',
  letterSpacing: '-0.1px',
}));

type SentEmailDialogViewProps = {
  onClose: () => void;
  loading: boolean;
  userInfo: any;
  navigate: any;
  onSubmit: () => void;
  blocked?: boolean;
  failed?: boolean;
};

const SentEmailDialogView: React.FC<SentEmailDialogViewProps> = ({
  onClose,
  loading,
  userInfo,
  navigate,
  onSubmit,
  blocked,
  failed,
}) => {
  const { t } = useTranslation();
  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const handleFirstButtonClick = () => {
    if (!failed) {
      navigate(ROUTES.LOGIN.path);
    }
    onClose();
  };

  const handleContactSupportClick = () => {
    window.open(linkSupport, '_blank');
  };

  const renderContent = () => {
    return (
      <Box>
        <Box sx={{ paddingBottom: 2 }}>
          {failed ? (
            <Box>
              {i18next.language === 'ko' ? (
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: '500',
                    letterSpacing: '-0.02em',
                    color: 'var(--gray-700)',
                  }}
                >
                  {userInfo.email || ''} <br />
                  {t('page-reset.dialog.title-reset-email-failed')}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: '500',
                    letterSpacing: '-0.02em',
                    color: 'var(--gray-700)',
                  }}
                >
                  {t('page-reset.dialog.title-reset-email-failed', {
                    email: userInfo.email || '',
                  })}
                </Typography>
              )}
            </Box>
          ) : (
            <Box>
              {i18next.language === 'ko' ? (
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: '500',
                    letterSpacing: '-0.02em',
                    color: 'var(--gray-700)',
                  }}
                >
                  {`'${userInfo.email || ''}'${t('page-reset.dialog.via')}`}{' '}
                  <br />
                  {t('page-reset.dialog.title-reset-email')}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: '500',
                    letterSpacing: '-0.02em',
                    color: 'var(--gray-700)',
                  }}
                >
                  {t('page-reset.dialog.title-reset-email', {
                    email: userInfo.email || '',
                  })}
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {i18next.language === 'ko' ? (
            <Box>
              <Text>
                {t(
                  failed
                    ? 'page-reset.dialog.content-failed-description-1'
                    : 'page-reset.dialog.content-description-1'
                )}
              </Text>
              <Text>{t('page-reset.dialog.content-description-1-1')}</Text>
            </Box>
          ) : (
            <Text>
              {t(
                failed
                  ? 'page-reset.dialog.content-failed-description-1'
                  : 'page-reset.dialog.content-description-1'
              )}
            </Text>
          )}
          <Text
            sx={{
              marginTop: '16px',
            }}
          >
            {t(
              failed
                ? 'page-reset.dialog.content-failed-description-2'
                : 'page-reset.dialog.content-description-2'
            )}
          </Text>
          {blocked && (
            <Text
              sx={{
                marginTop: '16px',
                color: 'var(--purple-400)',
              }}
            >
              {t('page-reset.dialog.blocked-sending-email')}
            </Text>
          )}
        </Box>
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
        }}
      >
        {blocked || (
          <Button
            onClick={() => handleFirstButtonClick()}
            fullWidth
            color="primary"
            sx={{ height: 46 }}
          >
            {t(failed ? 'page-reset.dialog.back-to-reset' : 'button.log-in')}
          </Button>
        )}
        {!(blocked || failed) && (
          <LoadingButton
            onClick={onSubmit}
            fullWidth
            sx={{ height: 46 }}
            color="secondary"
            loading={loading}
            type="submit"
          >
            {t(
              failed
                ? 'page-reset.dialog.back-to-reset'
                : 'page-reset.resent-email'
            )}
          </LoadingButton>
        )}
        {(blocked || failed) && (
          <Button
            onClick={() => handleContactSupportClick()}
            fullWidth
            color="secondary"
            sx={{ height: 46 }}
          >
            {t('page-reset.dialog.contact-support')}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '1.5rem',
        },
      }}
      icon={
        <img
          src={Logo}
          alt="SaForus Logo"
          title="Logo Glyphs"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      rightIcon={
        <ButtonBase onClick={() => onClose()}>
          <img
            src={CloseIcon}
            alt="close icon"
            width="24"
            height="24"
            loading="lazy"
          />
        </ButtonBase>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      open
      onClose={() => onClose()}
      footer={renderFooter()}
      dialogContent={renderContent()}
      contentCss={{
        paddingBottom: '24px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default SentEmailDialogView;
