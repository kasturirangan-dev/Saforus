import { useEffect, useState } from 'react';
import { downloadSharedFile } from './data/api';
import { Box, Typography } from '@mui/material';
import Background from './assets/background.svg';
import { useTranslation } from 'react-i18next';

export function WatermarkingDownload() {
  const token = window.location?.search?.split('=')?.[1];
  const [error, setError] = useState<{
    resultCode: number;
  } | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    downloadSharedFile(token).then((error: { resultCode: number }) => {
      setError(error);
    });
  }, []);

  const isLimitExceed = error?.resultCode === 401053;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      {error && (
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '28px',
            }}
          >
            {isLimitExceed
              ? t('download-files.download-limit-hit.title')
              : t('download-files.download-expired.title')}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: 'var(--gray-50)',
              paddingTop: '1rem',
            }}
          >
            {isLimitExceed
              ? t('download-files.download-limit-hit.subtitle1')
              : t('download-files.download-expired.subtitle1')}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: 'var(--gray-50)',
            }}
          >
            {isLimitExceed
              ? t('download-files.download-limit-hit.subtitle2')
              : t('download-files.download-expired.subtitle2')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default WatermarkingDownload;
