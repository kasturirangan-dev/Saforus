import { Box, Typography } from '@mui/material';
import CardFeatureItem from './view/card-feature-item';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import InquiryIcon from './assets/InquiryIcon.svg';
import WatermarkIcon from './assets/WatermarkIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export function HelpContent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        background: 'url(image.png) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: '36px',
            lineHeight: '44px',
            letterSpacing: '-0.72px',
            color: 'var(--gray-700)',
          }}
        >
          {t('help.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            weight: '600',
            color: 'var(--gray-700)',
            marginTop: '1rem',
          }}
        >
          {t('help.content1')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            weight: '600',
            color: 'var(--gray-700)',
          }}
        >
          {t('help.content2')}
        </Typography>
        <Box sx={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
          <CardFeatureItem
            key={1}
            icon={
              <img
                src={WatermarkIcon}
                alt="Watermarking"
                title="Watermarking"
                width={32}
                height={32}
                loading="lazy"
              />
            }
            title={`${t('help.watermarking')}`}
            description={`${t('help.watermarking-desc')}`}
            onClickButton={() => {
              window.open(
                getEnvVar(
                  i18next.language === 'en'
                    ? 'VITE_TUTORIAL_URL'
                    : 'VITE_TUTORIAL_KO_URL'
                ),
                '_blank'
              );
            }}
            buttonTitle={`${t('help.see-tutorial')}`}
          />
          <CardFeatureItem
            icon={
              <img
                src={InquiryIcon}
                alt="Inquiry"
                title="InquiryIcon"
                width={32}
                height={32}
                loading="lazy"
              />
            }
            key={2}
            title={`${t('help.inquiry')}`}
            description={`${t('help.inquiry-desc')}`}
            onClickButton={() => {
              window.open(
                getEnvVar(
                  i18next.language === 'en'
                    ? 'VITE_SUPPORT_URL'
                    : 'VITE_SUPPORT_KO_URL'
                ),
                '_blank'
              );
            }}
            buttonTitle={`${t('help.send-inquiry')}`}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HelpContent;
