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
import { useNavigate } from 'react-router-dom';

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

type SentEmailViewProps = {
  loading: boolean;
  userInfo: any;
  onSubmit: () => void;
  blocked?: boolean;
  failed?: boolean;
  isResetCapacityReached?: boolean;
};

const SentEmailView: React.FC<SentEmailViewProps> = ({
  loading,
  userInfo,
  onSubmit,
  blocked,
  failed,
  isResetCapacityReached,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const handleFirstButtonClick = () => {
    if (!failed) {
      navigate(ROUTES.LOGIN.path);
    }
  };

  const handleContactSupportClick = () => {
    window.open(linkSupport, '_blank');
  };

  return (
    <Box
      border="1px solid var(--neutral-750)"
      boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.04)"
      minWidth="400px"
      maxWidth="400px"
      padding="24px"
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      gap={6}
    >
      <Box>
        <img
          src={Logo}
          alt="SaForus Logo"
          title="Logo Glyphs"
          width="32"
          height="32"
          loading="lazy"
        />
      </Box>
      {/* CONTENT: */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          {failed ? (
            <Box>
              {i18next.language === 'ko' ? (
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    lineHeight: '1.75rem',
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
        <Box display="flex" flexDirection="column" textAlign="center" gap={6}>
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
          <Text>
            {t(
              failed
                ? 'page-reset.dialog.content-failed-description-2'
                : 'page-reset.dialog.content-description-2'
            )}
          </Text>
          {(blocked || isResetCapacityReached) && (
            <Text
              sx={{
                color: 'var(--purple-400)',
              }}
            >
              {t('page-reset.dialog.blocked-sending-email')}
            </Text>
          )}
        </Box>
      </Box>

      {/* FOOTER */}
      <Box display="flex" flexDirection="column" gap={4}>
        {blocked || isResetCapacityReached || (
          <Button
            onClick={() => handleFirstButtonClick()}
            fullWidth
            color="primary"
            sx={{ height: 46 }}
          >
            {t(failed ? 'page-reset.dialog.back-to-reset' : 'button.log-in')}
          </Button>
        )}
        {!(blocked || failed || isResetCapacityReached) && (
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
        {(blocked || failed || isResetCapacityReached) && (
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
    </Box>
  );
};

export default SentEmailView;
