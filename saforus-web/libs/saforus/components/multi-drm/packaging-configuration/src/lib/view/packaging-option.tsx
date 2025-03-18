import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const StylePackagingContent = styled(Box)(({ theme }) => ({
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  width: '50%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
}));

const PackagingOptionView = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: '50%' }}>
      <Typography
        sx={{
          fontWeight: '600',
          mb: '1rem',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          marginBottom: '0.3rem',
        }}
      >
        {t('multiDrm.packaging-configuration.packaging-option')}
      </Typography>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StylePackagingContent>
          <Typography
            sx={{ color: '#5F6D7E', fontSize: '0.875rem', fontWeight: '600' }}
          >
            Watermarking Solution
          </Typography>
          <Typography
            sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
          >
            Forensic Watermark
          </Typography>
        </StylePackagingContent>
        <StylePackagingContent sx={{ borderLeft: 'none' }}>
          <Typography
            sx={{ color: '#5F6D7E', fontSize: '0.875rem', fontWeight: '600' }}
          >
            DRM Solution
          </Typography>
          <Typography
            sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
          >
            PlayReady, FairPlay
          </Typography>
        </StylePackagingContent>
      </Box>
    </Box>
  );
};

export default PackagingOptionView;
