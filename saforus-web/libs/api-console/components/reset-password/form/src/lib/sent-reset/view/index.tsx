import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoGlyphs.svg';

const Text = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-50)',
  textAlign: 'center',
  wordWrap: 'inherit',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: '400',
  letterSpacing: '-0.1px',
}));

type SentEmailViewProps = {
  loading: boolean;
  userEmail: string;
  onSubmit: () => void;
  blocked?: boolean;
  failed?: boolean;
  isResetCapacityReached?: boolean;
};

const SentEmailView: React.FC<SentEmailViewProps> = ({
  loading,
  userEmail,
  onSubmit,
  blocked,
  failed,
  isResetCapacityReached,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFirstButtonClick = () => {
    navigate(ROUTES.LOGIN.path);
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
                {`'${userEmail}'${t('page-reset.dialog.via')}`} <br />
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
                  email: userEmail,
                })}
              </Typography>
            )}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="center" gap={6}>
          {i18next.language === 'ko' ? (
            <Box>
              <Text>{t('page-reset.dialog.content-description-1')}</Text>
              <Text>{t('page-reset.dialog.content-description-1-1')}</Text>
            </Box>
          ) : (
            <Text>{t('page-reset.dialog.content-description-1')}</Text>
          )}
          <Text>{t('page-reset.dialog.content-description-2')}</Text>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box display="flex" flexDirection="column" gap={4}>
        <LoadingButton
          onClick={() => handleFirstButtonClick()}
          fullWidth
          color="primary"
          sx={{ height: 46 }}
        >
          {t('button.log-in')}
        </LoadingButton>
        <LoadingButton
          onClick={onSubmit}
          fullWidth
          sx={{ height: 46 }}
          color="secondary"
          loading={loading}
          type="submit"
        >
          {t('page-reset.resent-email')}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default SentEmailView;
