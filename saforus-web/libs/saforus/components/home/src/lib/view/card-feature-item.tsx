import { Box, ButtonBase, Card, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import React from 'react';
import i18next from 'i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

interface CardFeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClickDemo?: () => void;
}

const CardFeatureItem = ({
  title,
  description,
  icon,
  onClickDemo,
}: CardFeatureItemProps) => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        minWidth: '386px',
        width: '25vw',
        background: 'var(--base-white)',
        padding: '1.5rem 2rem',
        borderRadius: '5px',
        boxShadow:
          '0px 4px 6px -1px rgba(16, 24, 40, 0.03), 0px 2px 4px -2px rgba(16, 24, 40, 0.05)',
      }}
    >
      <Box
        sx={{ width: '100%', justifyContent: 'flex-start', textAlign: 'left' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {icon}
          <ButtonBase
            onClick={() => {
              const url = getEnvVar(
                i18next.language === 'en'
                  ? 'VITE_TUTORIAL_URL'
                  : 'VITE_TUTORIAL_KO_URL'
              );
              window.open(url, '_blank');
            }}
          >
            <Typography
              variant={'body2'}
              fontWeight={500}
              color={'var(--gray-50)'}
              sx={{ textDecoration: 'underline' }}
            >
              {t('home.tutorial')}
            </Typography>
          </ButtonBase>
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          color={'var(--gray-700)'}
          sx={{ marginTop: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          color={'var(--gray-25)'}
          sx={{ marginTop: '0.5rem' }}
        >
          {description}
        </Typography>
        <Button sx={{ marginTop: '1.5rem' }} onClick={onClickDemo}>
          {t('home.try-demo')}
        </Button>
      </Box>
    </Card>
  );
};

export default React.memo(CardFeatureItem);
