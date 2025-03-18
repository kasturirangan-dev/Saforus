import Dialog from '@web-workspace/shared/components/widgets/dialog';
import styles from './index.module.scss';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

type DialogLoadingProps = {
  onClose: () => void;
};

const DialogLoading: React.FC<DialogLoadingProps> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        marginX: 'auto',
        marginY: '32px',
        width: '300px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          height: 'auto',
          padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box className={styles.loader} />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          width: '100%',
          fontWeight: 600,
          color: 'var(--gray--700)',
          textAlign: 'center',
        }}
      >
        {t('apiServicePlan.subscriptionLoading.title')}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          width: '100%',
          color: 'var(--gray--700)',
          textAlign: 'center',
        }}
      >
        {t('apiServicePlan.subscriptionLoading.description')}
      </Typography>
    </Box>
  );
};

export default DialogLoading;
