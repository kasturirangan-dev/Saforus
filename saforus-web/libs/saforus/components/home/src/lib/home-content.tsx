import { Box, Typography } from '@mui/material';
import CardFeatureItem from './view/card-feature-item';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import UserIcon from './assets/UserIcon.svg';
import WatermarkIcon from './assets/WatermarkIcon.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export function HomeContent() {
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
          {t('home.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            weight: '600',
            color: 'var(--gray-700)',
            marginTop: '1rem',
          }}
        >
          {t('home.content1')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            weight: '600',
            color: 'var(--gray-700)',
          }}
        >
          {t('home.content2')}
        </Typography>
        <Box sx={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
          <CardFeatureItem
            key={1}
            icon={
              <img
                src={WatermarkIcon}
                alt="Watermarking"
                title="Watermarking"
                width={48}
                height={48}
                loading="lazy"
              />
            }
            title={`${t('home.watermarking')}`}
            description={`${t('home.watermarking-desc')}`}
            onClickDemo={() => {
              navigate(
                ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path
              );
            }}
          />
          <CardFeatureItem
            icon={
              <img
                src={UserIcon}
                alt="Piracy Detection"
                title="Piracy Detection"
                width={48}
                height={48}
                loading="lazy"
              />
            }
            key={2}
            title={`${t('home.piracy')}`}
            description={`${t('home.piracy-desc')}`}
            onClickDemo={() => {
              window.open(
                getEnvVar(
                  i18next.language === 'en'
                    ? 'VITE_PIRACY_URL'
                    : 'VITE_PIRACY_KO_URL'
                ),
                '_blank'
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HomeContent;
