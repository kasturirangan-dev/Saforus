import { Backdrop, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

export function LoadingIndicator() {
  const { t } = useTranslation();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'var(--base-white)',
            padding: '1.5rem',
            borderRadius: '1.5rem',
            boxShadow: 'var(--shadow-2xl)',
            width: '98px',
            height: '98px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box className={styles.loader} />
        </Box>
        <Typography
          className={styles['none-target']}
          sx={{
            marginTop: '0.75rem',
            fontWeight: '600',
            fontSize: '15px',
            color: 'var(--base-white)',
            lineHeight: '22px',
          }}
        >
          {t('common.loading')}
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default LoadingIndicator;
