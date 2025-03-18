import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ServeIcon from '../assets/serve.svg';
import { TransContent } from '@web-workspace/api-docs/components/guides/section';

export const EnvironmentInfo = () => {
  const { t } = useTranslation();

  const ServiceInfo = ({ env, link }: { env: string; link: string }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px',
          backgroundColor: 'var(--neutral-300)',
          borderRadius: '12px',
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            src={ServeIcon}
            alt="serve-icon"
            loading="lazy"
            style={{ marginRight: '8px' }}
          />
          <Typography
            variant="body2"
            fontWeight={600}
            color="var(--purple-400)"
          >
            {t(`userGuide.environments.${env}.title`)}
          </Typography>
        </Box>

        <Typography variant="body2" color="var(--gray-800)" component="div">
          <TransContent
            i18nKey={`userGuide.environments.${env}.content`}
            link={link}
          />
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      <ServiceInfo env="staging" link="https://stag-cs.saforus.com/" />
      <ServiceInfo env="production" link="https://cs.saforus.com/" />
    </Box>
  );
};
