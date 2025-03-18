import { Box, styled, Typography } from '@mui/material';
import React from 'react';

import { useTranslation } from 'react-i18next';

const StyleStreamingTypeContent = styled(Box)(({ theme }) => ({
  background: 'var(--base-white)',
  border: '1px solid #DAE0E6',
  padding: '1rem',
  width: '25%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
}));

const PackagingOptionVideoAudioView = () => {
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
        {t('multiDrm.packaging-configuration.video-audio-configuration')}
      </Typography>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyleStreamingTypeContent
          sx={{ borderRight: 'none', borderBottom: 'none' }}
        >
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Video Codec
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            H264
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent
          sx={{ borderRight: 'none', borderBottom: 'none' }}
        >
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Frame Rate
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            24
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent
          sx={{ borderRight: 'none', borderBottom: 'none' }}
        >
          <Typography
            sx={{
              color: '#5F6D7E',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Resolution
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            720p 1280 X 720
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent sx={{ borderBottom: 'none' }}>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Bitrate(kbps)
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            1350
          </Typography>
        </StyleStreamingTypeContent>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyleStreamingTypeContent sx={{ borderRight: 'none' }}>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Audio Codec
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            AAC
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent sx={{ borderRight: 'none' }}>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Bitrate
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            128KBit
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent sx={{ borderRight: 'none' }}>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Language
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            --
          </Typography>
        </StyleStreamingTypeContent>
        <StyleStreamingTypeContent>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Audio Track Name
          </Typography>
          <Typography
            sx={{
              color: 'var(--gray-700)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            --
          </Typography>
        </StyleStreamingTypeContent>
      </Box>
    </Box>
  );
};

export default PackagingOptionVideoAudioView;
